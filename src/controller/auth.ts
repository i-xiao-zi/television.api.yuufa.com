import {Controller, Request, Get, Post, UseGuards, Body} from '@nestjs/common';
import AppService from '../service/app';
import Public from "../decorator/public";
import AuthService from "../service/auth";
import {Login, Register} from "../validator/auth";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags("认证")
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "登录",
    description: '用户登录'
  })
  @ApiBody({
    type: Login,
    description: '枚举：1：张三，2：李四，3：王五',
    required: false,
    isArray: false,
  })
  @Public()
  @Post('login')
  login(@Body() data: Login) {
    return this.authService.login(data);
  }

  @ApiOperation({
    summary: "注册",
    description: '注册'
  })
  @ApiBody({
    type: Register,
    required: true,
  })
  @Public()
  @Post('register')
    register(@Body() data: Register) {
    return this.authService.register(data);
  }
}
