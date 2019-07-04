import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore,BadRequestError } from "routing-controllers";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { TaskService } from "../services/task.service";
import { ApiController } from "./api.controller";
import Container from "typedi";
import { isDate } from "util";
import { UserService } from "../services/user.service";
import { TaskCreationDto } from '../dtos/task.dto';
import { validate } from "class-validator";




@UseBefore(TokenMiddleware)
@JsonController()
export class TaskController extends ApiController {

    private taskService: TaskService;
    private userService: UserService;

    constructor(){
        super();
        this.taskService = Container.get(TaskService);
        this.userService = Container.get(UserService);
    }


    @Post("/tasks")
    private async post(@Body() task: TaskCreationDto): Promise<any> {
        const errors = await validate(task);
        if (errors.length > 0) {
            throw new BadRequestError(errors.toString());
        }

        const createdTask = await this.taskService.create(task);
        return this.response(true, createdTask, 'task successfully created', 201);
    }

    @Get("/tasks")
    async getAll() {
        const tasks = await this.taskService.findAll();
        return this.response(true, tasks, 'all tasks successfully returned', 200);
    }

    @Get("/tasks/:id")
    async getOne(@Param("id") id: number) {
        const task = await this.taskService.findOne(id);
        return this.response(true, task, 'The task has been successfully returned', 200);
    }

    @Put("/tasks/:id")
    async put(@Param("id") id: number, @Body() user: any) {
        const taskModified = await this.taskService.update(user);
        return this.response(true, taskModified, 'Task successfully modified', 200);
    }

    @UseBefore(RoleMiddleware)
    @Delete("/users/:id")
    async remove(@Param("id") id: number) {
        const taskDeleted = await this.taskService.delete(id);
        return this.response(true, id, 'Task with id : '+id+' successfully deleted', 200);
    }

}