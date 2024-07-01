import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ORDERS_REPOSITORY } from 'src/shared/constants/entityProviders';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { RecipeDto } from 'src/recipe/dto/recipe.dto';
import { OrderDto } from './dto/order.dto';

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
        await order.save();

        if (Array.isArray(createOrderDto.recipes)) {
            for (const recipeDto of createOrderDto.recipes) {
                const recipe = await Recipe.findByPk(recipeDto.id);
                if (!recipe) throw new Error(`Recipe with ID ${recipeDto.id} does not exist`);
                await order.$add('recipe', recipe.id);
            }
        }

        return order;
    }

    async findAll(): Promise<OrderDto[]> {
        const orders = await this.ordersRepository.findAll<Order>();
        return orders.map((order) => order as OrderDto);
    }

    private findOneByIdWithRecipes(id: number): Promise<Order> {
        return this.ordersRepository.findOne<Order>({
            where: { id },
            include: [Recipe],
        });
    }

    async findOne(id: number): Promise<OrderDto> {
        const order = await this.findOneByIdWithRecipes(id);
        if (!order) throw new Error('Order not found');

        const { recipes, ...orderData } = order.dataValues;

        const recipeDtos = recipes.map((recipe) => recipe as RecipeDto);
        const orderDto = new OrderDto({ ...orderData, recipes: recipeDtos });

        return orderDto;
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
        let order = await this.findOneByIdWithRecipes(id);

        if (!order) throw new Error('Order not found');

        order = Object.assign(order, updateOrderDto);

        if (Array.isArray(updateOrderDto.recipes)) {
            const recipeIds = updateOrderDto.recipes.map((recipe) => recipe.id).filter((id) => id);

            await order.$set('recipes', recipeIds);
        }

        return order.save();
    }

    async updatePartial(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
        let order = await this.findOneByIdWithRecipes(id);
        if (!order) throw new Error('Order not found');
        order = Object.assign(order, updateOrderDto);
        return order.save();
    }

    remove(id: number): Promise<number> {
        return this.ordersRepository.destroy({ where: { id } });
    }
}
