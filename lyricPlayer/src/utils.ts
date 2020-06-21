import { LyricToken } from "../libs/lrc";

export class LYRIC {
  tokens:LyricToken[] = [];
  timers:object[] = [];
  
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

  play() : void {
    process.stdout.write("ready...");
    this.tokens.forEach((item, index) => {
      this.timers[index] = setTimeout(() => {
        // \x1b[100D 光标移动至行开头
        // \x1b[0K   清除行
        process.stdout.write(`\x1b[100D\x1b[0K[${index+1}/${this.tokens.length}] ${item.words}`);
        clearTimeout(index);
      }, item.start)
    });
  }

  constructor(lyric:string) {
    this.tokens = this.parseLrc(lyric);
  }
}