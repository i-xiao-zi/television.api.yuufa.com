import {Injectable, Logger} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { Database } from './supabase';
import {VideoList} from "./tv.types";

@Injectable()
export default class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(@InjectSupabaseClient() private readonly supabase: SupabaseClient<Database>) {}
  
  //    秒 分 时 日 月 周
  @Cron('0 0 0 * * *', { timeZone: 'Asia/Shanghai' })
  async video() {
    this.logger.log(`开始任务`);
    const data = await this.supabase.from('origins').select('*').eq('active', true).single();
    const origin = data.data!;
    const hour = dayjs().diff(origin?.crawled_at, 'hour');
    let url = new URL(`${origin?.url}?ac=videolist&pg=1&&t=0&h=${hour}`);
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
          this.supabase.from('videos').select('*').eq('origin_id', origin?.id as number).eq('vod_id', item.vod_id).single().then((data) => {
            const video = data.data;
            if(video) {
              if (video.time != item.vod_time_add) {
                video.total = item.vod_total;
                video.version = item.vod_version;
                video.state = item.vod_state;
                video.isend = item.vod_isend;
                video.time = item.vod_time_add;
                this.supabase.from('videos').update(video);
              }
            } else {
              this.supabase.from('videos').insert({
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
                douban_id: item.vod_douban_id,
                douban_score: item.vod_douban_score,
                content: item.vod_content,
                urls: item.vod_play_url,
                version: item.vod_version,
                state: item.vod_state,
                isend: item.vod_isend,
                time: item.vod_time_add,
              });
            }
          });
        }
      } catch(error) {
        this.supabase.from('errors').insert({
          origin_id: origin.id,
          url: url.toString(),
          error: error.toString(),
          created_at: new Date().toUTCString(),
        });
      }
    }
    this.supabase.from('origins').update({crawled_at: new Date().toUTCString()});
    this.logger.log('完成更新');
    return '更新完成';
  }
}
