import { PartialType } from '@nestjs/swagger';
import { CreateInventoryDto } from './create-inventory.dto';
import { Inventory } from '../entities/inventory.entity';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
    constructor(data?: Partial<UpdateInventoryDto> | Inventory) {
        super();
        if (data instanceof Inventory) {
            this.id = data.id;
            this.name = data.name;
            this.quantity = data.quantity;
            this.unit = data.unit;
        } else if (data) {
            Object.assign(this, data);
        }
    }
}
