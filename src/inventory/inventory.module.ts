import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { inventoryProviders } from './inventory.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [InventoryController],
    providers: [InventoryService, ...inventoryProviders],
})
export class InventoryModule {}
