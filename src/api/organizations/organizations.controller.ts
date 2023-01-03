import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Version
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateOrganizationDto } from 'src/api/organizations/dto/create-organization.dto';
import { UpdateOrganizationDto } from 'src/api/organizations/dto/update-organization.dto';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) {}

    @Version('1')
    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit = 10,
        @Query('sortDirection') sortDirection = 'descending',
        @Query('sortField') sortField = 'organization.createdAt',
        @Query('searchTerm') searchTerm = '',
    ): Promise<Pagination<Organization>> {
        limit = limit > 100 ? 100 : limit;
        return this.organizationsService.findAll(
            {
                page,
                sortDirection,
                sortField,
                searchTerm,
            },
            {
                page,
                limit,
                route: 'organizations',
            },
        );
    }

    @Version('1')
    @Get(':id')
    findOne(@Param('id') organizationId: string): Promise<Organization> {
        return this.organizationsService.findOne(organizationId);
    }

    @Version('1')
    @Post()
    async create(
        @Body() createOrganizationDto: CreateOrganizationDto,
    ): Promise<Organization> {
        return this.organizationsService.create(createOrganizationDto);
    }

    @Version('1')
    @Put(':id')
    async update(
        @Param('id') organizationId: string,
        @Body() updateOrganizationDto: UpdateOrganizationDto,
    ): Promise<Organization> {
        return this.organizationsService.update(
            organizationId,
            updateOrganizationDto,
        );
    }

    @Version('1')
    @Delete(':id')
    async delete(@Param('id') organizationId: string): Promise<Organization> {
        return this.organizationsService.delete(organizationId);
    }
}
