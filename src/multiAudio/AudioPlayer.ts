import {AudioTrack} from "./AudioTrack";

export class AudioPlayer {
  private audioElement: HTMLAudioElement;
  private playlist: AudioTrack[];

  //Audioplayer states
  public isPlaying: boolean;
  public isMuted: boolean;
  public isLoop: boolean;
  currentTrackIndex: number;

  constructor() {
    this.audioElement = new Audio();

    //default player settings
    this.audioElement.loop = false;
    this.isPlaying = false;
    this.isMuted = false;
    this.isLoop = false;

    this.playlist = [];
    this.currentTrackIndex = -1;

    this.audioElement.addEventListener('ended', () => {
      this.stop();
    });
  }

  loadPlaylist(playlist: AudioTrack[]) {
    this.playlist = playlist;
    this.currentTrackIndex = -1;
  }

  play() {
    if (this.currentTrackIndex < 0) {
      this.currentTrackIndex = 0;
      this.audioElement.src = this.playlist[0].source;
    }
    this.audioElement.play();
  }

  mute() {
    this.audioElement.muted = true;
  }

  unmute() {
    this.audioElement.muted = false;
  }

  loopOn() {
    this.audioElement.loop = true;
  }

  loopOff() {
    this.audioElement.loop = false;
  }

  pause() {
    this.audioElement.pause();
  }

  stop() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    this.currentTrackIndex = -1;
    this.isPlaying = false;
  }

  rewind() {
    this.audioElement.currentTime = 0;
  }

  skipTo(skipTo: number) {
    this.audioElement.currentTime = skipTo;
  }

  setVolume(volume: number) {
    console.log("Value is " + volume);
    this.audioElement.volume = volume;
  }

  playTrackAtIndex(index: number) {
    if (index < 0 || index >= this.playlist.length) {
      return;
    }
    const ctime = this.audioElement.currentTime;
    this.currentTrackIndex = index;
    this.audioElement.src = this.playlist[index].source;
    this.audioElement.currentTime = ctime;
  }

  getCurrentTimeInSec(): number {
    return this.audioElement.currentTime;
  }

  getCurrentTimeInMin(): string {
    const minutes = Math.floor(this.getCurrentTimeInSec() / 60);
    const seconds = Math.round(this.audioElement.currentTime % 60);
    if(seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  getRemainingTimeInMin(): string {
    if(this.getCurrentTrack()?.duration != null) {
      // @ts-ignore
      const inSec = Math.floor(this.getCurrentTrack()?.duration - this.audioElement.currentTime);

      const minutes = Math.floor(inSec / 60);
      const seconds = Math.round(inSec % 60);
      if(seconds < 10) {
        return `${minutes}:0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    }
    return "0:00"
  }

  getCurrentTrack(): AudioTrack | null {
    if (this.currentTrackIndex < 0 || this.currentTrackIndex >= this.playlist.length) {
      return null;
    }
    return this.playlist[this.currentTrackIndex];
  }
}
