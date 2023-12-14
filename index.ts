import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { createLanguageModel, createJsonTranslator } from "typechat";
import { SentimentResponse } from "./sentimentSchema";

// TODO: use local .env file.
dotenv.config({ path: path.join(__dirname, ".env") });

const model = createLanguageModel(process.env);
const schema = fs.readFileSync(path.join("./", "sentimentSchema.ts"), "utf8");
const translator = createJsonTranslator<SentimentResponse>(model, schema, "SentimentResponse");


export class Sentiment {
  /** 获取文件内容 */
  public getFile(fileName: string) {
      return fs.readFileSync(fileName).toString().split(/\r?\n/);
  }
  /** 获取接口数据 */
  public async getResponse(str: string) {
      const response = await translator.translate(str);
      if (!response.success) {
          return response.message + " - " + str;
      }
      return `The sentiment is ${response.data.sentiment}`
  }
}



/** test demo */
// async function test() {
//     const sentiment = new Sentiment()
//     const strs = sentiment.getFile("input.txt")
//     for (let i = 0; i < strs.length; i++) {
//         console.log(await sentiment.getResponse(strs[i]))
//     }
// }
// test()