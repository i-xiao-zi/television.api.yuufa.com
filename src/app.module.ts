import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import AuthModule from './module/auth';
import AppController from './controller/app';
import AppService from './service/app';
import MysqlModule from "./module/mysql";
import ResponseModule from "./module/response";
import AuthController from "./controller/auth";
import AuthService from "./service/auth";
import SearchorController from "./controller/searchor";
import SearchorService from "./service/searchor";
import NoteController from './controller/note';
import NoteService from './service/note';
import CronController from './controller/cron';
import CronService from './service/cron';
import YouNongPaiController from "./controller/you_nong_pai";
import YouNongPaiService from "./service/you_nong_pai";
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
    CronController,
    YouNongPaiController,
    TvController,
    VideoController,
    AuthController,
    NoteController,
    SearchorController
  ],
  providers: [
    AppService,
    CronService,
    TaskService,
    YouNongPaiService,
    TvService,
    VideoService,
    KekeTvTvService,
    AuthService,
    NoteService,
    SearchorService,
  ],
})
export class AppModule {}
