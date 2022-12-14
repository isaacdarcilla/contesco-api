import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll(options?: { pagination: number, sortDirection: string, sortField: string }): Promise<User[]> {
        return this.userRepository.find({
            where: {
                deletedAt: IsNull(),
            },
            take: options.pagination || 10,
            order: {
                [options.sortField]: options.sortDirection === "descending" ? 'DESC' : 'ASC',
            }
        });
    }

    async findOne(userId: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: { 
                organization: true,
            }
        });
    }
}
