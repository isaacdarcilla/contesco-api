import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Version,
    Headers,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common/pipes';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UpdateResult } from 'typeorm';
import { UsersService } from './users.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Version('1')
    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit = 10,
        @Query('sortDirection') sortDirection = 'descending',
        @Query('sortField') sortField = 'user.createdAt',
        @Query('searchTerm') searchTerm = '',
        @Headers('host') host: string,
    ): Promise<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;
        return this.usersService.findAll(
            {
                page,
                sortDirection,
                sortField,
                searchTerm,
            },
            {
                page,
                limit,
                route: 'users',
            },
        );
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
