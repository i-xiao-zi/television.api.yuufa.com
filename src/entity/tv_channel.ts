import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import {Exclude} from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

@Entity("tv_channels")
export default class TvChannel {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  group_id: number;

  @ApiProperty()
  @Column()
  cid: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column()
  headers: string;

  @ApiProperty()
  @Column()
  cover: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  time: string;

  @ApiProperty()
  @Column()
  live: string;

  @ApiProperty()
  @Column()
  sort: number;

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