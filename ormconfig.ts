import { ConfigModule } from "@nestjs/config";
import config from 'src/config/database.config';

ConfigModule.forRoot({
    isGlobal: true,
    load: [config],
})

export default config()