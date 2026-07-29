import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Like, Repository} from 'typeorm';
import Video from '../entity/video';

@Injectable()
export default class VideoModelService {
  constructor(@InjectRepository(Video) private videoModel: Repository<Video>) {}

  async search(video_name?: string, origin_id?: number, page?: number, size?: number) {
    let query = {};
    if (video_name) {
      query['name'] = Like(`%${video_name}%`);
    }
    if (origin_id) {
      query['origin_id'] = origin_id;
    }
    page = page || 1;
    size = size || 20;
    const count = await this.videoModel.countBy(query);
    const data = await this.videoModel.find({
      where: query,
      take: size,
      skip: (page - 1) * size,
    });
    return { data, total: Math.ceil(count / size), count, page, size };
  }
  async findAll() {
    return this.videoModel.find();
  }
  async findById(id: number) {
    return this.videoModel.findOneBy({id});
  }
  async pagedByOriginId(origin_id: number, page: number, size: number) {
    const count = await this.videoModel.countBy({origin_id});
    const data = await this.videoModel.find({
      where: {origin_id},
      take: size,
      skip: (page - 1) * size,
    });
    return { data, total: Math.ceil(count / size), count, page, size };
  }
  findByVodId(origin_id: number, vod_id: number) {
    return this.videoModel.findOneBy({origin_id, vod_id});
  }
  findByName(name: string) {
    return this.videoModel.findOneBy({name});
  }
  async save(video: DeepPartial<Video>) {
    return this.videoModel.save(video);
  }
  async insert(videos: DeepPartial<Video[] | Video>) {
    return this.videoModel.insert(videos);
  }
}
