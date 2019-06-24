import { User } from "../entity/user.entity";
import { MaxLength } from "class-validator";
import { Project } from "../entity/project.entity";

export class WorkspaceCreationDto {

    id: number;

    @MaxLength(20)
    name: string;

    @MaxLength(150)
    description: string;

    owner: User;

    projects: Project[];

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

    projects: Project[];

    creationDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}