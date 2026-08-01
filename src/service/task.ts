import {Injectable, Logger} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Database } from './supabase';
import {VideoList} from "./tv.types";
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export default class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(@InjectSupabaseClient() private readonly supabase: SupabaseClient<Database>) {}
  
  //    秒 分 时 日 月 周
  @Cron('0 0 0 * * *', { timeZone: 'Asia/Shanghai' })
  async video() {
    this.logger.log('========================');
    this.logger.log(`开始任务`);
    // const data = await this.supabase.from('video_origins').select('*').eq('active', true).single();
    const data = await this.supabase.from('video_origins').select('*').in('id', [1,2,3]);
    for (const origin of data.data??[]) {
      this.logger.log(origin.title);
      const hour = dayjs().diff(origin.crawled_at, 'hour');
      if (hour <  10) {
        continue;
      }
      let url = new URL(`${origin?.url}?ac=videolist&pg=1&t=0&h=${hour}`);
      // let url = new URL(`${origin?.url}?ac=videolist&pg=1&&t=0`);
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
            this.supabase.from(`videos_${origin.id}` as 'videos').select('id, time').order('time').eq('vod_id', item.vod_id).then(async (data) => {
              const videos = data.data;
              const video = videos ? videos[videos.length - 1] : null;
              if (videos && videos.length > 1) {
                const ids = videos.map(v => v.id);
                ids.pop()
                await this.supabase.from(`videos_${origin.id}` as 'videos').delete().in('id', ids);
              }
              if(video) {
                if (video.time != item.vod_time_add) {
                  await this.supabase.from(`videos_${origin.id}` as 'videos').update({
                    total: item.vod_total,
                    version: item.vod_version,
                    state: item.vod_state,
                    isend: item.vod_isend,
                    time: item.vod_time_add,
                    updated_at: dayjs().utc().format(),
                  }).eq('id', video.id);
                }
              } else {
                await this.supabase.from(`videos_${origin.id}` as  'videos').insert({
                  vod_id: item.vod_id,
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
          await this.supabase.from('video_errors').insert({
            origin_id: origin.id,
            url: url.toString(),
            error: error.toString(),
            created_at: dayjs().utc().format(),
          });
        }
      }
      await this.supabase.from('video_origins').update({crawled_at: dayjs().format()}).eq('id', origin.id);
      this.logger.log('完成更新');
    }

    return '更新完成';
  }
}
