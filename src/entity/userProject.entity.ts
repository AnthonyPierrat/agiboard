import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import { MemberType } from "../enums/member-type.enum";

@Entity()

export class UserProject {

    @Column()
    type: MemberType;

    @ManyToOne(type => User, user => user.userProjects, { primary: true })
    user: User;

    @ManyToOne(type => Project, project => project.userProjects, { primary: true })
    project: Project;

}