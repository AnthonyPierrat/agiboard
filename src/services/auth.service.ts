import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Container, { Service } from 'typedi';
import { UserRegisterDto, UserLogInDto } from '../dtos/user.dto';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { InternalServerError } from 'routing-controllers';
import { EmailExistException } from '../exception/email-exist.exception';
import { EmailNotExistException } from '../exception/email-not-exist.exception';
import { PasswordException } from '../exception/password.exception';

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
            throw new EmailExistException(false);
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
            throw new EmailNotExistException(false);
        }

        const matching = await compare(user.password, checkUser.password);
        if (!matching) {
            throw new PasswordException(false);
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
            token: await jwt.sign({ id: user.id, email: user.email, admin: user.admin, username: user.name }, secret, { expiresIn }),
        };
    }



}