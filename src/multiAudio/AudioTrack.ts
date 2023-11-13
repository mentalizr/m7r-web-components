export class AudioTrack {
  public readonly title: string;
  public readonly artist: string;
  public readonly album: string;
  public readonly source: string;
  public readonly duration: number;

  constructor(title: string, artist: string, album: string, source: string, duration: number) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.source = source;
    this.duration = duration;
  }
}
