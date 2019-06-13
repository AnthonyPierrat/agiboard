import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Container, { Service } from 'typedi';
import { UserRegisterDto, UserLogInDto } from '../dtos/user.dto';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { NotFoundError, BadRequestError, HttpError, InternalServerError } from 'routing-controllers';

@Service()
export class AuthService {

    private userService: UserService;

    /**
     * @constructor
     * AuthentificationService
     */
    constructor() {
        this.userService = Container.get(UserService);
    }

    /**
     * Register a user
     * @param {UserRegisterDto} user user to register
     */
    public async signup(user: UserRegisterDto): Promise<any> {
        const checkUserEmail: User = await this.userService.findOneByEmail(user.email);
        if (checkUserEmail) {
            throw new HttpError(409, 'Email already exist');
        }
        try {
            return await this.userService.create(user);
        } catch (err) {
            throw new InternalServerError(err);
        }
    }

    /**
     * Log a user
     * @param {UserLogInDto} user user to log in
     */
    public async signin(user: UserLogInDto): Promise<any> {
        const checkUser: User = await this.userService.findOneByEmail(user.email);
        if (!checkUser) {
            throw new NotFoundError('email does not exist');
        }
        const matching = await compare(user.password, checkUser.password);
        if (!matching) {
            throw new BadRequestError('password is wrong');
        }
        return await this.createToken(checkUser);

    }

    /**
     * Create a jwt token
     * @param {UserLogInDto} user user to log
     */
    private async createToken(user: UserLogInDto): Promise<any> {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        return {
            expiresIn,
            token: await jwt.sign({ _id: user.id, _email: user.email, _admin: user.admin }, secret, { expiresIn }),
        };
    }



}