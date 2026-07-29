import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import VideoOrigin from '../entity/video_origin';

@Injectable()
export default class VideoOriginModelService {
  constructor(@InjectRepository(VideoOrigin) private videoOriginModel: Repository<VideoOrigin>) {}

  findAll() {
    return this.videoOriginModel.find();
  }
  findById(id: number) {
    return this.videoOriginModel.findOneBy({id});
  }
  findActive() {
    return this.videoOriginModel.findOneBy({active: 1});
  }
  findByName(name: string) {
    return this.videoOriginModel.findOne({where: {name}});
  }
  crawled(){
    return this.videoOriginModel.update({active: 1}, {crawled_at: new Date()});
  }
}
