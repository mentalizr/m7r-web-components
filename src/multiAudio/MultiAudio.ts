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

    switchTrack(source: string) {
        const currentTime = this.audioElement.currentTime;
        this.audioElement.src = source;
        this.audioElement.currentTime = currentTime;
    }

    setVolumeByPercentageString(value: string) {
        const volume = parseFloat(value)
        this.audioElement.volume = volume / 100;
    }

    public toggleMute() {
        this.audioElement.muted = !this.audioElement.muted;
    }

    public toggleLoop() {
        this.audioElement.loop = !this.audioElement.loop;
    }

    getCurrentTimeInMin(): string {
        const minutes = Math.floor(this.audioElement.currentTime / 60);
        const seconds = Math.round(this.audioElement.currentTime % 60);
        if (seconds < 10) {
            return `${minutes}:0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    getCurrentTimePerThousand(): string {
        return (1000 / this.duration * this.audioElement.currentTime).toString();
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

    public gotoTimestampPerThousand(timestampPerThousand: number) {
        if (this.duration != 0) {
            this.audioElement.currentTime = this.duration / 1000 * timestampPerThousand;
        }
    }

}
