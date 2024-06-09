import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { INVENTORY_REPOSITORY } from 'src/shared/constants/entityProviders';

@Injectable()
export class InventoryService {
    constructor(
        @Inject(INVENTORY_REPOSITORY)
        private inventoryRepository: typeof Inventory,
    ) {}

    create(createInventoryDto: CreateInventoryDto): Promise<CreateInventoryDto> {
        const inventory = this.inventoryRepository.create({ ...createInventoryDto });

        return inventory;
    }

    findAll(): Promise<CreateInventoryDto[]> {
        return this.inventoryRepository.findAll<Inventory>() as Promise<CreateInventoryDto[]>;
    }

    findOne(id: number): Promise<CreateInventoryDto> {
        const inventory = this.inventoryRepository.findByPk<Inventory>(
            id,
        ) as Promise<CreateInventoryDto>;
        if (!inventory) throw new Error('Inventory not found');

        return inventory;
    }

    async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<UpdateInventoryDto> {
        const inventory = await this.inventoryRepository.findByPk<Inventory>(id);
        if (!inventory) throw new Error('Inventory not found');

        inventory.update(updateInventoryDto);
        return inventory;
    }

    async remove(id: number) {
        const inventory = await this.inventoryRepository.findByPk<Inventory>(id);
        if (!inventory) throw new Error('Inventory not found');

        inventory.destroy();
    }
}
