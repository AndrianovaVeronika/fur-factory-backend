import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {UsersService} from "../models/users/users.service";
import {decodeToken} from "../utils/accessToken.util";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["x-access-token"];
        if (token && token !== 'null' && typeof token === 'string') {
            const userId = await decodeToken(token);
            if (userId) {
                // @ts-ignore
                req.currentUser = await this.usersService.findById(userId);
            }
        }
        next();
    }
}