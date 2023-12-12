import {Controller, Get, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';
import axios from "axios";
import {ConfigService} from "@nestjs/config";


@Controller()
export class AppController {
  private api : string
  constructor(
      private readonly appService: AppService,
      private configService: ConfigService
  ) {
    this.api = process.env.OPENSEA_API_KEY
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(":id")
  //Param에서 address를 받아서 그 값을 options.url에 넣어준다.

  async getAccount(@Param('id') id:string): Promise<any> {
    const options = {
      method: 'GET',
      url: `https://api.opensea.io/api/v2/accounts/${id}`,
      headers: {accept: 'application/json', 'x-api-key': this.configService.get<string>('OPENSEA_API_KEY')}
    };
    const res = await axios.request(options);
    const data = await res.data;
    return data;
  }
}
