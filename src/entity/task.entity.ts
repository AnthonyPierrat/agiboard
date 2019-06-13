import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./user.entity";
enum Status {
    Done,
    WontDo,
    Duplicate,
    New,
    InProgress
}

@Entity()
@Unique(["email"])
@Unique(["name"])


export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column('int')
    status: Status;

    @ManyToMany(type => User, user => user.id)
    members: User[];

    @ManyToOne(type => Sprint, sprint => sprint.id)
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
