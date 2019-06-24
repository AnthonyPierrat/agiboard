import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, HttpCode, BadRequestError } from "routing-controllers";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { ProjectCreationDto, ProjectUpdateDto } from '../dtos/project.dto';
import { validate } from "class-validator";
import { ApiController } from "./api.controller";
import { ProjectService } from "../services/project.service";
import Container from "typedi";
import { UserProject } from "../entity/userProject.entity";

@UseBefore(TokenMiddleware)
@JsonController()
export class WorkspaceController extends ApiController  {

    private projectService: ProjectService;

    /**
     * @constructor
     * AuthController
     */
    constructor() {
        super();
        this.projectService = Container.get(ProjectService);
    }

    /**
     * Create new project
     * @param {ProjectCreationDto} project 
     */
    @Post("/projects")
    @HttpCode(201)
    private async post(@Body() project: ProjectCreationDto): Promise<any> {
        const errors = await validate(project);
        if (errors.length > 0) {
            throw new BadRequestError(errors.toString());
        }

        const createdProject = await this.projectService.create(project);
        return this.response(true, createdProject, 'successfully created', 201);
    }

    @Get("/projects")
    private async getAll(): Promise<any> {
        const projects = await this.projectService.findAll();
        return this.response(true, projects, 'all projects successfully returned', 200);
    }

    @Get("/projects/:id")
    private async getOne(@Param("id") id: number) {
        const project = await this.projectService.findOne(id);
        return this.response(true, project, 'project #' + id + ' successfully returned', 200);
    }


    @Put("/projects/:id")
    private async put(@Param("id") id: number, @Body() project: ProjectUpdateDto) {
        const updatedProject = await this.projectService.save(project);
        return this.response(true, updatedProject, "project #" + id + ' successfully updated', 200);
    }

    /*@Post("/projects/:id/members")
    private async addMember(@Param("id") id: number, @Body() UserProject ) {
        const addMember = await this.projectService.addMember(UserProject);
        return this.response(true, UserProject, "is added to project " + id, 200);
    }*/

    @Delete("/projects/:id")
    private async remove(@Param("id") id: number) {
        const projectToDelete = await this.projectService.findOne(id);
        const deletedProject = await this.projectService.delete(projectToDelete);
        return this.response(true, deletedProject, "project #" + id + ' successfully removed', 200);
    }

}