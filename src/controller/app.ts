import {Controller, Get} from '@nestjs/common';
import Public from "../decorator/public";
import "multer";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("APP")
@Controller()
export default class AppController {
  constructor() {}

  @Public()
  @Get()
  index() {
    return "welcome";
  }
}
