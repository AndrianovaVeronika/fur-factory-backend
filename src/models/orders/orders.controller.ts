import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dtos/create-order.dto";
import {FindOrderDto} from "./dtos/find-order.dto";
import {UpdateOrderDto} from "./dtos/update-order.dto";

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {
    }

    @Get()
    getOrders() {
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
    findAllOrders(@Body() body: FindOrderDto) {
        return this.ordersService.find(body);
    }

    @Post('/signup')
    async createOrder(@Body() body: CreateOrderDto) {
        await this.ordersService.create(body.userId, body.products);
    }

    @Delete(':id')
    removeOrder(@Param('id') id: string) {
        return this.ordersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateOrder(@Param('id') id: string, @Body() body: UpdateOrderDto) {
        return this.ordersService.update(parseInt(id), body);
    }
}
