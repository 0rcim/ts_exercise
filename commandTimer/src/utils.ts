import { Block } from "./numbers";

export class Symbols implements Block {
  self:object = {};
  fill:object = [" ","|"];
  Combination:string[] = ["11111","11110","10001","10000","00001","00100","00000"];
  SYMBOLS:object = {
    "0": "02220",
    "1": "55555",
    "2": "04030",
    "3": "04040",
    "4": "22044",
    "5": "03040",
    "6": "03020",
    "7": "04444",
    "8": "02020",
    "9": "02040",
    ":": "65656",
    "EMPTY": "66666"
  };

  query(n:number|string) : string[] {
    return this.self[typeof n === "undefined" ? "EMPTY" : n];
  }

  constructor() {
    for (let i=0; i<this.Combination.length; i++) this.Combination[i] = this.Combination[i].split("").map(j => this.fill[j]).join("");
    for (let k in this.SYMBOLS) this.self[k] = this.SYMBOLS[k].split("").map(d => this.Combination[d]);
  }
}

export function RenderText(txt:string) : string {
  let symbols = new Symbols();
  let text_arr = txt.split("").map(s => symbols.query(s));
  let lines = [], i=0;
  while(i < 5) {
    let arr = [];
    for (let j=0; j<text_arr.length; j++) arr[arr.length] = text_arr[j][i];
    lines[i] = arr.join("  ");
    i++;
  }
  return lines.join("\n");
}

export function str2sec (str:string) : number {
  let text : string = str.trim() || "0s";
  let mth : any[] = text.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  let [,h=0,m=0,s=0] = mth;
  return h*3600 + m*60 + s*1;
}

export function sec2text (sec:number) : string {
  let _h = Math.floor(sec/3600);
  let mm = ("0"+Math.floor(sec%3600/60)).slice(-2);
  let ss = ("0"+Math.floor(sec%60)).slice(-2);
  return `${_h}:${mm}:${ss}`;
}