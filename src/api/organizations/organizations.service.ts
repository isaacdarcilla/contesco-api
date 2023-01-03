import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    IPaginationOptions, paginate,
    Pagination
} from 'nestjs-typeorm-paginate';
import { UpdateOrganizationDto } from 'src/api/organizations/dto/update-organization.dto';
import { IQueryParameters } from 'src/global/search.helper';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) {}

    async findAll(
        options?: IQueryParameters,
        paginationOptions?: IPaginationOptions,
    ): Promise<Pagination<Organization>> {
        const queryBuilder = this.organizationRepository.manager
            .createQueryBuilder(Organization, 'organization')
            .leftJoinAndSelect('organization.user', 'organizationId')
            .orderBy(
                options.sortField,
                options.sortDirection === 'descending' ? 'DESC' : 'ASC',
            )
            .where('organization.name LIKE :query')
            .orWhere('organization.type LIKE :query')
            .orWhere('organization.location LIKE :query')
            .setParameter('query', `%${options.searchTerm}%`);

        return paginate<Organization>(queryBuilder, paginationOptions);
    }

    async findOne(organizationId: string): Promise<Organization> {
        return this.organizationRepository.manager
            .createQueryBuilder(Organization, 'organization')
            .leftJoinAndSelect('organization.user', 'organizationId')
            .where('organization.id = :organizationId', { organizationId })
            .getOne();
    }

    async create(
        createOrganizationDto: CreateOrganizationDto,
    ): Promise<Organization> {
        const organization = this.organizationRepository.create(
            createOrganizationDto,
        );
        return this.organizationRepository.save(organization);
    }

    async update(
        organizationId: string,
        updateOrganizationDto: UpdateOrganizationDto,
    ): Promise<Organization> {
        const organization = await this.findOne(organizationId);
        return this.organizationRepository.save({
            ...organization,
            ...updateOrganizationDto,
        });
    }

    async delete(organizationId: string): Promise<Organization> {
        const organization = await this.findOne(organizationId);
        return this.organizationRepository.softRemove(organization);
    }
}
