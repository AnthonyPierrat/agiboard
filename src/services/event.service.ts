import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { NotFoundError } from "routing-controllers";
import { Event } from '../entity/event.entity';
import { EventCreationDto } from '../dtos/event.dto';

@Service()
export class EventService {

    /**
     * @constructor
     * @param {Repository<Event>} eventRepository 
     */
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
    ) { }

    /**
     * Create a event
     * @param {EventCreationDto} event event to create
     * @returns {Promise<Event>}
     */
    async create(event: EventCreationDto): Promise<Event> {
        let { description, type, members, sprint, startDate, endDate, creationDate, lastUpdate } = event;
        creationDate = new Date();
        lastUpdate = new Date();
        return await this.eventRepository.save({ description, type, members, sprint, startDate, endDate, creationDate, lastUpdate });
    }

    /**
     * Return all events
     * @returns {Promise<Event[]>}
     */
    async findAll(): Promise<Event[]> {
        return await this.eventRepository.find({relations: ["sprint", "members"]});
    }

    /**
     * Find event by id
     * @param {number} id 
     * @returns {Promise<Event>}
     */
    async findOne(id: number): Promise<Event> {
        const result = await this.eventRepository.findOne(id, {relations: ["sprint", "members"]});
        if (result) {
            return result;
        }
        else {
            throw new NotFoundError;
        }
    }

    /**
     * Update a event
     * @param {Event} event event to update
     * @returns {Promise<Event>}
     */
    async save(event: Event): Promise<Event> {
        return await this.eventRepository.save(event);
    }

    /**
     * Delete a event
     * @param {Event} event event to update to delete
     * @returns {Promise<Event>}
     */
    async delete(event: Event): Promise<Event> {
        event.deleted = true;
        return await this.eventRepository.save(event);
    }
}