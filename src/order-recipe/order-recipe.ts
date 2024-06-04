import {
    Table,
    Model,
    ForeignKey,
    Column,
    DataType,
} from 'sequelize-typescript';
import { Order } from 'src/orders/entities/order.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Table
export class OrderRecipe extends Model {
    @ForeignKey(() => Order)
    @Column
    orderId: number;

    @ForeignKey(() => Recipe)
    @Column
    recipeId: number;

    @Column
    quantity: number;

    @Column(DataType.DECIMAL)
    price: number;
}
