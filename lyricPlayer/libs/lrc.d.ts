export type LyricToken = {
  start : number;
  end? : number;
  words : string
}

export type LyricObject = {
  readonly title? : string;
  readonly artist? : string;
  readonly link? : string;
  readonly tokens : LyricToken
}

export interface NeteaseLyricFileValidator {
  briefDesc? : string;
  karaokeLyric : string;
  karaokeVersion? : number;
  lyric : string;
  lyricInfoType? : string;
  lyricUserId? : number;
  lyricUserOffset? : number;
  lyricUserTime? : number;
  lyricVersion? : number;
  musicId? : number;
  qfy? : number;
  transUserId? : number;
  transUserName? : string;
  transUserTime? : number;
  translateLyric? : string;
  translateVersion? : number
}