import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Sprint } from "./sprint.entity";

@Entity()

export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description : string;

    @Column()
    type: EventType;

    @ManyToMany(type => User)
    @JoinTable()
    members: User[];

    @ManyToOne(type => Sprint, sprint => sprint.events)
    sprint: Sprint;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    creationDate: Date;

    @UpdateDateColumn()
    lastUpdate: Date;

    @Column({
        default: false,
    })
    deleted: boolean;
}

enum EventType
{
    Reunion,
    Conference
}
