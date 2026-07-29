import {Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import AppService from '../service/app';
import Json from '../decorator/json';
import Public from "../decorator/public";
import "multer";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("APP")
@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  task(@UploadedFile() file: Express.Multer.File) {
    return this.appService.upload(file);
  }
}
