import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { RoleMiddleware } from "../middlewares/role.middleware";

@UseBefore(TokenMiddleware)
@JsonController()
export class UserController {

    @Get("/users")
    getAll() {
        return "This action returns all users";
    }

    @Get("/users/:id")
    getOne(@Param("id") id: number) {
        return "This action returns user #" + id;
    }

    @UseBefore(RoleMiddleware)
    @Post("/users")
    post(@Body() user: any) {
        console.log(user);
        return "Saving user...";
    }

    @Put("/users/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @UseBefore(RoleMiddleware)
    @Delete("/users/:id")
    remove(@Param("id") id: number) {
        return "Removing user...";
    }

}