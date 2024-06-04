import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Inventory extends Model {
    @Column
    name: string;

    @Column(DataType.DECIMAL)
    quantity: number;

    @Column
    unit: string;
}
