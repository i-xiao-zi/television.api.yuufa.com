import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { SupabaseModule } from 'nestjs-supabase-js';
import AuthModule from './module/auth';
import AppController from './controller/app';
import AppService from './service/app';
import MysqlModule from "./module/mysql";
import ResponseModule from "./module/response";
import TaskController from "./controller/task";
import AuthService from "./service/auth";
import TvController from "./controller/tv";
import TvService from './service/tv';
import KekeTvTvService from "./service/keke.tv";
import ControllerModule from './module/controller';
import { ScheduleModule } from '@nestjs/schedule';
import TaskService from './service/task';
import VideoController from './controller/video';
import VideoService from './service/video';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SupabaseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        supabaseUrl: configService.getOrThrow<string>('SUPABASE_URL'),
        supabaseKey: configService.getOrThrow<string>('SUPABASE_KEY'),
      }),
    }),
    ScheduleModule.forRoot(),
    MysqlModule,
    ControllerModule,
    AuthModule,
    ResponseModule,
  ],
  controllers: [
    AppController,
    TvController,
    VideoController,
    TaskController,
  ],
  providers: [
    AppService,
    TaskService,
    TvService,
    VideoService,
    KekeTvTvService,
    AuthService,
  ],
})
export class AppModule {}
