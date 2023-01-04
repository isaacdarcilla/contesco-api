import {
    IsAlpha,
    IsNotEmpty,
    IsOptional,
    IsAlphanumeric,
    IsEmail,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsAlpha()
    @IsNotEmpty()
    @MinLength(2)
    firstName: string;

    @IsOptional()
    middleName: string;

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(2)
    lastName: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @MinLength(6)
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsOptional()
    emailVerifiedAt: Date;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;

    @IsOptional()
    deletedAt: Date;
}
