import { SetMetadata } from '@nestjs/common';

export const IS_JSON_KEY = 'is_json';

export default (is_json: boolean = true) => SetMetadata(IS_JSON_KEY, is_json);