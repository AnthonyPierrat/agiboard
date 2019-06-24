import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Workspace } from "../entity/workspace.entity";
import { WorkspaceCreationDto } from '../dtos/workspace.dto';
import { NotFoundError } from "routing-controllers";

@Service()
export class WorkspaceService {

    /**
     * @constructor
     * @param {Repository<Workspace>} workspaceRepository 
     */
    constructor(
        @InjectRepository(Workspace)
        private readonly workspaceRepository: Repository<Workspace>
    ) { }

    /**
     * Create a workspace
     * @param {WorkspaceCreationDto} workspace workspace to create
     * @returns {Promise<Workspace>}
     */
    async create(workspace: WorkspaceCreationDto): Promise<Workspace> {
        let { name, description, owner, creationDate, lastUpdate } = workspace;
        creationDate = new Date();
        lastUpdate = new Date();
        return await this.workspaceRepository.save({ name, description, owner, creationDate, lastUpdate });
    }

    /**
     * Return all workspace
     * @returns {Promise<Workspace[]>}
     */
    async findAll(): Promise<Workspace[]> {
        return await this.workspaceRepository.find({relations: ["owner", "projects"]}); //relations : to get full owner data
    }

    /**
     * Find workspace by id
     * @param {number} id 
     * @returns {Promise<Workspace>}
     */
    async findOne(id: number): Promise<Workspace> {
        const result = await this.workspaceRepository.findOne(id);
        if (result) {
            return await this.workspaceRepository.findOne(id);
        }
        else {
            throw new NotFoundError;
        }
    }

    /**
     * Update a workspace
     * @param {Workspace} workspace workspace to update
     * @returns {Promise<Workspace>}
     */
    async save(workspace: Workspace): Promise<Workspace> {
        return await this.workspaceRepository.save(workspace);
    }

    /**
     * Delete a workspace
     * @param {Workspace} workspace workspace to update to delete
     * @returns {Promise<Workspace>}
     */
    async delete(workspace: Workspace): Promise<Workspace> {
        workspace.deleted = true;
        return await this.workspaceRepository.save(workspace);
    }
}