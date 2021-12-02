import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('category')
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @OneToMany(()=> ProductEntity, product => product.category)
    category: ProductEntity[];
}