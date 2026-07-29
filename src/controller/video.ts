import {Controller, Get, Param, Query, Sse} from '@nestjs/common';
import Json from '../decorator/json';
import Public from "../decorator/public";
import "multer";
import {ApiTags} from "@nestjs/swagger";
import VideoService from '../service/video';
import { map } from 'rxjs';

@ApiTags("Video")
@Controller('video')
export default class VideoController {
  constructor(private readonly videoService: VideoService) {}
  
  @Get()
  @Public()
  search(@Query('video_name') video_name?: string, @Query('page') page: number = 1, @Query('size') size: number = 20) {
    return this.videoService.search(video_name, page, size);
  }

  @Get('origin')
  @Public()
  origin_list() {
    return this.videoService.origin_list();
  }
  @Get('origin/active')
  @Public()
  origin_active() {
    return this.videoService.origin_active();
  }

  @Get('origin/:origin_id')
  @Public()
  origin_detail(@Param("origin_id") origin_id: number) {
    return this.videoService.origin_detail(origin_id);
  }

  @Get("video/:id")
  @Public()
  video_detail(@Param("id") id: number) {
    return this.videoService.video_detail(id);
  }

  @Sse('task')
  @Public()
  task() {
    return this.videoService.task(1);
  }

  @Sse('fetch/:origin_id')
  @Public()
  fetch(@Param("origin_id") origin_id: number) {
    console.log(origin_id);
    return this.videoService.fetch(origin_id);
  }
}
