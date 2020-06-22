import { LyricToken } from "../libs/lrc";

export class LYRIC {
  tokens:LyricToken[] = [];
  
  parseLrc(src:string) : LyricToken[] {
    let source : string = /\[(\d+):(\d+)(.\d+)\]([\s\S]*?)$/.source;
    let p1 : RegExp = new RegExp(source, "mg");
    let p2 : RegExp = new RegExp(source);
    return src.match(p1).map(item => {
      let mth : any = item.match(p2);
      return ({
        start: mth[1]*60*1000+mth[2]*1000+mth[3]*1000,
        words: mth[4]
      })
    })
  }

  preLoadingItems(num) : LyricToken[] {
    let introTime : number = this.tokens[0].start;
    if (introTime < 300) return [];
    let items : LyricToken[] = [];
    for (let i=0; i<num; i++) items[i] = {start: introTime/(num)*i, words: `\x1b[100D\x1b[0K[Ready]${new Array(num).fill("○").fill("●", 0, i+1).join("")}`};
    return items;
  }

  play() : void {
    this.tokens.concat(this.preLoadingItems(15)).forEach((item, index) => {
      let timer = setTimeout(() => {
        // \x1b[100D 光标移动至行开头
        // \x1b[0K   清除行
        process.stdout.write(`\x1b[100D\x1b[0K[${index+1}/${this.tokens.length}] ${item.words}`);
        clearTimeout(timer);
      }, item.start)
    });
  }

  constructor(lyric:string) {
    this.tokens = this.parseLrc(lyric);
  }
}