import {Injectable} from '@nestjs/common';

@Injectable()
export default class AppService {

  constructor() {}

  index() {
    return "welcome";
  }
}
