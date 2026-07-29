import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import TvChannel from '../entity/tv_channel';

@Injectable()
export default class TvChannelModelService {
  constructor(@InjectRepository(TvChannel) private tvChannelModel: Repository<TvChannel>) {}
  
  create(data: DeepPartial<TvChannel>) {
    return this.tvChannelModel.save(data)
  }
}
