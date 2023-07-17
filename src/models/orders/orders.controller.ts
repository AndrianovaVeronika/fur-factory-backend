import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dtos/create-order.dto";
import {FindOrderDto} from "./dtos/find-order.dto";
import {ProductsService} from "../products/products.service";
import {Product} from "../products/product.entity";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {OrderDto} from "./dtos/order.dto";
import {AdminGuard} from "../../guards/admin.guard";
import {CurrentUser} from "../users/decorators/current-user.decorator";
import {User} from "../users/user.entity";
import {AuthGuard} from "../../guards/auth.guard";
import {UpdateOrderDto} from "./dtos/update-order.dto";

@Controller('orders')
@Serialize(OrderDto)
export class OrdersController {
    constructor(private ordersService: OrdersService,
                private productsService: ProductsService
    ) {
    }

    @Get()
    @UseGuards(AdminGuard)
    getAllOrders() {
        return this.ordersService.find();
    }

    @Get('/current')
    @UseGuards(AuthGuard)
    getCurrentUserOrders(@CurrentUser() user: User) {
        return this.ordersService.find({user});
    }

    @Get('/:id')
    @UseGuards(AdminGuard)
    async findOrder(@Param('id') id: string) {
        const order = await this.ordersService.findById(parseInt(id));
        if (!order) {
            throw new NotFoundException('order not found');
        }
        return order;
    }

    @Post('/find')
    @UseGuards(AdminGuard)
    findOrders(@Body() body: FindOrderDto) {
        return this.ordersService.find(body);
    }

    @Post('/place')
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
    @UseGuards(AdminGuard)
    async removeOrder(@Param('id') id: string) {
        const orderId = parseInt(id);
        return (await this.ordersService.remove(orderId)) && orderId;
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    updateOrder(@Param('id') id: string, @Body() body: UpdateOrderDto) {
        return this.ordersService.update(parseInt(id), body);
    }
}
