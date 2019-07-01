import { MaxLength } from "class-validator";
import { Event } from "../entity/event.entity";
import { Project } from "../entity/project.entity";

export class SprintCreationDto {

    id: number;

    @MaxLength(20)
    name: string;

    events: Event[];

    project : Project;

    startDate: Date

    endDate: Date

    creationDate: Date

    lastUpdate: Date

    deleted: boolean = false;
}

export class SprintUpdateDto {

    id: number;

    @MaxLength(20)
    name: string;

    events: Event[];
    
    project : Project;

    startDate: Date

    endDate: Date

    creationDate: Date

    lastUpdate: Date

    deleted: boolean = false;
}