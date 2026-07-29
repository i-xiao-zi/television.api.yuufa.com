import {Controller, Get, Param, Query, Sse} from '@nestjs/common';
import Json from '../decorator/json';
import Public from "../decorator/public";
import "multer";
import {ApiTags} from "@nestjs/swagger";
import VideoService from '../service/video';
import { map } from 'rxjs';
import TaskService from 'src/service/task';

@ApiTags("Video")
@Controller('video')
export default class VideoController {
  constructor(private readonly videoService: VideoService, private readonly taskService: TaskService) {}
  
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

  @Get(":id")
  @Public()
  video_detail(@Param("id") id: number) {
    return this.videoService.video_detail(id);
  }

  @Get('task')
  @Public()
  task() {
    return this.taskService.video();
  }

}
