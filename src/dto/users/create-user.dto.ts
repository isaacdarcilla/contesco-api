export class CreateUserDto {
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    organizationId: string
    emailVerifiedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}