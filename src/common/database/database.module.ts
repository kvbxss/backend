import { Module } from '@nestjs/common';
import {
  AsyncModelFactory,
  ModelDefinition,
  MongooseModule,
} from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectOptions } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri: string = configService.get(
          'MONGODB_URI',
          'mongodb://localhost:27017',
        );
        const options: ConnectOptions = {
          maxPoolSize: 10,
          minPoolSize: 5,
          maxIdleTimeMS: 30000,
          connectTimeoutMS: 10000,
          socketTimeoutMS: 45000,
        };
        return {
          uri,
          ...options,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
  static forFeatureAsync(factories: AsyncModelFactory[]) {
    return MongooseModule.forFeatureAsync(factories);
  }
}
