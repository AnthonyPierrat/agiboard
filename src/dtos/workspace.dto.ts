import { User } from "../entity/user.entity";
import { MaxLength } from "class-validator";

export class WorkspaceCreationDto {

    id: number;

    @MaxLength(20)
    name: string;

    @MaxLength(150)
    description: string;

    owner: User;

    creationDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}

export class WorkspaceUpdateDto {

    id: number;

    @MaxLength(20)
    name: string;

    @MaxLength(150)
    description: string;

    owner: User;

    creationDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}