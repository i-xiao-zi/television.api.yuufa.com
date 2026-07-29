import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {hash} from "typeorm/util/StringUtils";
import {ConfigService} from "@nestjs/config";
import path from "path";
import UserModelService from "./user.model";
import { Cron } from '@nestjs/schedule';
import VideoOriginModelService from "./video_origin.model";
import VideoModelService from "./video.model";
import VideoUrlModelService from "./video_url.model";
import {VideoList} from "./tv.types";
import VideoLogModelService from './video_log.model';
import TvVideoOrigin from 'src/entity/video_origin';
import dayjs from 'dayjs';

@Injectable()
export default class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userModelService: UserModelService,
    private readonly videoOriginModelService: VideoOriginModelService,
    private readonly videoModelService: VideoModelService,
    private readonly videoUrlModelService: VideoUrlModelService,
    private readonly videoLogModelService: VideoLogModelService,
  ) {}
  //    秒 分 时 日 月 周
  @Cron('0 0 0 * * *', { timeZone: 'Asia/Shanghai' })
  async video() {
    this.logger.log(`开始任务`);
    const origin = await this.videoOriginModelService.findActive() as TvVideoOrigin;
    // let url = new URL(`${origin.url}?ac=videolist&pg=1`);
    const hour = dayjs().diff(origin.crawled_at, 'hour')
    let url = new URL(`${origin.url}?ac=videolist&pg=1&&t=0&h=${hour}`);
    let page = parseInt(url.searchParams.get('pg') || '1');
    let count = 1;
    for (let i = page; i <= count; i++) {
      this.logger.log(`${i}/${count}`);
      url.searchParams.set('pg', i.toString());
      try{
        const response = await fetch(url.toString());
        const data: VideoList = await response.json();
        count = data.pagecount;
        for (const item of data.list) {
          this.videoModelService.findByVodId(origin.id, item.vod_id).then((video) => {
            if(video) {
              if (video.time != item.vod_time_add) {
                video.total = item.vod_total;
                video.version = item.vod_version;
                video.state = item.vod_state;
                video.isend = item.vod_isend;
                video.time = item.vod_time_add;
                this.videoModelService.save(video);
              }
            } else {
              this.videoModelService.save({
                vod_id: item.vod_id,
                origin_id: origin.id,
                type_id: item.type_id,
                name: item.vod_name,
                sub: item.vod_sub,
                en: item.vod_en,
                tags: item.vod_class.replace(/[\s]*\/[\s]*/g, ",").replace(/[\s]+/g, ","),
                pic: item.vod_pic,
                actor: item.vod_actor.replace(/[\s]*\/[\s]*/g, ","),
                director: item.vod_director,
                writer: item.vod_writer,
                behind: item.vod_behind,
                blurb: item.vod_blurb,
                remarks: item.vod_remarks,
                pubdate: item.vod_pubdate,
                total: item.vod_total,
                area: item.vod_area.replace(/[\s]*\/[\s]*/g, ",").replace(/[\s]+/g, ","),
                lang: item.vod_lang,
                year: item.vod_year,
                author: item.vod_author,
                level: item.vod_level,
                duration: parseInt(item.vod_duration).toString(),
                douban_id: item.vod_douban_id,
                douban_score: parseInt(item.vod_douban_score) || 0,
                content: item.vod_content,
                urls: item.vod_play_url,
                version: item.vod_version,
                state: item.vod_state,
                isend: item.vod_isend,
                time: item.vod_time_add,
              });
            }
          })
        }
      } catch(error) {
        this.videoLogModelService.save({
          origin_id: origin.id,
          url: url.toString(),
          error: error.toString(),
        });
      }
    }
    await this.videoOriginModelService.crawled();
    this.logger.log('完成更新');
    return '更新完成';
  }
}
