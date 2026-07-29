import {Injectable} from '@nestjs/common';
import * as cheerio from "cheerio";
import YouNongPaiModelService from "./you_nong_pai.model";
import {instanceToPlain} from "class-transformer";
import dayjs from "dayjs";
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
import crypto from 'node:crypto';
import TvChannelModelService from './tv_channel.model';
import {it} from "node:test";
// dayjs.extend(utc);
// dayjs.extend(timezone);

@Injectable()
export default class KekeTvTvService {
  private readonly base_url = "https://www.keke2.app";
  private readonly cookie = "cdndefend_js_cookie=5AFCD14C08A2AABEC7BD1E9C27596F91DB05C33D82727";
  private readonly ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36";
  constructor(private readonly tvChannelModelService: TvChannelModelService) {}
  // //https://cmsres.dianzhenkeji.com/anonymous/2022/11/1/XRTVCgCFAA_700_700.png
  async dianshi() {
    const url = `${this.base_url}/channel/1.html`;
    console.log(url);
    const response = await fetch(url, {
      headers: {
        "User-Agent": this.ua,
        "Cookie": this.cookie,
      }
    });
    console.log(response.status);
    if (response.ok) {
      const $ = cheerio.load(await response.text());
      const sections = $('.main').children('.section-box');
      sections.each((index, section) => {
        const title = $(section).find('.section-header-title');
        console.log(title.text())
        const items = $(section).find('.module-box-inner').children('.module-item');
        console.log(items.length)
        items.each((index, item) => {
          console.log($(item).find('.v-item-title').text())

        })
      })
    }
  }
  async dianying() {
    const url = `${this.base_url}/channel/1.html`;
  }
}
