import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, HttpCode, BadRequestError } from "routing-controllers";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { EventCreationDto, EventUpdateDto } from '../dtos/event.dto';
import { validate } from "class-validator";
import { ApiController } from "./api.controller";
import { EventService } from "../services/event.service";
import Container from "typedi";

@UseBefore(TokenMiddleware)
@JsonController()
export class EventController extends ApiController  {

    private eventService: EventService;

    /**
     * @constructor
     * AuthController
     */
    constructor() {
        super();
        this.eventService = Container.get(EventService);
    }

    /**
     * Create new event
     * @param {EventCreationDto} event 
     */
    @Post("/events")
    @HttpCode(201)
    private async post(@Body() event: EventCreationDto): Promise<any> {
        const errors = await validate(event);
        if (errors.length > 0) {
            throw new BadRequestError(errors.toString());
        }

        const createdEvent = await this.eventService.create(event);
        return this.response(true, createdEvent, 'successfully signed in', 201);
    }

    @Get("/events")
    private async getAll(): Promise<any> {
        const events = await this.eventService.findAll();
        return this.response(true, events, 'all events successfully returned', 200);
    }

    @Get("/events/:id")
    private async getOne(@Param("id") id: number) {
        const event = await this.eventService.findOne(id);
        return this.response(true, event, 'event #' + id + ' successfully returned', 200);
    }

    @Put("/events/:id")
    private async put(@Param("id") id: number, @Body() event: EventUpdateDto) {
        const updatedEvent = await this.eventService.save(event);
        return this.response(true, updatedEvent, "event #" + id + ' successfully updated', 200);
    }

    @Delete("/events/:id")
    private async remove(@Param("id") id: number) {
        const eventToDelete = await this.eventService.findOne(id);
        const deletedEvent = await this.eventService.delete(eventToDelete);
        return this.response(true, deletedEvent, "event #" + id + ' successfully removed', 200);
    }

}