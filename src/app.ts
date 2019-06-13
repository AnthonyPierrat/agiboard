import "reflect-metadata";
import * as cors from "cors";
import { createExpressServer } from "routing-controllers";
import { createConnection, useContainer } from "typeorm";
import { Container } from 'typedi';

useContainer(Container);
createConnection().then(async connection => {

    // setup express server
    // register controllers routes in our express application
    const app = createExpressServer({
        defaultErrorHandler: true,
        cors: true,
        routePrefix: "/api",
        controllers: [__dirname + "/controllers/*.controller.ts"],
        middlewares: [__dirname + "/middlewares/*.middleware.ts"],
    });

    app.use(cors());

    app.listen(3000);

}).catch(error => console.log(error));
