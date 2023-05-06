import {Body, Controller, Get, NotFoundException, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {RoleDto} from "./dto/role.dto";
import {FindRoleDto} from "./dto/find-role.dto";

@Controller('roles')
@Serialize(RoleDto)
export class RolesController {
    constructor(private rolesService: RolesService) {
    }

    @Get()
    getAllRoles() {
        return this.rolesService.findAll()
    }

    @Get('/:id')
    findRoleById(@Param('id') id: string) {
        const role = this.rolesService.findById(parseInt(id));
        if (!role) {
            throw new NotFoundException('role not found');
        }
        return role;
    }

    @Post('/find')
    findRole(@Body() body: FindRoleDto) {
        return this.rolesService.findByName(body.name);
    }
}
