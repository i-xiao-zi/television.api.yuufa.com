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

@Entity("video_origins")
export default class TvVideoOrigin {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  home: string;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column()
  sort: number;

  @ApiProperty()
  @Column()
  active: number;

  @ApiProperty()
  @Column()
 crawled_at: Date;

  @Exclude()
  @Column()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}