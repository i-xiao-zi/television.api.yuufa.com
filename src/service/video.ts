import { Injectable } from '@nestjs/common';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './supabase';

@Injectable()
export default class VideoService {

  constructor(
    @InjectSupabaseClient() private readonly supabase: SupabaseClient<Database>,
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
  }
  
  async origin_list() {
    const data = await this.supabase.from('origins').select('*');
    return data;
  }
  async origin_active() {
    const data = await this.supabase.from('origins').select('*').eq('active', true).single();
    return data.data;
  }
  async video_detail(video_id: number) {
    const data = await this.supabase.from('videos').select('*').eq('id', video_id).single();
    return data.data;
  }
}
