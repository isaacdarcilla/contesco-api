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

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            where: {
                deletedAt: IsNull(),
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
