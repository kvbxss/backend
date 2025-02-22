import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './common/database/database.module';
import { GraphqlModule } from './common/graphql/graphql.module';
import { env } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(
      env.NODE_ENV === 'development'
        ? { isGlobal: true }
        : { envFilePath: '.env' },
    ),
    TaskModule,
    DatabaseModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
