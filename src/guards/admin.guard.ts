import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";
import {plainToClass} from "class-transformer";
import {UserDto} from "../models/users/dtos/user.dto";

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.currentUser) {
            return false;
        }
        const currentUser = plainToClass(UserDto, request.currentUser);
        return currentUser.roles.includes('admin');
    }
}