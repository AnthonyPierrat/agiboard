import { IsEmail, MinLength } from "class-validator";

export class UserRegisterDto {

    id: number;

    name: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    creationDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}

export class UserLogInDto {

    id: number;

    name: string

    @IsEmail()
    email: string;

    password: string;

    creationDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}