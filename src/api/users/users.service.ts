import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll(options?: { pagination: number, sortDirection: string, sortField: string }): Promise<User[]> {
        return this.userRepository.manager
            .createQueryBuilder(User, "user")
            .leftJoinAndSelect("user.organization", "organizationId")
            .take(options.pagination || 10)
            .orderBy(options.sortField, options.sortDirection === "descending" ? "DESC" : "ASC")
            .getMany();
    }

    async findOne(userId: string): Promise<User> {
        return this.userRepository.manager
            .createQueryBuilder(User, "user")
            .leftJoinAndSelect("user.organization", "organizationId")
            .where("user.id = :userId", { userId })
            .getOne();
    }
}
