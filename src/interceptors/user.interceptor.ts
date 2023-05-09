import {CallHandler, ExecutionContext, NestInterceptor, UseInterceptors,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../models/users/user.entity";

export function UseUserInterceptor() {
    return UseInterceptors(new UserInterceptor());
}

export class UserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: User[] | User) => {
                if (Array.isArray(data)) {
                    return data.map(user => MapUserRolesToStringArray(user));
                }
                return MapUserRolesToStringArray(data);
            }),
        );
    }
}

function MapUserRolesToStringArray(user: User) {
    return {...user, roles: user.roles.map(role => role.name)};
}