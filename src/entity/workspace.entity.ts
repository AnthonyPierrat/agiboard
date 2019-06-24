import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "../entity/user.entity";
import { Project } from "./project.entity";

@Entity()
@Unique(["name"])

export class Workspace {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.id)
    owner: User;

    @OneToMany(type => Project, project => project.workspace)
    projects: Project[];

    @Column()
    creationDate: Date

    @UpdateDateColumn()
    lastUpdate: Date

    @Column({
        default: false,
    })
    deleted: boolean;
}
