import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Ingredient extends Model {
    @Column
    name: string;

    @Column(DataType.DECIMAL)
    unit_price: number;
}
