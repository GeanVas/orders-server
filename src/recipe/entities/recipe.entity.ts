import { Table, Model, BelongsToMany } from 'sequelize-typescript';
import { OrderRecipe } from 'src/order-recipe/order-recipe';
import { Order } from 'src/orders/entities/order.entity';

@Table
export class Recipe extends Model {
    @BelongsToMany(() => Order, () => OrderRecipe)
    orders: Order[];
}
