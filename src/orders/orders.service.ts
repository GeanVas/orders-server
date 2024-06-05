import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ORDERS_REPOSITORY } from 'src/shared/constants/entityProviders';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Injectable()
export class OrdersService {
    constructor(
        @Inject(ORDERS_REPOSITORY)
        private ordersRepository: typeof Order,
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        let order = new Order();
        order = Object.assign(order, createOrderDto);
        if (!order.sequence) {
            const options = {
                where: { status: order.status },
            };
            const lastSeq = await this.ordersRepository.max<number, Order>('sequence', options);
            order.sequence = (lastSeq || 0) + 1;
        }
        return order.save();
    }

    findAll(): Promise<Order[]> {
        return this.ordersRepository.findAll<Order>();
    }

    findOne(id: number): Promise<Order> {
        return this.ordersRepository.findOne<Order>({
            where: { id },
            include: [Recipe],
        });
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
        let order = await this.findOne(id);

        if (!order) throw new Error('Order not found');

        order = Object.assign(order, updateOrderDto);

        if (Array.isArray(updateOrderDto.recipes)) {
            const recipeIds = updateOrderDto.recipes.map((recipe) => recipe.id).filter((id) => id);

            await order.$set('recipes', recipeIds);
        }

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
