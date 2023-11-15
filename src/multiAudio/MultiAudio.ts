import {AudioPlayer} from "./AudioPlayer";
import {AudioTrack} from "./AudioTrack";
import {MultiAudioView} from "./MultiAudioView";

export class MultiAudio {
  public htmlId: string;
  public player: AudioPlayer;
  public playlist: AudioTrack[];
  public currentTrack: AudioTrack | null;
  public currentTimeInSec: string | undefined;
  public currentTimeInMin: string = "0:00";
  public remainingTimeInMin: string = "0:00";
  public init: boolean;

  constructor(htmlId: string) {
    this.htmlId = htmlId;
    this.player = new AudioPlayer();
    this.playlist = [];
    this.currentTrack = null;
    this.init = true;

    //only for now
    this.loadPlaylist();

    setInterval(() => {
      if(this.player.isPlaying) {
        this.updateProcedure(true);
      }
    }, 5, this.player.isPlaying);
  }

  //loads the Playlist the Player will play through.
  loadPlaylist() {
    this.playlist = [
      new AudioTrack('birds', 'Fabian', 'MAD VILLANY', '.././media/whisper_birds.mp3', 660),
      new AudioTrack('ocean', 'Fabian', 'MAD VILLANY', '.././media/whisper_ocean.mp3', 660),
      new AudioTrack('rain', 'Fabian', 'MAD VILLANY', '.././media/whisper_rain.mp3', 660)]
    this.player.loadPlaylist(this.playlist);
  }

  public getHtmlId(): string {
    return this.htmlId;
  }

  //Single function that can be called to switch the state of the currently playing Audioplayer
  playAndPause(): void {
    if(this.player.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    MultiAudioView.adjustPlayPauseButton(this);
  }

  //start playing the currently selected Track
  play() {
    this.player.play();
    this.init = false;
    this.player.isPlaying = true;
    this.currentTrack = this.player.getCurrentTrack();
  }

  //stop playing the currently selected Track
  pause() {
    this.player.pause();
    this.player.isPlaying = false;
  }

  public isPlaying(): boolean {
    return this.player.isPlaying;
  }

  //start the Track from the beginning
  rewind() {
    this.player.rewind();
  }

  //set the time from which the player should continue playing
  seekTo() {
    const element = document.getElementById("progressBar") as HTMLInputElement;
    const seekTo = parseFloat(element.value);
    this.player.skipTo(seekTo);
  }

  //skip to a certain song inside the playlist
  skipSong(track: AudioTrack) {
    const trackIndex = this.playlist.indexOf(track, 0);
    this.player.pause();
    this.player.playTrackAtIndex(trackIndex)

    if(!this.init) {
      this.play()
    }
  }

  //sets the volume of the player between 0-100
  setVolume() {
    const element = document.getElementById("volume-slider") as HTMLInputElement;
    const  volume = parseFloat(element.value)
    this.player.setVolume(volume/100);
  }

  //mutes the Audio output
  muteAndUnmute() {
    if(this.player.isMuted) {
      this.player.unmute();
      this.player.isMuted = false;
    } else {
      this.player.mute();
      this.player.isMuted=true;
    }
    MultiAudioView.toggleMuteButton(this);
  }

  public isMuted(): boolean {
    return this.player.isMuted;
  }

  //lets the currently selected Track to be looped after play though
  loopOnAndOff() {
    if(this.player.isLoop) {
      this.player.loopOff();
      this.player.isLoop = false;
    } else {
      this.player.loopOn();
      this.player.isLoop = true;
    }
    MultiAudioView.toggleLoopButton(this);
  }

  public isLoop(): boolean {
    return this.player.isLoop;
  }

  //updates all values inside this class that are shown on the overlay.
  //Values are taken out of the Subclass AudioPlayer.ts
  private updateProcedure(debug: boolean){
    this.currentTrack = this.player.getCurrentTrack()

    //update PercentageValue and the Slider
    this.currentTimeInSec = this.player.getCurrentTimeInSec().toString();
    this.updateProgressbarValue();

    //update TimeStampValue
    this.currentTimeInMin = this.player.getCurrentTimeInMin();
    this.updateCurrentTimeLabel();

    //update RemainingTimeValue
    this.remainingTimeInMin = this.player.getRemainingTimeInMin();
    this.updateRemainingTime();

    if(debug) {
      console.log("{cTime in Min: "+ this.currentTimeInMin +"} " + "{rTime in Min:" + this.remainingTimeInMin +"}");
    }
  }

  //updates the progressbar to the updated value
  private updateProgressbarValue(): void {
    const slider = document.getElementById("progressBar") as HTMLInputElement;
    if (typeof this.currentTimeInSec === "string") {
      slider.value = this.currentTimeInSec;
    }
  }

  //updates the currentTimeLabel to the updated value
  private updateCurrentTimeLabel() {
    const label = document.getElementById("current-time-label");
    if(this.currentTimeInMin) {
      // @ts-ignore
      label.innerHTML = String(this.currentTimeInMin);
    }
  }

  //updates the RemainingTimeLabel to the updated value
  private updateRemainingTime() {
    const label = document.getElementById("remaining-time-label");
    if(this.remainingTimeInMin) {
      // @ts-ignore
      label.innerHTML = String(this.remainingTimeInMin);
    }
  }

  //Returns the hole playtime of the currently selected track in seconds
  getCurrentTrackDurationInSec(): number {
    if(!this.currentTrack) {
      return 0;
    }
    return this.currentTrack.duration
  }
}
