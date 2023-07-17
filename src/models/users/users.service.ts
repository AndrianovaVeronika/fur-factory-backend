import {Injectable, NotFoundException} from '@nestjs/common';
// import {Like, Repository} from 'typeorm';
// import {InjectRepository} from "@nestjs/typeorm";
// import {User} from "./user.entity";
// import {Role} from "../roles/role.entity";
import {Prisma, User} from '@prisma/client';
import {PrismaService} from "../../prisma.service";

@Injectable()
export class UsersService {
    //changed from repo: Repository<User> to PrismaService
    constructor(private prisma: PrismaService) {
    }

    // Typeorm
    // async create(email: string, password: string, roles: Role[], name?: string, address?: string, telephone?: string): Promise<User> {
    //     const user = this.repo.create({name, email, password, address, telephone, roles});
    //     return this.repo.save(user);
    // }

    //Prisma
    //by using Prisma.userCreateInput we dont need a Dto here
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    //Typeorm
    // findById(id: number): Promise<User> {
    //     if (!id) {
    //         return null;
    //     }
    //     return this.repo.findOne({where: {userId: id}, relations: ['roles']});
    // }

    //Prisma - relations?=include:{*:true}
    async findById(id: number): Promise<User | null> {
        if (!id) {
            return null;
        }
        return this.prisma.user.findUnique({
            where: {userId: id},
            include: {roles: true}
        });
    }

    // Typeorm
    // find(attrs?: Partial<User>): Promise<User[]> {
    //     return this.repo.find({
    //         where: {
    //             ...(attrs?.name && {name: Like(`%${attrs.name}%`)}),
    //             ...(attrs?.email && {email: attrs.email}),
    //             ...(attrs?.address && {address: Like(`%${attrs.address}%`)}),
    //             ...(attrs?.telephone && {telephone: Like(`%${attrs.telephone}%`)}),
    //         }, relations: ['roles']
    //     });
    // }

    //Prisma - relations? Like?
    find(data?: Prisma.UserWhereInput): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                // ...(data?.name && {name: Like(`%${data.name}%`)}),
                ...(data?.email && {email: data.email}),
                // ...(data?.address && {address: Like(`%${data.address}%`)}),
                // ...(data?.telephone && {telephone: Like(`%${data.telephone}%`)}),
            },
            // relations: ['roles']
        });
    }

    //Typeorm
    // async update(id: number, attrs: Partial<User>): Promise<User> {
    //     const user = await this.findById(id);
    //     if (!user) {
    //         throw new NotFoundException('user not found');
    //     }
    //     Object.assign(user, {
    //         ...attrs,
    //         ...(attrs.password && {password: getHashedPassword(attrs.password)})
    //     });
    //     //insert or update can be used but "save" is more efficient with entity (hooks)
    //     return this.repo.save(user);
    // }

    //Prisma
    async update(id: number, attrs: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: {userId: id},
            data: attrs
        })
    }

    //Typeorm
    // async remove(id: number): Promise<User> {
    //     const user = await this.findById(id);
    //     if (!user) {
    //         throw new NotFoundException('user not found');
    //     }
    //     //delete can be used but "remove" is more efficient with entity (hooks)
    //     return this.repo.remove(user);
    // }

    //Prisma
    //if its not for id we could use Prisma.UserWhereUniqueInput
    async remove(id: number): Promise<User> {
        const userToDelete = await this.findById(id);
        if (!userToDelete) {
            throw new NotFoundException('user not found');
        }
        return this.prisma.user.delete({
            where: {...userToDelete}
        });
    }
}
