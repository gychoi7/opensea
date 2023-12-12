import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 사용하도록 설정
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
