export class AudioWrapper {
    private audioElement: HTMLAudioElement;

    public isPlaying: boolean;
    public isMuted: boolean;
    public isLoop: boolean;
    public duration: number;

    constructor() {
        this.audioElement = new Audio();

        //default player settings
        this.audioElement.loop = false;
        this.isPlaying = false;
        this.isMuted = false;
        this.isLoop = false;
        this.duration = 0;

        this.audioElement.addEventListener("durationchange", () => {
            console.log("durationchange fired: " + this.audioElement.duration);
            this.duration = this.audioElement.duration;
        });


        this.audioElement.addEventListener('ended', () => {
            this.stop();
        });
    }

    getDuration(): number {
        return this.audioElement.duration;
    }

    play() {
        // if (this.currentTrackIndex < 0) {
        //   this.currentTrackIndex = 0;
        // }
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
        // this.currentTrackIndex = -1;
        this.isPlaying = false;
    }

    skipBack() {
        this.audioElement.currentTime = 0;
    }

    skipTo(skipTo: number) {
        this.audioElement.currentTime = skipTo;
    }

    setVolume(volume: number) {
        console.log("Value is " + volume);
        this.audioElement.volume = volume;
    }

    playTrack(source: string) {
        const ctime = this.audioElement.currentTime;
        this.audioElement.src = source;
        this.audioElement.currentTime = ctime;
        if (!this.isPlaying) {
            this.audioElement.pause();
        }
    }


    getCurrentTimeInSec(): number {
        return this.audioElement.currentTime;
    }

    getCurrentTimeInMin(): string {
        const minutes = Math.floor(this.getCurrentTimeInSec() / 60);
        const seconds = Math.round(this.audioElement.currentTime % 60);
        if (seconds < 10) {
            return `${minutes}:0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    getRemainingTimeInMin(): string {
        if (this.duration == 0) return "0:00";

        const inSec = Math.floor(this.duration - this.audioElement.currentTime);

        const minutes = Math.floor(inSec / 60);
        const seconds = Math.round(inSec % 60);
        if (seconds < 10) {
            return `${minutes}:0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    // getCurrentTrack(): AudioTrack | null {
    //   if (this.currentTrackIndex < 0 || this.currentTrackIndex >= this.playlist.length) {
    //     return null;
    //   }
    //   return this.playlist[this.currentTrackIndex];
    // }
}
