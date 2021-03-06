import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Workspace } from "./workspace.entity";
import { UserProject } from "./userProject.entity";
import { Sprint } from "./sprint.entity";
import { type } from "os";

@Entity()

export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //@Column()
    //logo: string;

    @Column()
    description: string;

    @ManyToOne(type => Workspace, workspace => workspace.id)
    workspace: Workspace;

    @OneToMany(type => UserProject, userProject => userProject.project)
    userProjects: UserProject[];

    @OneToMany(type => Sprint, sprint => sprint.project)
    sprints : Sprint[];

    @Column()
    budget: number;

    @Column()
    creationDate: Date;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @UpdateDateColumn()
    lastUpdate: Date;

    @Column({
        default: false,
    })
    deleted: boolean;
}
