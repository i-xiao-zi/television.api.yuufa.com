import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, OneToMany, JoinColumn,
} from 'typeorm';
import {Exclude} from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

@Entity("videos")
export default class Video {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  vod_id: number;

  @ApiProperty()
  @Column()
  origin_id: number;

  @ApiProperty()
  @Column()
  class: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  sub: string;

  @ApiProperty()
  @Column()
  en: string;

  @ApiProperty()
  @Column()
  status: number;

  @ApiProperty()
  @Column()
  tags: string;

  @ApiProperty()
  @Column()
  pic: string;

  @ApiProperty()
  @Column()
  actor: string;

  @ApiProperty()
  @Column()
  director: string;

  @ApiProperty()
  @Column()
  writer: string;

  @ApiProperty()
  @Column()
  behind: string;

  @ApiProperty()
  @Column()
  blurb: string;

  @ApiProperty()
  @Column()
  remarks: string;

  @ApiProperty()
  @Column()
  pubdate: string;

  @ApiProperty()
  @Column()
  total: number;

  // @ApiProperty()
  // @Column()
  // serial: string;

  @ApiProperty()
  @Column()
  area: string;

  @ApiProperty()
  @Column()
  lang: string;

  @ApiProperty()
  @Column()
  year: string;

  @ApiProperty()
  @Column()
  author: string;

  @ApiProperty()
  @Column()
  level: number;

  @ApiProperty()
  @Column()
  duration: string;

  @ApiProperty()
  @Column()
  douban_id: number;

  @ApiProperty()
  @Column()
  douban_score: number;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column()
  urls: string

  @ApiProperty()
  @Column()
  version: string

  @ApiProperty()
  @Column()
  state: string

  @ApiProperty()
  @Column()
  isend: number

  @ApiProperty()
  @Column()
  time: number

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