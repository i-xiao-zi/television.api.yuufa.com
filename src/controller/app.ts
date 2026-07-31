import {Controller, Get} from '@nestjs/common';
import Public from "../decorator/public";
import "multer";
import {ApiTags} from "@nestjs/swagger";
import AppService from 'src/service/app';

@ApiTags("APP")
@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  index() {
    return this.appService.index();
  }
}
