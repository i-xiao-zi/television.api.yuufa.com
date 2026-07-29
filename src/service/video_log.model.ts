import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import VideoLog from '../entity/video_log';

@Injectable()
export default class VideoLogModelService {
  constructor(@InjectRepository(VideoLog) private videoLogModel: Repository<VideoLog>) {}
  entry(data: DeepPartial<VideoLog>) {
    return this.videoLogModel.create(data);
  }

  findError() {
    return this.videoLogModel.find();
  }

  deleteUrl(url) {
    return this.videoLogModel.softDelete({url});
  }
  findByOriginId(origin_id: number) {
    return this.videoLogModel.findOneBy({origin_id});
  }
  async save(data: DeepPartial<VideoLog>) {
    return this.videoLogModel.save(data);
  }
  async insert(data: DeepPartial<VideoLog[] | VideoLog>) {
    return this.videoLogModel.insert(data);
  }
}
