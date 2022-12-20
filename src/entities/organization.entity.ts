import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('organizations')
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, (user) => user.organization, { nullable: true, cascade: true })
    @JoinColumn()
    user: User

    @Index({ fulltext: true })
    @Column({ nullable: true })
    name: string;

    @Index({ fulltext: true })
    @Column({ nullable: true })
    type: string;

    @Index({ fulltext: true })
    @Column({ nullable: true })
    location: string;

    @Index({ fulltext: true })
    @Column({ nullable: true })
    memberTotal: number;

    @CreateDateColumn({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}