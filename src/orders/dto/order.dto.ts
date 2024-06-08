import { CreateRecipeDto } from 'src/recipe/dto/create-recipe.dto';

export class OrderDto {
    readonly id: number;

    readonly customerName: string;

    readonly date: Date = new Date();

    readonly sequence: number;

    readonly status: string = 'Pending';

    readonly totalPrice: number;

    readonly recipes?: CreateRecipeDto[] = [];

    readonly createdAt: Date;

    readonly updatedAt: Date;

    constructor(partial: Partial<OrderDto>) {
        Object.assign(this, partial);
    }
}
