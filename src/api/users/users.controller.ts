import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Version,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UpdateResult } from 'typeorm';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Version('1')
    @Get()
    findAll(
        @Query('pagination') pagination?: number,
        @Query('sortDirection') sortDirection?: string,
        @Query('sortField') sortField = 'user.createdAt',
        @Query('searchTerm') searchTerm = '',
    ): Promise<User[]> {
        return this.usersService.findAll({
            pagination: pagination,
            sortDirection: sortDirection,
            sortField: sortField,
            searchTerm: searchTerm,
        });
    }

    @Version('1')
    @Get(':id')
    findOne(@Param('id') userId: string): Promise<User> {
        return this.usersService.findOne(userId);
    }

    @Version('1')
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Version('1')
    @Delete(':id')
    async delete(@Param('id') userId: string): Promise<UpdateResult> {
        return this.usersService.delete(userId);
    }
}
