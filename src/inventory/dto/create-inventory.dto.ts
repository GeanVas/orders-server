import { Inventory } from '../entities/inventory.entity';

export class CreateInventoryDto {
    id?: number;

    name: string;

    quantity: number;

    unit: string;

    constructor(data: Partial<CreateInventoryDto> | Inventory) {
        if (data instanceof Inventory) {
            // Assuming Inventory is a class with properties id, name, quantity, and unit
            this.id = data.id;
            this.name = data.name;
            this.quantity = data.quantity;
            this.unit = data.unit;
        } else {
            // Handle the case where data is a Partial<CreateInventoryDto>
            Object.assign(this, data);
        }
    }
}
