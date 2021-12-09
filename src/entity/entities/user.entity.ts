import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./cart.entity";
import { Role } from "./enum/userRole.enum";


@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: 'varchar',
        nullable: false
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    phoneNumber: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    roles: Role[];

    @OneToMany(() => CartEntity, cart => cart.user)
    user: CartEntity[];

}