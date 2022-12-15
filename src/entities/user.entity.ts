import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from './organization.entity';
import * as bcrypt from 'bcrypt';
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Organization, (organization) => organization.user, { nullable: true, cascade: true })
    @JoinColumn()
    organization: Organization

    @Index({ fulltext: true })
    @Column({ nullable: true })
    firstName: string;

    @Index({ fulltext: true })
    @Column({ nullable: true })
    middleName: string;

    @Index({ fulltext: true })
    @Column({ nullable: true })
    lastName: string;

    @Index({ fulltext: true })
    @Column({ unique: true, nullable: true })
    userName: string;

    @Index({ fulltext: true })
    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ nullable: true })
    emailVerifiedAt: Date;

    @CreateDateColumn({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @BeforeInsert()
    async encrypt() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}