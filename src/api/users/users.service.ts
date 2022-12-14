import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    IPaginationOptions,
    paginate,
    Pagination,
} from 'nestjs-typeorm-paginate';
import { User } from 'src/api/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { IQueryParameters } from '../../global/search.helper';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(
        options?: IQueryParameters,
        paginationOptions?: IPaginationOptions,
    ): Promise<Pagination<User>> {
        const queryBuilder = this.userRepository.manager
            .createQueryBuilder(User, 'user')
            .leftJoinAndSelect('user.organization', 'userId')
            .orderBy(
                options.sortField,
                options.sortDirection === 'descending' ? 'DESC' : 'ASC',
            )
            .where('user.email LIKE :query')
            .orWhere('user.firstName LIKE :query')
            .orWhere('user.middleName LIKE :query')
            .orWhere('user.lastName LIKE :query')
            .orWhere('user.userName LIKE :query')
            .setParameter('query', `%${options.searchTerm}%`);

        return paginate<User>(queryBuilder, paginationOptions);
    }

    async findOne(userId: string): Promise<User> {
        return this.userRepository.manager
            .createQueryBuilder(User, 'user')
            .leftJoinAndSelect('user.organization', 'userId')
            .where('user.id = :userId', { userId })
            .getOne();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(userId);
        const update = this.userRepository.create({
            ...user,
            ...updateUserDto,
        });
        return this.userRepository.save(update);
    }

    async delete(userId: string): Promise<User> {
        const user = await this.findOne(userId);
        return this.userRepository.softRemove(user);
    }
}
