import { JsonController, Body, Post, HttpCode } from "routing-controllers";
import Container from "typedi";
import { UserRegisterDto, UserLogInDto } from "../dtos/user.dto";
import { validate } from "class-validator";
import { AuthService } from "../services/auth.service";
import { ApiController } from "./api.controller";
import { BadRequestException } from "../exception/bad-request.exception";

@JsonController("/auth")
export class AuthController extends ApiController {

    private authService: AuthService;

    /**
     * @constructor
     * AuthController
     */
    constructor() {
        super();
        this.authService = Container.get(AuthService);
    }

    /**
     * Register controller
     * @param {UserRegisterDto} user 
     */
    @Post("/signup")
    @HttpCode(201)
    private async signup(@Body() user: UserRegisterDto): Promise<any> {
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new BadRequestException(false, errors.toString());
        }

        const signedUser = await this.authService.signup(user);
        return this.response(true, signedUser, 'successfully signed in', 201);
    }

    /**
     * Log in controller
     * @param {UserLogInDto} user 
     */
    @Post("/signin")
    @HttpCode(200)
    private async signin(@Body() user: UserLogInDto): Promise<any> {
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new BadRequestException(false, errors.toString());
        }

        const loggedUser = await this.authService.signin(user);
        return this.response(true, loggedUser, 'successfully logged in', 200);
    }

}