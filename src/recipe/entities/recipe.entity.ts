import { Table, Model, BelongsToMany, Column } from 'sequelize-typescript';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { OrderRecipe } from 'src/order-recipe/order-recipe';
import { Order } from 'src/orders/entities/order.entity';
import { RecipeIngredient } from 'src/recipe-ingredients/entities/recipe-ingredient.entity';

@Table
export class Recipe extends Model {
    @Column
    name: string;

    @Column
    description: string;

    @BelongsToMany(() => Order, () => OrderRecipe)
    orders: Order[];

    @BelongsToMany(() => Ingredient, () => RecipeIngredient)
    ingredients: Ingredient[];
}
