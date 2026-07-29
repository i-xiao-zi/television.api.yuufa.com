import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../entity/user';
import {DeepPartial, Repository} from 'typeorm';

@Injectable()
export default class UserModelService {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}
  find(id: number) {
    return this.userModel.findOneBy({id});
  }
  findByToken(token: string) {
    return this.userModel.findOneBy({password: token})
  }
  findByName(name: string) {
    return this.userModel.findOneBy({name})
  }
  all() {
    return this.userModel.find();
  }
  update(id: number, data: DeepPartial<User>){
    return this.userModel.update({id}, data)
  }
  create(data: DeepPartial<User>) {
    return this.userModel.save(data)
  }
}
