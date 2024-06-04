import { Table, Model, BelongsToMany, Column } from 'sequelize-typescript';
import { OrderRecipe } from 'src/order-recipe/order-recipe';
import { Order } from 'src/orders/entities/order.entity';

@Table
export class Recipe extends Model {
    @Column
    name: string;

    @Column
    description: string;

    @BelongsToMany(() => Order, () => OrderRecipe)
    orders: Order[];
}
