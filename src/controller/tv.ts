import {Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import Json from '../decorator/json';
import Public from "../decorator/public";
import "multer";
import {ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import crypto from 'crypto';
import TvService from 'src/service/tv';

@ApiTags("APP")
@Controller('tv')
export default class TvController {
  constructor(private readonly tvService: TvService) {}

  @Json(false)
  @Get()
  @Public()
  async index() {
    let i = Math.floor((new Date()).getTime() / 1000);
    const sign = crypto.createHash('sha256').update("6ca114a836ac7d73" + i).digest('hex')
    const response = await fetch(`https://pubmod.hntv.tv/program/getAuth/vod/originStream/program/145/1772985600`, {
      method: "GET",
      headers: {
        'Sign': sign,
        'Timestamp': i.toString()
      }
    })
    // 93658ad79900c9aea0a263fd7bb68e9797996a2b037076a039c0fb264ac76e46
    // bec5fa136510a6f0c71de526087fa44d6af7d9959abb19263b92e4d978cc5fb9
    // 7fff0df1b147b5ae0c9272c9d030ba3ca6fd3569
    console.log(i)
    console.log({
      'Sign': sign,
        'Timestamp': i.toString()
    })
    return response.json();
  }
  @Json(false)
  @Get('henan')
  @Public()
  async henan() {
    return this.tvService.henan();
  }
  @Json(false)
  @Get('dianshi')
  @Public()
  async dianshi() {
    return this.tvService.dianshi();
  }
  @Get('video')
  @Public()
  async video() {
    return this.tvService.video();
  }

  @Get('video/origin')
  @Public()
  async videoOrigin() {
    return this.tvService.videoOrigin();
  }

}
