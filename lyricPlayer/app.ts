import { NeteaseLyricFileValidator } from "./libs/lrc";
import { readdirSync , readFileSync } from "fs";
import { resolve } from "path";

import { LYRIC } from "./src/utils";

const dataDir:string = resolve(__dirname, "../data/");

let lrc_files : {name: string, content: NeteaseLyricFileValidator}[] = readdirSync(dataDir)
  .filter(name => /^\d+$/.test(name))
  .map(name => ({
    name: name,
    content: JSON.parse(readFileSync(resolve(dataDir, name), {encoding: "utf-8"}))
  })
);

new LYRIC(lrc_files[0].content.lyric).play();