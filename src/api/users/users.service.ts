import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../../dto/users/create-user.dto';
import { UserFindAll } from '../../types/user-find-all.type';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll(options?: UserFindAll): Promise<User[]> {
        return this.userRepository.manager
            .createQueryBuilder(User, "user")
            .leftJoinAndSelect("user.organization", "userId")
            .take(options.pagination || 10)
            .orderBy(options.sortField, options.sortDirection === "descending" ? "DESC" : "ASC")
            .where("user.email LIKE :query")
            .orWhere("user.firstName LIKE :query")
            .orWhere("user.middleName LIKE :query")
            .orWhere("user.lastName LIKE :query")
            .orWhere("user.userName LIKE :query")
            .setParameter("query", `%${options.searchTerm}%`)
            .getMany();
    }

    async findOne(userId: string): Promise<User> {
        return this.userRepository.manager
            .createQueryBuilder(User, "user")
            .leftJoinAndSelect("user.organization", "userId")
            .where("user.id = :userId", { userId })
            .getOne();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async delete(userId: string): Promise<UpdateResult> {
        return this.userRepository.softDelete(userId);
    }
}
