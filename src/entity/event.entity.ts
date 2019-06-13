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

    @ManyToMany(type => User, user => user.events, {
        cascade: true
    })
    @JoinTable({
        name: 'EventMembers',
        joinColumn: {
            name: "eventId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "memberId",
            referencedColumnName: "id"
        }
    })
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
