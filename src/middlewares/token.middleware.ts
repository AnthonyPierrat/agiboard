import { ExpressMiddlewareInterface } from "routing-controllers";
import * as jwt from "jsonwebtoken";

export class TokenMiddleware implements ExpressMiddlewareInterface {

    async use(req: any, res: any, next?: (err?: any) => any): Promise<any> {
        if (req.headers.authorization) {
            if (req.headers.authorization.startsWith('Bearer')) {
                const token: string = req.headers.authorization.split(' ')[1];
                const secret = process.env.JWT_SECRET;
                try {
                    await jwt.verify(token, secret);
                    next();
                } catch (err) {
                    res.send(401);
                }
            } else {
                res.send(401);
            }

        } else {
            res.send(401);
        }
    }

}