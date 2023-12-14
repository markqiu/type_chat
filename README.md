# type_chat

a python version of TypeChat taking a shortcut. It's in fact a typescript tool. Because you define you python lib interface by yourself and it will try to translate whatever you defined in typescript to python version.

## Installation

```bash
npm install
```

## Usage

### Step one: define your lib interface in typescript
Let's use an example of TypeChat: Sentiment

```typescript
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

```

### Step two: generate your lib interface in python

```bash
npm run build
```

### Step three: pack your python lib
```bash
npm run package
```

### Step four: install and use your lib in python
Look at details in examples directory.
```bash
cd examples
pip install -r requirements.txt --force-reinstall
python chat.py
```
```text
The sentiment is neutral
The sentiment is positive
The sentiment is positive
The sentiment is neutral
```

That's it. Enjoy it.

## License

[MIT](https://choosealicense.com/licenses/mit/)