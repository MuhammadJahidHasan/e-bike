import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

}