import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { RecipeIngredient } from 'src/recipe-ingredients/entities/recipe-ingredient.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Table
export class Ingredient extends Model {
    @Column
    name: string;

    @Column(DataType.DECIMAL)
    unit_price: number;

    @BelongsToMany(() => Recipe, () => RecipeIngredient)
    recipes: Recipe[];
}
