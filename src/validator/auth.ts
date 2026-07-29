import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class Login {
  @ApiProperty({
    description: '姓名',
    example: '张三',
    required:true,
  })
  @IsString()
  @Length(2, 50, { message: '用户名长度必须在2-50个字符之间' })
  name: string;

  @ApiProperty({
    description: '密码',
    example: '12345678',
    required:true,
  })
  @IsString()
  @Length(8, 32, {message: '密码长度必须在8-32个字符之间'})
  password: string;
}
export class Register {
  @ApiProperty({
    description: '姓名',
    example: '张三',
    required:true,
  })
  @IsString()
  @Length(2, 50, { message: '用户名长度必须在2-50个字符之间' })
  name: string;

  @ApiProperty({
    description: '密码',
    example: '12345678',
    required:true,
  })
  @IsString()
  @Length(8, 32, {message: '密码长度必须在8-32个字符之间'})
  password: string;
}