import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import VideoOriginModelService from './video_origin.model';
import VideoModelService from './video.model';
import { Observable, Subject } from 'rxjs';
import {VideoList} from "./tv.types";
import VideoLogModelService from './video_log.model';

@Injectable()
export default class VideoService {

  constructor(
    @InjectSupabaseClient() private readonly supabase: SupabaseClient,
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
  list(origin_id: number, page: number, size: number) {
    return instanceToPlain(this.videoModelService.pagedByOriginId(origin_id, page, size));
  }
  video_detail(video_id: number) {
    return instanceToPlain(this.videoModelService.findById(video_id));
  }
}
