import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToMany, ManyToOne, JoinTable } from "typeorm";
import { Event } from "./event.entity";
import { Task } from "./task.entity";
import { Project } from "./project.entity";


@Entity()

export class Sprint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Event, event => event.sprint)
    events: Event[];

    @OneToMany(type => Task, task => task.sprint)
    tasks: Task[];

    @ManyToOne(type => Project, project => project.sprints)
    @JoinTable()
    project:Project;

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column()
    creationDate: Date

    @UpdateDateColumn()
    lastUpdate: Date

    @Column({
        default: false,
    })
    deleted: boolean;
}
