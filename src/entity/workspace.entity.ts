import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, UpdateDateColumn } from "typeorm";
import { User } from "../entity/user.entity";

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

    @Column()
    creationDate: Date

    @UpdateDateColumn()
    lastUpdate: Date

    @Column({
        default: false,
    })
    deleted: boolean;
}
