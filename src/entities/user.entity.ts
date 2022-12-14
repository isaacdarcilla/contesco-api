import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from './organization.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @OneToOne(() => Organization)
    @JoinColumn()
    organization: Organization

    @Column({
        nullable: true,
    })
    firstName: string;

    @Column({
        nullable: true,
    })
    middleName: string;

    @Column({
        nullable: true,
    })
    lastName: string;

    @Column({
        unique: true,
        nullable: true
    })
    userName: string;

    @Column({
        unique: true,
        nullable: true,
    })
    email: string;

    @Column({
        nullable: false,
        select: false,
    })
    password: string;

    @Column({
        nullable: true
    })
    emailVerifiedAt: Date;

    @CreateDateColumn({
        nullable: true
    })
    createdAt: Date;

    @UpdateDateColumn({
        nullable: true
    })
    updatedAt: Date;

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt: Date;
}