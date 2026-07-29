import { Module } from '@nestjs/common';
import {APP_FILTER, APP_INTERCEPTOR, Reflector} from "@nestjs/core";
import JsonInterceptor from "../interceptor/json";
import HttpExceptionFilter from "../filter/exception";

@Module({
  imports: [
  ],
  providers: [
    Reflector,
    {
      provide: APP_INTERCEPTOR,
      useFactory: (reflector: Reflector) => new JsonInterceptor(reflector),
      inject: [Reflector],
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }],
})
export default class ResponseModule {}