import {
    IsAlpha,
    IsNotEmpty,
    IsOptional,
    MinLength,
    IsInt,
} from 'class-validator';

export class CreateOrganizationDto {
    @IsAlpha()
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(2)
    type: string;

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(4)
    location: string;

    @IsInt()
    @IsNotEmpty()
    memberTotal: number;

    @IsOptional()
    userId: string;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;

    @IsOptional()
    deletedAt: Date;
}
