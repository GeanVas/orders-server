import { OmitType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { UpdateRecipeDto } from 'src/recipe/dto/update-recipe.dto';

export class UpdateOrderDto extends OmitType(CreateOrderDto, ['recipes']) {
    readonly id: number;
    readonly recipes: Array<UpdateRecipeDto> = [];
}
