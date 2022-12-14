import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: `${process.env.DB_HOST}`,
    port: parseInt(process.env.DB_PORT, 10) || 5433,
    database: '${process.env.DB_DATABASE}',
    username: '${process.env.DB_USERNAME}',
    password: '${process.env.DB_PASSWORD}',
    synchronize: false,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ['dist/migrations/*{.ts,.js}'],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;