import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Workspace } from "./workspace.entity";
import { UserProject } from "./userProject.entity";
import { Event } from "./event.entity";

@Entity()
@Unique(["email"])
@Unique(["name"])

export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    creationDate: Date

    @UpdateDateColumn()
    lastUpdate: Date

    @Column({
        default: false,
    })
    admin: boolean;

    @Column({
        default: false,
    })
    deleted: boolean;

    @OneToMany(type => Workspace, workspace => workspace.owner)
    workspaces: Workspace[];

    
    @ManyToMany(type => Event)
    events: Event[];
    
}
