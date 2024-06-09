import { CreateRecipeDto } from 'src/recipe/dto/create-recipe.dto';
import { IsDate, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { StatusEnum } from 'src/shared/enums/status';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    readonly customerName!: string;

    @IsDate()
    readonly date: Date = new Date();

    @IsInt()
    readonly sequence: number;

    @IsEnum(StatusEnum)
    readonly status: string = StatusEnum.PENDING;

    @IsDecimal()
    readonly totalPrice!: number;

    readonly recipes: number[] = [];
}
