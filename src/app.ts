import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { createConnection, useContainer } from "typeorm";
import { Container } from 'typedi';

useContainer(Container);
createConnection().then(async connection => {

    // setup express server
    // register controllers routes in our express application
    createExpressServer({
        routePrefix: "/api",
        controllers: [__dirname + "/controllers/*.controller.ts"],
        middlewares: [__dirname + "/controllers/*.middleware.ts"],
    }).listen(3000);

}).catch(error => console.log(error));
