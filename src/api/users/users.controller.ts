import { Controller, Get, Param, Query, Version } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Version('1')
    @Get()
    findAll(@Query('pagination') pagination?: number, @Query('sortDirection') sortDirection?: string, @Query('sortField') sortField: string  = 'user.createdAt'): Promise<User[]> {
        return this.usersService.findAll({
            pagination: pagination,
            sortDirection: sortDirection,
            sortField: sortField
        });
    }

    @Version('1')
    @Get(':id')
    findOne(@Param('id') userId: string): Promise<User> {
        return this.usersService.findOne(userId);
    }
}
