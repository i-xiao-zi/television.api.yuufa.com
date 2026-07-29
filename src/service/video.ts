import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import VideoOriginModelService from './video_origin.model';
import VideoModelService from './video.model';
import { Observable, Subject } from 'rxjs';
import {VideoList} from "./tv.types";
import VideoLogModelService from './video_log.model';

@Injectable()
export default class VideoService {

  constructor(
    private readonly videoOriginModelService: VideoOriginModelService,
    private readonly videoModelService: VideoModelService,
    private readonly videoLogModelService: VideoLogModelService,
  ) {}

  async search(video_name?: string, page?: number, size?: number) {
    const origin = await this.videoOriginModelService.findActive();
    return instanceToPlain(this.videoModelService.search(video_name, origin?.id, page, size));
  }
  
  origin_list() {
    return instanceToPlain(this.videoOriginModelService.findAll());
  }
  origin_active() {
    return instanceToPlain(this.videoOriginModelService.findActive());
  }
  origin_detail(origin_id: number) {
    return instanceToPlain(this.videoOriginModelService.findById(origin_id));
  }
  list(origin_id: number, page: number, size: number) {
    return instanceToPlain(this.videoModelService.pagedByOriginId(origin_id, page, size));
  }
  video_detail(video_id: number) {
    return instanceToPlain(this.videoModelService.findById(video_id));
  }
  task(id: number) {
    return instanceToPlain('');
  }
  fetch(origin_id: number): Observable<{ data: any }> {
    const subject = new Subject<{ data: any }>();
    this.fetchVideo(subject, origin_id);
    return subject.asObservable();
  }
  private async fetchVideo(subject: Subject<{ data: any }>, origin_id: number) {
    const origin = await this.videoOriginModelService.findById(origin_id);
    subject.next({
      data: { 
        origin_id: origin_id,
        message: `开始获取视频: ${origin?.name}`,
        timestamp: new Date().toISOString()
      }
    });
    if(origin) {
      let url = new URL(`${origin.url}?ac=videolist&pg=1`);
      let page = parseInt(url.searchParams.get('pg') || '1');
      let count = 1;
      for (let i = page; i <= count; i++) {
        console.log(`${i}/${count}`);
        subject.next({
          data: {
            origin_id: origin_id,
            message: `获取视频: ${i}/${count}`,
            timestamp: new Date().toISOString()
          }
        });
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
                  class: item.type_name || '',
                  name: item.vod_name,
                  sub: item.vod_sub,
                  en: item.vod_en,
                  status: item.vod_status,
                  tags: item.vod_class,
                  pic: item.vod_pic,
                  actor: item.vod_actor.split(',').slice(0, 5).join(','),
                  director: item.vod_director,
                  writer: item.vod_writer,
                  behind: item.vod_behind,
                  blurb: item.vod_blurb,
                  remarks: item.vod_remarks,
                  pubdate: item.vod_pubdate,
                  total: item.vod_total,
                  area: item.vod_area,
                  lang: item.vod_lang,
                  year: item.vod_year,
                  author: item.vod_author,
                  level: item.vod_level,
                  duration: item.vod_duration,
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
              subject.next({
                data: {
                  origin_id: origin_id,
                  message: `获取视频: ${item.vod_name} ${item.vod_id} ${item.vod_time_add}`,
                  timestamp: new Date().toISOString()
                }
              });
            })
          }
        } catch(error) {
          subject.next({
            data: {
              origin_id: origin_id,
              message: `获取视频: ${i}/${count} 失败: ${error.toString()}`,
              timestamp: new Date().toISOString()
            }
          })
          this.videoLogModelService.save({
            origin_id: origin.id,
            url: url.toString(),
            error: error.toString(),
          });
        }
      }
    }
    subject.complete();
   }
}
