import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "./enum/orderStatus.enum";
import { OrderItemEntity } from "./orderItem.entity";

@Entity('order')
export class OrderEntity {

    @PrimaryGeneratedColumn()
     id: number;

     @Column({
        type: 'varchar',
        nullable: false
    })
     userMail: string;

     @Column({
        type: 'varchar',
        nullable: false
    })
     date: string;

     @Column({
        type: 'varchar',
        nullable: false
    })
     shippingAddress: string;

     @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.OrderReceive
    })
     status: OrderStatus;

     @Column({
        type: 'decimal',
        nullable: false
    })
     subTotal: number;

     @Column({
        type: 'decimal',
        nullable: false
    })
     deliveryCharge: number;


     @OneToMany(() => OrderItemEntity, orderItem => orderItem.order)
     @JoinColumn()
     orderItem: OrderItemEntity[];



}