import { ORDERS_REPOSITORY } from 'src/shared/constants/entityProviders';
import { Order } from './entities/order.entity';

export const ordersProviders = [
    {
        provide: ORDERS_REPOSITORY,
        useValue: Order,
    },
];
