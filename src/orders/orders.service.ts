import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ORDERS_REPOSITORY } from 'src/shared/constants/entityProviders';

@Injectable()
export class OrdersService {
    constructor(
        @Inject(ORDERS_REPOSITORY)
        private ordersRepository: typeof Order,
    ) {}

    create(createOrderDto: CreateOrderDto): Promise<Order> {
        let order = new Order();
        order = Object.assign(order, createOrderDto);
        return order.save();
    }

    findAll(): Promise<Order[]> {
        return this.ordersRepository.findAll<Order>();
    }

    findOne(id: number): Promise<Order> {
        return this.ordersRepository.findOne<Order>({ where: { id } });
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.findOne(id);
        order.price = updateOrderDto.orderPrice;
        return order.save();
    }

    async updatePartial(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
        let order = await this.findOne(id);
        if (!order) throw new Error('Order not found');
        order = Object.assign(order, updateOrderDto);
        return order.save();
    }

    remove(id: number): Promise<number> {
        return this.ordersRepository.destroy({ where: { id } });
    }
}
