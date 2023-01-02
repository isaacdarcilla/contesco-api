import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import config from 'src/config/database.config';
import { UsersModule } from './api/users/users.module';
import { OrganizationsModule } from './api/organizations/organizations.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                ...configService.get('database'),
            }),
        }),
        AuthModule,
        UsersModule,
        OrganizationsModule,
    ],
})
export class AppModule {}
