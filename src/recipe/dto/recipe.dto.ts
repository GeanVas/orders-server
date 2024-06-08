import { CreateIngredientDto } from 'src/ingredients/dto/create-ingredient.dto';

export class RecipeDto {
    id: number;

    name: string;

    description?: string;

    ingredients: CreateIngredientDto[] = [];

    createdAt: Date;

    updatedAt: Date;
}
