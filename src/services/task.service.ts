import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, In } from 'typeorm';
import { Task } from "../entity/task.entity";
import { Sprint } from "../entity/sprint.entity";
import { User } from "../entity/user.entity";
import { TaskCreationDto } from '../dtos/task.dto';
import { NotFoundError } from "routing-controllers";

@Service()
export class TaskService {

    /**
     * @constructor
     * @param {Repository<Workspace>} workspaceRepository 
     */event
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(Sprint)
        private readonly sprintRepository: Repository<Sprint>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    /**
     * Create a task
     * @param {TaskCreationDto} Task task to create
     * @returns {Promise<Task>}
     */
    async create(task: TaskCreationDto): Promise<Task> {
        //save sprint relation
        task.sprint =  await this.sprintRepository.findOne({id: (Number)(task.sprint) });

        //save members relation
        let { members } = task;
        if(members != null){
            const users =  await this.userRepository.find({id: In(members)});
            task.members = [];
            for(const member of users){
                task.members.push(member);
            }
        }

        task.creationDate = new Date();
        task.lastUpdate = new Date();

        return await this.taskRepository.save(task);
    }

    /**
     * Return all task
     * @returns {Promise<Workspace[]>}
     */
    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find({relations: ["members", "sprint"]});
    }

    /**
     * Find task by id, sprint => sprint.events
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