import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, HttpCode, BadRequestError } from "routing-controllers";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { SprintCreationDto, SprintUpdateDto } from '../dtos/sprint.dto';
import { validate } from "class-validator";
import { ApiController } from "./api.controller";
import { SprintService } from "../services/sprint.service";
import Container from "typedi";

@UseBefore(TokenMiddleware)
@JsonController()
export class SprintController extends ApiController  {

    private sprintService: SprintService;

    /**
     * @constructor
     * AuthController
     */
    constructor() {
        super();
        this.sprintService = Container.get(SprintService);
    }

    /**
     * Create new sprint
     * @param {SprintCreationDto} sprint 
     */
    @Post("/sprints")
    @HttpCode(201)
    private async post(@Body() sprint: SprintCreationDto): Promise<any> {
        const errors = await validate(sprint);
        if (errors.length > 0) {
            throw new BadRequestError(errors.toString());
        }

        const createdSprint = await this.sprintService.create(sprint);
        return this.response(true, createdSprint, 'sprint successfully created', 201);
    }

    @Get("/sprints")
    private async getAll(): Promise<any> {
        const sprints = await this.sprintService.findAll();
        return this.response(true, sprints, 'all sprints successfully returned', 200);
    }

    @Get("/sprints/:id")
    private async getOne(@Param("id") id: number) {
        const sprint = await this.sprintService.findOne(id);
        return this.response(true, sprint, 'sprint #' + id + ' successfully returned', 200);
    }

    @Put("/sprints/:id")
    private async put(@Param("id") id: number, @Body() sprint: SprintUpdateDto) {
        const updatedSprint = await this.sprintService.save(sprint);
        return this.response(true, updatedSprint, "sprint #" + id + ' successfully updated', 200);
    }

    @Delete("/sprints/:id")
    private async remove(@Param("id") id: number) {
        const sprintToDelete = await this.sprintService.findOne(id);
        const deletedSprint = await this.sprintService.delete(sprintToDelete);
        return this.response(true, deletedSprint, "sprint #" + id + ' successfully removed', 200);
    }

}