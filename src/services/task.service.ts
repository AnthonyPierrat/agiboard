import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Task } from "../entity/task.entity";
import { TaskCreationDto } from '../dtos/task.dto';
import { NotFoundError } from "routing-controllers";

@Service()
export class TaskService {

    /**
     * @constructor
     * @param {Repository<Workspace>} workspaceRepository 
     */
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) { }

    /**
     * Create a task
     * @param {TaskCreationDto} Task task to create
     * @returns {Promise<Task>}
     */
    async create(task: TaskCreationDto): Promise<Task> {
        let { description, status, members, sprint, creationDate, lastUpdate } = task;
        creationDate = new Date();
        lastUpdate = new Date();
        return await this.taskRepository.save({ description, status, members, sprint, creationDate, lastUpdate });
    }

    /**
     * Return all task
     * @returns {Promise<Workspace[]>}
     */
    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find({relations: ["members", "sprint"]});
    }

    /**
     * Find task by id
     * @param {number} id 
     * @returns {Promise<Task>}
     */
    async findOne(id: number): Promise<Task> {
        const result = await this.taskRepository.findOne(id, {relations: ["members", "sprint"]});
        if (result) {
            return result;
        }
        else {
            throw new NotFoundError;
        }
    }

    /**
     * Update a task
     * @param {Task} task task to update
     * @returns {Promise<Task>}
     */
    async save(task: Task): Promise<Task> {
        return await this.taskRepository.save(task);
    }

    /**
     * Delete a task
     * @param {Task} task task to update to delete
     * @returns {Promise<Task>}
     */
    async delete(id: number): Promise<Task> {
        let task = await this.taskRepository.findOne(id);
        task.deleted = true;
        return await this.taskRepository.save(task);
    }
}