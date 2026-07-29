import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {Request} from "express";

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  // constructor(private authService: AuthService) {
  //   super();
  // }

  async validate(username: string, password: string): Promise<any> {
    console.log('-----------------')
    throw new UnauthorizedException('unauthorized');
  }

  authenticate(req: Request, options) {
    console.log(options, req.header('User-Agent'))
    this.success(null, null)
  }
}