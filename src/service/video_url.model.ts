import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import VideoUrl from "../entity/video_url";

@Injectable()
export default class TvVideoUrlModelService {
  constructor(@InjectRepository(VideoUrl) private videoUrlModel: Repository<VideoUrl>) {}
  async entry(data: DeepPartial<VideoUrl>) {
    return this.videoUrlModel.create(data);
  }

  async findAll() {
    return this.videoUrlModel.find();
  }
  findByOriginNameAndVideoId(origin_name: string, video_id: number) {
    return this.videoUrlModel.findOneBy({origin_name, video_id});
  }
  async save(url: DeepPartial<VideoUrl>) {
    return this.videoUrlModel.save(url);
  }
  async insert(urls: DeepPartial<VideoUrl[] | VideoUrl>) {
    return this.videoUrlModel.insert(urls);
  }
}
