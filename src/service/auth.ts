import {Injectable, NotFoundException} from '@nestjs/common';
import UserModelService from "./user.model";
import bcrypt from "bcrypt";
import {Login, Register} from "../validator/auth";

@Injectable()
export default class AuthService {
  constructor(private readonly userModelService: UserModelService) {}

  register(data: Register) {
    return this.userModelService.create({
      ...data,
      password: bcrypt.hashSync(data.password, 16)
    })
  }
  async login(data: Login) {
    const user = await this.userModelService.findByName(data.name);
    if (!user) {
      throw new NotFoundException()
    }
    const compare = await bcrypt.compare(data.password, user.password)
    if (!compare) {
      throw new NotFoundException()
    }
    const token = bcrypt.genSaltSync(10);
    await this.userModelService.update(user.id, {token});
    return {
      id: user.id,
      name: user.name,
      token: token
    };
  }
  verifyToken(token: string) {
    return this.userModelService.findByToken(token)
  }
}
