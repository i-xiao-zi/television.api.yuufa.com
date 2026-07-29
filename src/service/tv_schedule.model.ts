import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import TvSchedule from '../entity/tv_schedule';

@Injectable()
export default class TvScheduleModelService {
  constructor(@InjectRepository(TvSchedule) private tvScheduleModel: Repository<TvSchedule>) {}
}
