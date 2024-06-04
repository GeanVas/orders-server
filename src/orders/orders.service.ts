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
        const order = new Order();
        order.price = createOrderDto.orderPrice;
        return order.save();
    }

    findAll(): Promise<Order[]> {
        return this.ordersRepository.findAll<Order>();
    }

    findOne(id: number): Promise<Order> {
        return this.ordersRepository.findOne<Order>({ where: { id } });
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
