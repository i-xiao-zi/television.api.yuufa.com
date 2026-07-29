import {Injectable, NotFoundException} from '@nestjs/common';
import {hash} from "typeorm/util/StringUtils";
import {ConfigService} from "@nestjs/config";
import path from "path";
import UserModelService from "./user.model";

@Injectable()
export default class AppService {
  private readonly token: string;
  private readonly repo: string;
  private readonly owner: string;

  constructor(private readonly configService: ConfigService, private readonly userModelService: UserModelService) {
    this.token = this.configService.get('GITHUB_TOKEN') as string;
    this.repo = this.configService.get('GITHUB_REPO') as string;
    this.owner = this.configService.get('GITHUB_OWNER') as string;
  }
  async getIndex() {
    return this.userModelService.all();
  }

  async upload(file: Express.Multer.File) {
    const dir = file.mimetype.split('/')[0]
    const filename = `${dir}s/${hash(file.buffer.toString())}${path.extname(file.originalname)}`
    console.log(filename)
    const {sha} = await this.get(filename)
    const result = await this.put(filename, file.buffer, sha)
    if (!result) {
      throw NotFoundException;
    }
    return filename;
  }

  /**
   * 向github添加文件
   * @param path
   * @param content
   * @param sha
   * @private
   */
  private async put(path, content: Buffer, sha: string | undefined = undefined) {
    const data = {
      message: "a new commit message",
      committer: {
        "name": "Monalisa Octocat",
        "email": "octocat@github.com"
      },
      content: content.toString("base64"),
      sha: sha
    }
    const response = await fetch(this.url(path), {
      method: "PUT",
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${this.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify(data)
    });
    return response.status == 200;
  }

  /**
   * 从github获取文件内容
   * @param path
   * @private
   */
  private async get(path: string) {
    const response = await fetch(this.url(path), {
      method: "GET",
      headers: {
        Accept: 'application/vnd.github.object',
        Authorization: `Bearer ${this.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (response.status == 200) {
      const data = await response.json()
      return {
        path: data.path,
        sha: data.sha,
        content: Buffer.from(data.content),
      }
    }
    return {
      path,
      sha: undefined,
      content: undefined,
    }
  }
  private url(path) {
    return `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
  }
}
