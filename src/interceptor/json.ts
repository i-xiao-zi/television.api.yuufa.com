import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IS_JSON_KEY } from '../decorator/json';

export interface Json<T> {
    code: number;
    message: string | string[];
    data: T;
}

@Injectable()
export default class JsonInterceptor<T> implements NestInterceptor<T, Json<T>> {
    constructor(private readonly reflector: Reflector) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<Json<T>> {
        return this.reflector.get<boolean|undefined>(IS_JSON_KEY, context.getHandler()) === false
          ? next.handle()
          : next.handle().pipe(map((data) => ({ code: 0, message: 'success', data: data })))
    }
}