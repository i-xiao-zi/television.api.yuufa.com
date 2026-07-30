import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import VideoOriginModelService from './video_origin.model';
import VideoModelService from './video.model';
import { Observable, Subject } from 'rxjs';
import {VideoList} from "./tv.types";
import VideoLogModelService from './video_log.model';
import { Database } from './supabase';

@Injectable()
export default class VideoService {

  constructor(
    @InjectSupabaseClient() private readonly supabase: SupabaseClient<Database>,
    private readonly videoOriginModelService: VideoOriginModelService,
    private readonly videoModelService: VideoModelService,
    private readonly videoLogModelService: VideoLogModelService,
  ) {}

  async search(video_name?: string, page: number = 1, size: number = 10) {
    const data = await this.supabase.from('videos').select('*', {count: 'exact'}).range((page-1)*size, page * size-1);
    return {
      data: data.data,
      count: data.count,
      total: Math.ceil((data.count ?? 0) / size),
      size,
      page,
    }
    // const origin = await this.videoOriginModelService.findActive();
    // return instanceToPlain(this.videoModelService.search(video_name, origin?.id, page, size));
  }
  
  async origin_list() {
    const data = await this.supabase.from('origins').select('*');
    return data;
    // return instanceToPlain(this.videoOriginModelService.findAll());
  }
  async origin_active() {
    const data = await this.supabase.from('origins').select('*').eq('active', true).single();
    return data.data;
    // return instanceToPlain(this.videoOriginModelService.findActive());
  }
  list(origin_id: number, page: number, size: number) {
    return instanceToPlain(this.videoModelService.pagedByOriginId(origin_id, page, size));
  }
  async video_detail(video_id: number) {
    const data = await this.supabase.from('videos').select('*').eq('id', video_id).single();
    return data.data;
    // return instanceToPlain(this.videoModelService.findById(video_id));
  }
}
