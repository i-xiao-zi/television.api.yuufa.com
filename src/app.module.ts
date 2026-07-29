import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
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
    MysqlModule,
    ScheduleModule.forRoot(),
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
