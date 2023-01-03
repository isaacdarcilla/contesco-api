import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Version
} from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common/pipes';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { User } from 'src/api/users/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Version('1')
    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit = 10,
        @Query('sortDirection') sortDirection = 'descending',
        @Query('sortField') sortField = 'user.createdAt',
        @Query('searchTerm') searchTerm = '',
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
    @Put(':id')
    async update(
        @Param('id') userId: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(userId, updateUserDto);
    }

    @Version('1')
    @Delete(':id')
    async delete(@Param('id') userId: string): Promise<User> {
        return this.usersService.delete(userId);
    }
}
