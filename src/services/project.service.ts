import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, getRepository, In } from 'typeorm';
import { NotFoundError } from "routing-controllers";
import { Project } from '../entity/project.entity';
import { ProjectCreationDto } from '../dtos/project.dto';
import { User } from '../entity/user.entity';
import { UserProject } from '../entity/userProject.entity';
import { Sprint } from "../entity/sprint.entity";


@Service()
export class ProjectService {

    /**
     * @constructor
     * @param {Repository<Project>} projectRepository 
     */
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserProject)
        private readonly userProjectRepository: Repository<UserProject>,
        @InjectRepository(Sprint)
        private readonly sprintRepository: Repository<Sprint>,
    ) { }

    /**
     * Create a project
     * @param {ProjectCreationDto} project project to create
     * @returns {Promise<Project>}
     */
    async create(project: ProjectCreationDto): Promise<Project> {
        project.creationDate = new Date();
        project.lastUpdate = new Date();
        project.userProjects = [];

        //save members relation
        const allSprints = await this.sprintRepository.find({ id: In(project.sprints) });

        project.sprints = [];
        for (const sprint of allSprints) {
            project.sprints.push(sprint);
        }

        return await this.projectRepository.save(project);
    }

    /**
     * Return all project
     * @returns {Promise<Project[]>}
     */
    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find({ relations: ["workspace", "userProjects", "userProjects.user", "sprints"] }); //relations : to get full workspace data
    }

    /**
     * Find project by id
     * @param {number} id 
     * @returns {Promise<Project>}
     */
    async findOne(id: number): Promise<Project> {
        const result = await this.projectRepository.findOne(id, { relations: ["workspace", "userProjects", "userProjects.user", "sprints"] });
        if (result) {
            return result;
        }
        else {
            throw new NotFoundError;
        }
    }

    /**
     * Update a project
     * @param {Project} project project to update
     * @returns {Promise<Project>}
     */
    async save(project: Project): Promise<Project> {
        return await this.projectRepository.save(project);
    }

    /**
     * add a member to a project
     * @param {UserProject} userProject 
     * @returns {Promise<Project>}
     */
    async addMember(userProject: UserProject): Promise<UserProject> {
        let { project, user } = userProject;
        const projectExist = await this.projectRepository.findOne(project);
        const userExist = await this.userRepository.findOne(user);
        if (projectExist && userExist) {
            userProject.project = projectExist;
            userProject.user = userExist;
            const savedUserProject = await this.userProjectRepository.save(userProject);

            return savedUserProject;
        }
        else {
            throw new NotFoundError;
        }
    }

    /**
     * Delete a project
     * @param {Project} project project to update to delete
     * @returns {Promise<Project>}
     */
    async delete(project: Project): Promise<Project> {
        project.deleted = true;
        return await this.projectRepository.save(project);
    }
}