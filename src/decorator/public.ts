import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "is_public";
export default (is_public: boolean = true) => SetMetadata(IS_PUBLIC_KEY, is_public);