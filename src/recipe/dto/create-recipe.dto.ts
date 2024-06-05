import { CreateIngredientDto } from 'src/ingredients/dto/create-ingredient.dto';

export class CreateRecipeDto {
    name: string;
    description?: string;
    ingredients: Array<CreateIngredientDto> = [];
}
