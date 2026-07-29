import {Controller, Request, Get, Post, UseGuards, Body} from '@nestjs/common';
import AppService from '../service/app';
import Public from "../decorator/public";
import AuthService from "../service/auth";
import {Login, Register} from "../validator/auth";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import TaskService from 'src/service/task';

@ApiTags("任务")
@Controller('task')
export default class TaskController {
  constructor(private readonly authService: AuthService, private readonly taskService: TaskService) {}

  @ApiOperation({
    summary: "视频",
    description: '定期更新视频'
  })
  @Public()
  @Get('video')
  video() {
    return this.taskService.video();
  }
}
