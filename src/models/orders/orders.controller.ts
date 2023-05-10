import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dtos/create-order.dto";
import {FindOrderDto} from "./dtos/find-order.dto";
import {UpdateOrderDto} from "./dtos/update-order.dto";
import {ProductsService} from "../products/products.service";
import {Product} from "../products/product.entity";
import {Serialize} from "../../interceptors/serialize.interceptor";
import {OrderDto} from "./dtos/order.dto";
import {UsersService} from "../users/users.service";

@Controller('orders')
@Serialize(OrderDto)
export class OrdersController {
    constructor(private ordersService: OrdersService,
                private productsService: ProductsService,
                private usersService: UsersService
    ) {
    }

    @Get()
    getAllOrders() {
        return this.ordersService.find();
    }

    @Get('/:id')
    async findOrder(@Param('id') id: string) {
        const order = await this.ordersService.findById(parseInt(id));
        if (!order) {
            throw new NotFoundException('order not found');
        }
        return order;
    }

    @Post('/find')
    findOrders(@Body() body: FindOrderDto) {
        return this.ordersService.find(body);
    }

    @Post()
    async createOrder(@Body() body: CreateOrderDto) {
        //retrieving user
        const user = await this.usersService.findById(body.userId);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        //retrieving products
        const products: Product[] = [];
        for (const productId of body.productsIds) {
            const product = await this.productsService.findById(productId);
            if (!product) {
                throw new NotFoundException('furType not found');
            }
            products.push(product);
        }
        return this.ordersService.create(user, products);
    }

    @Delete(':id')
    async removeOrder(@Param('id') id: string) {
        const orderId = parseInt(id);
        return (await this.ordersService.remove(orderId)) && orderId;
    }

    @Patch('/:id')
    updateOrder(@Param('id') id: string, @Body() body: UpdateOrderDto) {
        return this.ordersService.update(parseInt(id), body);
    }
}
