export class CreateInventoryDto {
    id?: number;

    name: string;

    quantity: number;

    unit: string;

    constructor(partial: Partial<CreateInventoryDto>) {
        Object.assign(this, partial);
    }
}
