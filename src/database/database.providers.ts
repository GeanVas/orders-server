import { Sequelize } from 'sequelize-typescript';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

import { OrderRecipe } from 'src/order-recipe/order-recipe';
import { Order } from 'src/orders/entities/order.entity';
import { RecipeIngredient } from 'src/recipe-ingredients/entities/recipe-ingredient.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                models: [
                    Order,
                    Recipe,
                    OrderRecipe,
                    Ingredient,
                    RecipeIngredient,
                    Inventory,
                ],
            });
            await sequelize.sync({ alter: true });
            return sequelize;
        },
    },
];
