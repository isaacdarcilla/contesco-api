import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('organizations')
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: true,
    })
    name: string;

    @Column({
        nullable: true,
    })
    type: string;

    @Column({
        nullable: true,
    })
    location: string;

    @Column({
        nullable: true,
    })
    memberTotal: number;

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