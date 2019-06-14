import { MaxLength, IsNotEmpty } from "class-validator";
import { Workspace } from "../entity/workspace.entity";
import { UserProject } from "../entity/userProject.entity";

export class ProjectCreationDto {

    id: number;

    @MaxLength(20)
    name: string;

    @MaxLength(150)
    description: string;

    @IsNotEmpty()
    workspace: Workspace;

    userProjects: UserProject[];

    budget: number;

    creationDate: Date;

    startDate: Date;

    endDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}

export class ProjectUpdateDto {

    id: number;

    @MaxLength(20)
    name: string;

    @MaxLength(150)
    description: string;

    @IsNotEmpty()
    workspace: Workspace;

    userProjects : UserProject[];

    budget: number;

    creationDate: Date;

    startDate: Date;

    endDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}