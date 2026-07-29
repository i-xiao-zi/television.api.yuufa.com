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

@Entity("tv_schedules")
export default class TvSchedule {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  channel_id: number;

  @ApiProperty()
  @Column()
  begin_at: number;

  @ApiProperty()
  @Column()
  end_at: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  url: string;

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