import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

@Entity('cart')
export class CartEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: Number,
        nullable: false
    })
    quantity: number;


    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => ProductEntity)
    @JoinColumn()
    product: ProductEntity;

}