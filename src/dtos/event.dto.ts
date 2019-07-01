import { MaxLength } from "class-validator";
import { User } from "../entity/user.entity";
import { Sprint } from "../entity/sprint.entity";

export class EventCreationDto {

    id: number;

    @MaxLength(150)
    description : string;

    type: EventType;

    members: User[];

    sprint: Sprint;

    startDate: Date;

    endDate: Date;

    creationDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}

export class EventUpdateDto {

    id: number;

    @MaxLength(150)
    description : string;

    type: EventType;

    members: User[];

    sprint: Sprint;

    startDate: Date;

    endDate: Date;

    creationDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}

enum EventType
{
    Reunion,
    Conference
}