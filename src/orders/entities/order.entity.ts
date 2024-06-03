import { Model, Column, Table, BelongsToMany } from 'sequelize-typescript';
import { OrderRecipe } from 'src/order-recipe/order-recipe';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Table
export class Order extends Model<Order> {
    @Column
    price: number;

    @Column
    customerName: string;

    @Column
    date: Date;

    @Column
    sequence: number;

    @Column
    status: string;

    @BelongsToMany(() => Recipe, () => OrderRecipe)
    recipes: Recipe[];
}
