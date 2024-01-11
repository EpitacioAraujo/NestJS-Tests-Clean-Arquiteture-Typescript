import { Module } from '@nestjs/common'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'
import { UserModule } from './user/infrastructure/user.module'

@Module({
  imports: [EnvConfigModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
