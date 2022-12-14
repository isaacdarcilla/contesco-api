import * as bcrypt from 'bcrypt';
import {
    BeforeInsert,
    BeforeUpdate,
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
    @BeforeUpdate()
    async encrypt() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}
