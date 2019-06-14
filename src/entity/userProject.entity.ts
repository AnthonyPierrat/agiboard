import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity()

export class UserProject {

    @Column()
    isActive: boolean;

    @ManyToOne(type => User, user => user.userProjects, { primary: true })
    user: User;

    @ManyToOne(type => Project, project => project.userProjects, { primary: true })
    project: Project;

}