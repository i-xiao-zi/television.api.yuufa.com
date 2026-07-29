import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // 自动删除非 DTO 中的属性
      forbidNonWhitelisted: false, // 如果有非白名单属性，抛出错误
      transform: true,        // 自动类型转换
      transformOptions: {
        enableImplicitConversion: true, // 启用隐式转换
      },
    }),
  );
  // if (process.env.NODE_ENV !== 'production') {
  if (true) {
    const config = new DocumentBuilder()
      .setTitle('API 文档')
      // .setDescription('The cats API description')
      // .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
  }

  // await app.init();
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap().then();
