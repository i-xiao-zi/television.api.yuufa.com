import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../entity/user';
import {ConfigModule, ConfigService} from "@nestjs/config";
import fs from "fs";
import path from "path";
import SearchorModelService from "../service/searchor.model";
import UserModelService from '../service/user.model';
import Searchor from "../entity/searchor";
import SearchorType from "../entity/searchor_type";
import SearchorTypeModelService from "../service/searchor_type.model";
import NoteCategoryModelService from '../service/note_category.model';
import NoteContentModelService from '../service/note_content.model';
import NoteCategory from '../entity/note_category';
import NoteContent from '../entity/note_content';
import YouNongPai from "../entity/you_nong_pai";
import YouNongPaiModelService from "../service/you_nong_pai.model";
import TvChannel from '../entity/tv_channel';
import TvSchedule from '../entity/tv_schedule';
import TvChannelModelService from '../service/tv_channel.model';
import TvScheduleModelService from '../service/tv_schedule.model';
import VideoOriginModelService from '../service/video_origin.model';
import Video from "../entity/video";
import VideoOrigin from '../entity/video_origin';
import VideoArea from "../entity/video_area";
import VideoUrl from "../entity/video_url";
import VideoTag from "../entity/video_tag";
import VideoLog from '../entity/video_log';
import VideoModelService from "../service/video.model";
import VideoUrlModelService from "../service/video_url.model";
import VideoLogModelService from '../service/video_log.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '../entity/*.ts'],
        autoLoadEntities: true,
        logging: ['error'], // true
        timezone: "+08:00",
        logger: "advanced-console",
        ssl: configService.get<string>('NODE_ENV') == 'production' ? {
          ca:  fs.readFileSync(path.join(__dirname, '../../mysql.pem')),
        } : null,
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User, 
      Searchor, 
      SearchorType, 
      NoteCategory, 
      NoteContent, 
      YouNongPai, 
      TvChannel, 
      TvSchedule, 
      VideoOrigin,
      VideoArea,
      Video,
      VideoUrl,
      VideoTag,
      VideoLog,
    ]),
  ],
  providers: [
    UserModelService, 
    SearchorModelService, 
    SearchorTypeModelService, 
    NoteCategoryModelService, 
    NoteContentModelService, 
    YouNongPaiModelService, 
    TvChannelModelService, 
    TvScheduleModelService,
    VideoOriginModelService,
    VideoModelService,
    VideoUrlModelService,
    VideoLogModelService,
  ],
  exports: [
    UserModelService, 
    SearchorModelService, 
    SearchorTypeModelService, 
    NoteCategoryModelService, 
    NoteContentModelService, 
    YouNongPaiModelService, 
    TvChannelModelService, 
    TvScheduleModelService,
    VideoOriginModelService,
    VideoModelService,
    VideoUrlModelService,
    VideoLogModelService,
  ],
})
export default class MysqlModule {}