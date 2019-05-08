import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

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

    @Column()
    lastUpdate: Date

    @Column({
        default: false,
    })
    deleted: boolean;

}
