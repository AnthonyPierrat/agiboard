import { Sprint } from "../entity/sprint.entity";
import { User } from "../entity/user.entity";
import { MaxLength } from "class-validator";
import { Column } from "typeorm";

enum Status {
    Done,
    WontDo,
    Duplicate,
    New,
    InProgress
}


export class TaskCreationDto {

    @MaxLength(150)
    description: string;

    
    id: number;
    status: Status;
    members: User[];
    sprint: Sprint[];
    creationDate: Date
    lastUpdate: Date
    deleted: boolean = false;
}