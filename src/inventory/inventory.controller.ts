import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Post()
    create(@Body() createInventoryDto: CreateInventoryDto) {
        this.inventoryService.create(createInventoryDto);
    }

    @Get()
    findAll(): Promise<CreateInventoryDto[]> {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<CreateInventoryDto> {
        return this.inventoryService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
        this.inventoryService.update(+id, updateInventoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.inventoryService.remove(+id);
    }
}
