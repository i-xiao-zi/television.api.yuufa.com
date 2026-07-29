import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {Exclude} from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

@Entity("video_urls")
export default class TvVideoUrl {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  video_id: number;

  @ApiProperty()
  @Column()
  vod_id: number;

  @ApiProperty()
  @Column()
  urls: string;

  @ApiProperty()
  @Column()
  version: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty()
  @Column()
  isend: number;

  @ApiProperty()
  @Column()
  time: number;

  @ApiProperty()
  @Column()
  origin_name: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}