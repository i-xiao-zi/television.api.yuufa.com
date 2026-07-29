import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
// import {Strategy} from 'passport-local';
import {Request} from "express";
import AuthService from "../service/auth";

@Injectable()
export default class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<any> {
    const user = await this.authService.verifyToken(token);
    if(!user) {
      throw new UnauthorizedException('unauthorized');
    }
    return user;
  }
}