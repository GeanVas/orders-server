import { CreateRecipeDto } from 'src/recipe/dto/create-recipe.dto';

export class CreateOrderDto {
    readonly orderNumber: string;
    readonly orderPrice: number;
    readonly orderDate: Date;
    readonly orderStatus: string;
    readonly orderSequence: number;
    readonly customerName: string;
    readonly orderItems: Array<CreateRecipeDto>;
}
