import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Workspace } from "./workspace.entity";
import { UserProject } from "./userProject.entity";

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

    @OneToMany(type => UserProject, userProject => userProject.project, {
        cascade: true
    })  
    userProjects: UserProject[];

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
