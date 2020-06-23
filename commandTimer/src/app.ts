import { RenderText , str2sec , sec2text , Symbols } from "./utils";
import { argv } from "process";

let [,,t] = argv, totSec = str2sec(t);
let symbols = new Symbols();

console.log("\n\x1b[s"); // \x1b[s    记录光标当前位置


refresh();

let timer = setInterval(refresh, 1000);

function refresh() : void {
  // \x1b[u    恢复光标位置
  console.log(`\x1b[u${RenderText(sec2text(totSec), symbols)}\n`);
  totSec === 0 && clearInterval(timer);
  totSec--;
}