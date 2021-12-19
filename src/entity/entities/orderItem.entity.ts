import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity('orderItem')
export class OrderItemEntity { 

    @PrimaryGeneratedColumn()
     id: number;

     @Column({
        type: 'varchar',
        nullable: false
    })
     title: string;
     
     @Column({
        type: 'decimal',
        nullable: false
    })
     price: number;

     @Column({
        type: 'varchar',
        nullable: false
    })
     productImage: string;

     @Column({
        type: 'decimal',
        nullable: false
    })
     quantity: number;

     @ManyToOne(() => OrderEntity)
     @JoinColumn()
     order: OrderEntity;

}