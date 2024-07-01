import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

    async create(createInventoryDto: CreateInventoryDto): Promise<CreateInventoryDto> {
        const inventory = await this.inventoryRepository.create({ ...createInventoryDto });

        return new CreateInventoryDto(inventory);
    }

    async findAll(): Promise<CreateInventoryDto[]> {
        const inventories = await this.inventoryRepository.findAll<Inventory>();

        if (!inventories) return [];

        const inventoriesDto = inventories.map((inventory) => new CreateInventoryDto(inventory));

        return inventoriesDto;
    }

    async findOne(id: number): Promise<CreateInventoryDto> {
        const inventory = await this.inventoryRepository.findByPk<Inventory>(id);

        if (!inventory) throw new NotFoundException('Inventory not found');

        const inventoryDto = new CreateInventoryDto(inventory);

        return inventoryDto;
    }

    async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<UpdateInventoryDto> {
        const inventory = await this.inventoryRepository.findByPk<Inventory>(id);

        if (!inventory) throw new NotFoundException('Inventory not found');

        const updatedInventory = await inventory.update(updateInventoryDto);
        const updatedInventoryDto = new UpdateInventoryDto(updatedInventory);

        return updatedInventoryDto;
    }

    async remove(id: number) {
        const inventory = await this.inventoryRepository.findByPk<Inventory>(id);

        if (!inventory) throw new NotFoundException('Inventory not found');

        inventory.destroy();
    }
}
