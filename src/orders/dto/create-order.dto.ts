export class CreateOrderDto {
    readonly customerName: string;

    readonly date: Date = new Date();

    readonly sequence: number;

    readonly status: string = 'Pending';

    readonly totalPrice: number;

    readonly recipes: number[] = [];
}
