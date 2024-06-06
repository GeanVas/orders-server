import { Model, Column, Table, BelongsToMany, DataType } from 'sequelize-typescript';
import { OrderRecipe } from 'src/order-recipe/order-recipe';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { StatusEnum } from 'src/shared/enums/status';

@Table
export class Order extends Model<Order> {
    @Column
    customerName: string;

    @Column
    date: Date;

    @Column
    sequence: number;

    @Column(DataType.ENUM({ values: Object.values(StatusEnum) }))
    status: string;

    @Column(DataType.DECIMAL)
    totalPrice: number;

    @BelongsToMany(() => Recipe, () => OrderRecipe)
    recipes: Recipe[];
}
