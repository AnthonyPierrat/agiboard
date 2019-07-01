import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, In } from 'typeorm';
import { NotFoundError } from "routing-controllers";
import { Sprint } from '../entity/sprint.entity';
import { Event } from '../entity/event.entity';
import { Project } from '../entity/project.entity';

import { SprintCreationDto, SprintUpdateDto } from '../dtos/sprint.dto';

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
        private readonly eventRepository: Repository<Event>,

        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    /**
     * Create a sprint
     * @param {SprintCreationDto} sprint sprint to create
     * @returns {Promise<Sprint>}
     */
    async create(sprint: SprintCreationDto): Promise<Sprint> {
        sprint.creationDate = new Date();
        sprint.lastUpdate = new Date();

        const project = await this.projectRepository.findOne(sprint.project);
        sprint.project = project;

        return await this.sprintRepository.save(sprint);
    }

    /**
     * Return all sprints
     * @returns {Promise<Sprint[]>}
     */
    async findAll(): Promise<Sprint[]> {
        return await this.sprintRepository.find({relations: ["events", "tasks", "project"]});
    }

    /**
     * Find sprint by id
     * @param {number} id 
     * @returns {Promise<Sprint>}
     */
    async findOne(id: number): Promise<Sprint> {
        const result = await this.sprintRepository.findOne(id, {relations: ["events", "tasks", "project"]});
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
    async save(sprint: SprintUpdateDto): Promise<Sprint> {
        sprint.lastUpdate = new Date();
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