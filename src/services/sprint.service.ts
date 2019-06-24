import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, In } from 'typeorm';
import { NotFoundError } from "routing-controllers";
import { Sprint } from '../entity/sprint.entity';
import { Event } from '../entity/event.entity';

import { SprintCreationDto } from '../dtos/sprint.dto';

@Service()
export class SprintService {

    /**
     * @constructor
     * @param {Repository<Sprint>} sprintRepository 
     */
    constructor(
        @InjectRepository(Sprint)
        private readonly sprintRepository: Repository<Sprint>,

        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>
    ) { }

    /**
     * Create a sprint
     * @param {SprintCreationDto} sprint sprint to create
     * @returns {Promise<Sprint>}
     */
    async create(sprint: SprintCreationDto): Promise<Sprint> {
        console.log("OUI");
        let { events } = sprint;
        
        const eventsOfSprint =  await this.eventRepository.find({id: In(events)});
        console.log(eventsOfSprint);
        sprint.events = [];
        for(const event of eventsOfSprint){
            sprint.events.push(event);
        }

        sprint.creationDate = new Date();
        sprint.lastUpdate = new Date();

        return await this.sprintRepository.save(sprint);
    }

    /**
     * Return all sprints
     * @returns {Promise<Sprint[]>}
     */
    async findAll(): Promise<Sprint[]> {
        return await this.sprintRepository.find({relations: ["events"]});
    }

    /**
     * Find sprint by id
     * @param {number} id 
     * @returns {Promise<Sprint>}
     */
    async findOne(id: number): Promise<Sprint> {
        const result = await this.sprintRepository.findOne(id, {relations: ["events"]});
        if (result) {
            return result;
        }
        else {
            throw new NotFoundError;
        }
    }

    /**
     * Update a sprint
     * @param {Sprint} sprint sprint to update
     * @returns {Promise<Sprint>}
     */
    async save(sprint: Sprint): Promise<Sprint> {
        return await this.sprintRepository.save(sprint);
    }

    /**
     * Delete a sprint
     * @param {Sprint} sprint sprint to update to delete
     * @returns {Promise<Sprint>}
     */
    async delete(sprint: Sprint): Promise<Sprint> {
        sprint.deleted = true;
        return await this.sprintRepository.save(sprint);
    }
}