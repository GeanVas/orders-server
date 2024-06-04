import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { RecipeModule } from './recipe/recipe.module';
import { InventoryModule } from './inventory/inventory.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';

@Module({
    imports: [
        OrdersModule,
        RecipeModule,
        InventoryModule,
        IngredientsModule,
        RecipeIngredientsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
