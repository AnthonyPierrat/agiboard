import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, HttpCode, BadRequestError } from "routing-controllers";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { WorkspaceCreationDto, WorkspaceUpdateDto } from '../dtos/workspace.dto';
import { validate } from "class-validator";
import { ApiController } from "./api.controller";
import { WorkspaceService } from "../services/workspace.service";
import Container from "typedi";

@UseBefore(TokenMiddleware)
@JsonController()
export class WorkspaceController extends ApiController  {

    private workspaceService: WorkspaceService;

    /**
     * @constructor
     * AuthController
     */
    constructor() {
        super();
        this.workspaceService = Container.get(WorkspaceService);
    }

    /**
     * Create new workspace
     * @param {WorkspaceCreationDto} workspace 
     */
    @Post("/workspaces")
    @HttpCode(201)
    private async post(@Body() workspace: WorkspaceCreationDto): Promise<any> {
        const errors = await validate(workspace);
        if (errors.length > 0) {
            throw new BadRequestError(errors.toString());
        }

        const createdWorkspace = await this.workspaceService.create(workspace);
        return this.response(true, createdWorkspace, 'successfully signed in', 201);
    }

    @Get("/workspaces")
    private async getAll(): Promise<any> {
        const workspaces = await this.workspaceService.findAll();
        return this.response(true, workspaces, 'all workspaces successfully returned', 200);
    }

    @Get("/workspaces/:id")
    private async getOne(@Param("id") id: number) {
        const workspace = await this.workspaceService.findOne(id);
        return this.response(true, workspace, 'workspace #' + id + ' successfully returned', 200);
    }

    @Put("/workspaces/:id")
    private async put(@Param("id") id: number, @Body() workspace: WorkspaceUpdateDto) {
        const updatedWorkspace = await this.workspaceService.save(workspace);
        return this.response(true, updatedWorkspace, "workspace #" + id + ' successfully updated', 200);
    }

    @Delete("/workspaces/:id")
    private async remove(@Param("id") id: number) {
        const workspaceToDelete = await this.workspaceService.findOne(id);
        const deletedWorkspace = await this.workspaceService.delete(workspaceToDelete);
        return this.response(true, deletedWorkspace, "workspace #" + id + ' successfully removed', 200);
    }

}