import {Controller, Get, Post} from '@nestjs/common';
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

  @Get("/account")
  async getAccount(): Promise<any> {
    console.log(process.env.OPENSEA_API_KEY)
    const options = {
      method: 'GET',
      url: 'https://api.opensea.io/api/v2/accounts/0xeE0E7938949573bfC2B21A5E4b7dc10494607a4c',
      headers: {accept: 'application/json', 'x-api-key': this.configService.get<string>('OPENSEA_API_KEY')}
    };
    const res = await axios.request(options);
    const data = await res.data;
    return data;
  }
}
