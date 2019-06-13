import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Event } from "./event.entity";

@Entity()

export class Sprint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Event, event => event.sprint)
    events: Event[];

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column()
    creationDate: Date

    @UpdateDateColumn()
    lastUpdate: Date

    @Column({
        default: false,
    })
    deleted: boolean;
}
