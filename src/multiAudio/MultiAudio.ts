import {MultiAudioAbstractState} from "./state/MultiAudioAbstractState";
import {InitializedState} from "./state/InitializedState";

export class MultiAudio {
    public htmlId: string;
    public sources: string[];
    public audioElement: HTMLAudioElement;
    public duration: number = 0;
    public state: MultiAudioAbstractState;
    public interval: number;

    constructor(htmlId: string, sources: string[]) {
        this.htmlId = htmlId;
        this.sources = sources;
        this.audioElement = new Audio();
        this.switchTrack(sources[0]);
        this.state = new InitializedState(this);
    }

    public clearInterval() {
        if (this.interval !== undefined) {
            window.clearInterval(this.interval);
        }
        this.interval = undefined;
    }

    skipBack() {
        this.audioElement.currentTime = 0;
    }

    // skipTo(skipTo: number) {
    //     this.audioElement.currentTime = skipTo;
    // }

    switchTrack(source: string) {
        const currentTime = this.audioElement.currentTime;
        this.audioElement.src = source;
        this.audioElement.currentTime = currentTime;
    }

    getCurrentTime(): number {
        return this.audioElement.currentTime;
    }

    // seekTo() {
    //     const element = document.getElementById("progressBar") as HTMLInputElement;
    //     const seekTo = parseFloat(element.value);
    //     this.audioWrapper.skipTo(seekTo);
    // }

    setVolume(value: string) {
        const volume = parseFloat(value)
        this.audioElement.volume = volume / 100;
    }

    public toggleMute() {
        this.audioElement.muted = !this.isMuted();
    }

    public isMuted(): boolean {
        return this.audioElement.muted;
    }

    public toggleLoop() {
        this.audioElement.loop = !this.isLoop();
    }

    public isLoop(): boolean {
        return this.audioElement.loop;
    }

    getCurrentTimeInMin(): string {
        const minutes = Math.floor(this.getCurrentTime() / 60);
        const seconds = Math.round(this.getCurrentTime() % 60);
        if (seconds < 10) {
            return `${minutes}:0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    getCurrentTimePerThousand(): string {
        return (1000 / this.duration * this.getCurrentTime()).toString();
    }


    getRemainingTimeInMin(): string {
        if (this.duration == 0) return "0:00";

        const inSec = Math.floor(this.duration - this.getCurrentTime());

        const minutes = Math.floor(inSec / 60);
        const seconds = Math.round(inSec % 60);
        if (seconds < 10) {
            return `${minutes}:0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

}
