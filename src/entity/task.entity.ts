import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Sprint } from "./sprint.entity";

enum Status {
    Done,
    WontDo,
    Duplicate,
    New,
    InProgress
}

@Entity()

export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column('int')
    status: Status;

    @ManyToMany(type => User, user => user.id)
    @JoinTable()
    members: User[];

    @ManyToOne(type => Sprint, sprint => sprint.id)
    @JoinTable()
    sprint: Sprint;

    @Column()
    creationDate: Date

    @UpdateDateColumn()
    lastUpdate: Date

    @Column({
        default: false,
    })
    deleted: boolean;
}
