import * as bcrypt from 'bcrypt';
import { IsAlpha } from 'class-validator';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Organization } from '../organizations/organization.entity';
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Organization, (organization) => organization.user)
    organization: Organization;

    @IsAlpha()
    @IsNotEmpty()
    @Index({ fulltext: true })
    @Column({ nullable: true })
    firstName: string;

    @IsOptional()
    @Index({ fulltext: true })
    @Column({ nullable: true })
    middleName: string;

    @IsAlpha()
    @IsNotEmpty()
    @Index({ fulltext: true })
    @Column({ nullable: true })
    lastName: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @Index({ fulltext: true })
    @Column({ unique: true, nullable: true })
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    @Index({ fulltext: true })
    @Column({ unique: true, nullable: true })
    email: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @MinLength(8)
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
