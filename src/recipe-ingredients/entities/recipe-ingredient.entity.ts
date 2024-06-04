import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Table
export class RecipeIngredient extends Model {
    @Column(DataType.DECIMAL)
    quantity: number;

    @Column
    unit: string;

    @ForeignKey(() => Ingredient)
    @Column
    ingredientId: number;

    @ForeignKey(() => Recipe)
    @Column
    recipeId: number;
}
