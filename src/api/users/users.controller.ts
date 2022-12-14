import { Controller, Get, HttpCode, Param, Version } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Version('1')
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Version('1')
    @Get(':id')
    findOne(@Param('id') userId: string): Promise<User> {
        return this.usersService.findOne(userId);
    }
}
