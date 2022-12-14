import { registerAs } from "@nestjs/config"

export default registerAs('database', () => {
    return {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5433,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        synchronize: process.env.SYNCHRONIZE || false,
        autoLoadEntities: true,
        entities: ["dist/**/*.entity.js"],
        migrations: ['dist/migrations/*{.ts,.js}'],
        cli: {
            migrationsDir: 'dist/migrations'
        },
    }
})