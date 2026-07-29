import {Injectable} from '@nestjs/common';
import {instanceToPlain} from "class-transformer";
import dayjs from "dayjs";
import crypto from 'node:crypto';
import TvChannelModelService from './tv_channel.model';
import KekeTvTvService from "./keke.tv";
import VideoOriginModelService from './video_origin.model';
import {VideoList, VideoDetail} from './tv.types';
import VideoModelService from './video.model';
import Video from '../entity/video';
import { DeepPartial } from 'typeorm';
import VideoUrlModelService from "./video_url.model";

@Injectable()
export default class TvService {

  constructor(
    private readonly tvChannelModelService: TvChannelModelService, 
    private readonly kekeTvService: KekeTvTvService, 
    private readonly videoOriginModelService: VideoOriginModelService,
    private readonly videoModelService: VideoModelService,
    private readonly videoUrlModelService: VideoUrlModelService,
  ) {}
  // //https://cmsres.dianzhenkeji.com/anonymous/2022/11/1/XRTVCgCFAA_700_700.png
  async henan() {
    let timestamp = dayjs().unix().toString();
    const sign = crypto.createHash('sha256').update(`6ca114a836ac7d73${timestamp}`).digest('hex')
    const response = await fetch(`https://pubmod.hntv.tv/program/getAuth/live/class/program/11/`, {
      headers: { sign, timestamp }
    })
    const channels = await response.json();
    // return channels;
    for (const channel of channels) {
      let start = dayjs(dayjs().format('YYYY-MM-DD')).unix().toString();
      const response = await fetch(`https://pubmod.hntv.tv/program/getAuth/vod/originStream/program/${channel.cid}/${start}`, {
        headers: { sign, timestamp }
      });
      const data = await response.json();
      channel.data = data;
    }
    return channels;
  }
  async dianshi() {
    return this.kekeTvService.dianshi();
  }
  async video() {
    const origins = await this.videoOriginModelService.findAll();
    for (const origin of origins) {
      let count = 1;
      for (let i = 0; i < count; i++) {
        const response = await fetch(`${origin.url}?ac=videolist&t=1&pg=${i+1}`)
        const data: VideoList = await response.json();
        count = data.pagecount;
        for (const item of data.list) {
          let video = await this.videoModelService.findByName(item.vod_name) || await this.videoModelService.save({
            class: item.type_name,
            name: item.vod_name,
            sub: item.vod_sub,
            en: item.vod_en,
            status: item.vod_status,
            tags: item.vod_class,
            pic: item.vod_pic,
            actor: item.vod_actor,
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
            douban_score: parseInt(item.vod_douban_score),
            content: item.vod_content,
          });
          let video_url = await this.videoUrlModelService.findByOriginNameAndVideoId(origin.name, video.id)
          if (video_url) {
            video_url.urls = item.vod_play_url;
          } else {
            video_url = await this.videoUrlModelService.entry({
              video_id: video.id,
              vod_id: item.vod_id,
              urls: item.vod_play_url,
              origin_name: origin.name,
            });
          }
          await this.videoUrlModelService.save(video_url);
        }
      }
    }
    return this.videoOriginModelService.findAll();
  }
  videoOrigin() {
    return instanceToPlain(this.videoOriginModelService.findAll());
  }
 }
