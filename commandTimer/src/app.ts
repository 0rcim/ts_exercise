import { RenderText , str2sec , sec2text } from "./utils";
import { argv } from "process";

let [,,t] = argv, totSec = str2sec(t);

console.log("\x1b[2J"); // 清屏


refresh();

let timer = setInterval(refresh, 1000);

function refresh() : void {
  // \x1b[6A    光标向上移6行
  // \x1b[100D  光标移至行开头
  // \x1b[K     清除行
  // \x1b[6B    光标下移6行
  console.log(`\x1b[6A${RenderText(sec2text(totSec))}\x1b[5A\x1b[100D\x1b[K\x1b[6B`)
  totSec === 0 && clearInterval(timer);
  totSec--;
}