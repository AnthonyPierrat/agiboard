import { ExpressMiddlewareInterface } from "routing-controllers";
import * as jwt from "jsonwebtoken";

export class RoleMiddleware implements ExpressMiddlewareInterface {

    async use(req: any, res: any, next?: (err?: any) => any): Promise<any> {
        const token: string = req.headers.authorization.split(' ')[1];
        const decodedUser: any = await jwt.decode(token);
        if (decodedUser._admin) {
            next();
        } else {
            res.send(401);
        }
    }

}