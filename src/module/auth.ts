import { Module } from '@nestjs/common';
import AuthService from '../service/auth';
import {PassportModule} from "@nestjs/passport";
import LocalStrategy from "../guard/local.strategy";
import {APP_GUARD} from "@nestjs/core";
import LocalAuthGuard from "../guard/local.auth";
import BearerStrategy from "../guard/bearer.strategy";
import BearerAuthGuard from "../guard/bearer.auth";
import UserModelService from "../service/user.model";
import MysqlModule from "./mysql";

@Module({
  imports: [PassportModule, MysqlModule],
  providers: [
    AuthService,
    // LocalStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: LocalAuthGuard
    // },
    BearerStrategy,
    {
      provide: APP_GUARD,
      useClass: BearerAuthGuard
    }
  ],
  exports: [],
})
/**
 * 认证
 */
export default class AuthModule {}
