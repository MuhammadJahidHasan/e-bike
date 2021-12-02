import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity('product')
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    title: string;
    @Column({
        type: 'varchar',
    })
    description: string;

    @Column({
        type: 'decimal',
        nullable: false
    })
    price: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    brand: string;

    @Column({
        type: 'varchar',
    })
    productImage: string;

    @ManyToOne(() => CategoryEntity,product=> product.category)
    @JoinColumn()
    category: CategoryEntity
    
}