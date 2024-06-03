import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
    imports: [OrdersModule, RecipeModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
