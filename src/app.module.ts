import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { SupabaseModule } from 'nestjs-supabase-js';
import AppController from './controller/app';
import AppService from './service/app';
import ResponseModule from "./module/response";
import TaskController from "./controller/task";
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
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        supabaseUrl: configService.getOrThrow<string>('SUPABASE_URL'),
        supabaseKey: configService.getOrThrow<string>('SUPABASE_KEY'),
      }),
    }),
    SupabaseModule.injectClient(),
    ScheduleModule.forRoot(),
    ControllerModule,
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
  ],
})
export class AppModule {}
