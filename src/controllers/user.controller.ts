import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { UserService } from "../services/user.service";
import { ApiController } from "./api.controller";
import Container from "typedi";
import { WorkspaceService } from "../services/workspace.service";


@UseBefore(TokenMiddleware)
@JsonController()
export class UserController extends ApiController {

    private userService: UserService;
    private workspaceService: WorkspaceService;

    constructor() {
        super();
        this.userService = Container.get(UserService);
        this.workspaceService = Container.get(WorkspaceService);
    }


    @Get("/users")
    async getAll() {
        const user = await this.userService.findAll();
        return this.response(true, user, 'all users successfully returned', 200);
    }

    @Get("/users/:id")
    async getOne(@Param("id") id: number) {
        const user = await this.userService.findOne(id);
        return this.response(true, user, 'The user has been successfully returned', 200);
    }

    @Get("/users/:id/workspaces")
    async getUserWorkspaces(@Param("id") id: number) {
        const workspaces = await this.workspaceService.findWorkspacesByUser(id);
        return this.response(true, workspaces, 'Workspaces owned by user with id : ' + id + ', successfully returned', 200);
    }

    @Put("/users/:id")
    async put(@Param("id") id: number, @Body() user: any) {
        const userModified = await this.userService.save(user);
        return this.response(true, userModified, 'User successfully modified', 200);
    }

    @UseBefore(RoleMiddleware)
    @Delete("/users/:id")
    async remove(@Param("id") id: number) {
        const userDeleted = await this.userService.delete(id);
        return this.response(true, id, 'User with id : ' + id + ' successfully deleted', 200);
    }

}