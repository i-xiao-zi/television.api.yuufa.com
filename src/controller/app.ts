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

  @Json(false)
  @Get()
  async getIndex() {
    console.log('getIndex');
    return this.appService.getIndex();
  }

  @ApiOperation({
    summary: "上传文件",
    description: 'wwwwwwwwwwwwwwww'
  })
  @ApiQuery({
    name: 'id',
    description: '用户id',
    required: false,
    example: '123',
    default: '默认',
  })
  @ApiQuery({
    name: 'id2',
    description: '用户id',
    required: false,
    example: '123',
    default: '默认',
  })
  @ApiBody({
    type: "number",
    description: '枚举：1：张三，2：李四，3：王五',
    // 不能和type同时使用
    // schema: {
    //   type: 'object',
    //   properties: {
    //     name: { type: 'string', example: '张三' },
    //     email: { type: 'string', example: 'zhangsan@example.com' },
    //   },
    // },
    required: false,
    isArray: false,
  })
  @ApiResponse({
    status: 200,
    description: '返回成功',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            status: { type: 'number', example: 200 },
            message: { type: 'string', example: '返回成功' },
          },
        },
      },
      'application/text': {
        schema: {
          type: 'string',
          example: '返回成功',
        },
      },
      // 引用 User 未定义的类型(dto) 装饰器
      'application/json-test': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
    // 不能和content同时使用
    // schema: {
    //   type: 'object',
    //   properties: {
    //     status: { type: 'number' },
    //     message: { type: 'string' },
    //   },
    // },
  })
  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.appService.upload(file);
  }
}
