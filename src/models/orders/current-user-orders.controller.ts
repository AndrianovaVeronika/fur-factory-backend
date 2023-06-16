import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    UseGuards
} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dtos/create-order.dto";
import {FindOrderDto} from "./dtos/find-order.dto";
import {ProductsService} from "../products/products.service";
import {Product} from "../products/product.entity";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {CurrentUser} from "../users/decorators/current-user.decorator";
import {User} from "../users/user.entity";
import {AuthGuard} from "../../guards/auth.guard";
import {CurrentUserOrderDto} from "./dtos/current-user-order.dto";

@Controller('/current-user-orders')
@UseGuards(AuthGuard)
@Serialize(CurrentUserOrderDto)
export class CurrentUserOrdersController {
    constructor(private ordersService: OrdersService,
                private productsService: ProductsService
    ) {
    }

    @Get()
    getCurrentUserOrders(@CurrentUser() user: User) {
        return this.ordersService.find({user});
    }

    @Post('/find')
    findCurrentUserOrders(@Body() body: FindOrderDto, @CurrentUser() user: User) {
        return this.ordersService.find({...body, user});
    }

    @Post()
    async createOrder(@Body() body: CreateOrderDto, @CurrentUser() user: User) {
        //retrieving products
        const products: Product[] = [];
        for (const productId of body.productsIds) {
            const product = await this.productsService.findById(productId);
            if (!product) {
                throw new NotFoundException('product not found');
            }
            products.push(product);
        }
        return this.ordersService.create(user, products);
    }

    @Delete(':id')
    async removeOrder(@Param('id') id: string, @CurrentUser() user: User) {
        const orderId = parseInt(id);
        const order = await this.ordersService.findById(orderId);
        if (order.shipped) {
            throw new BadRequestException('cannot delete shipped order');
        }
        if (order.user.userId != user.userId) {
            throw new BadRequestException('order does not belong to current user');
        }
        return (await this.ordersService.remove(orderId)) && orderId;
    }
}
