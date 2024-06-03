import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @Inject('ORDERS_REPOSITORY')
        private ordersRepository: typeof Order,
    ) {}

    create(createOrderDto: CreateOrderDto) {
        const order = new Order();
        order.price = createOrderDto.orderPrice;
        return order.save();
    }

    findAll(): Promise<Order[]> {
        return this.ordersRepository.findAll<Order>();
    }

    findOne(id: number) {
        return `This action returns a #${id} order`;
    }

    update(id: number, updateOrderDto: UpdateOrderDto) {
        const order = new Order();
        order.price = updateOrderDto.orderPrice;
        return order.save();
    }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }
}
