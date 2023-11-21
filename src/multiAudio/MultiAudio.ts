import {AudioWrapper} from "./AudioWrapper";
import {MultiAudioView} from "./MultiAudioView";

export class MultiAudio {
    public htmlId: string;
    public sources: string[];
    public audioWrapper: AudioWrapper;
    public duration: number = 0;

    constructor(htmlId: string, sources: string[]) {
        this.htmlId = htmlId;
        this.sources = sources;
        this.audioWrapper = new AudioWrapper();
        this.audioWrapper.playTrack(sources[0]);

        // this.sources.forEach(function (source) {
        //     console.log("Source: [" + source + "].");
        // });



        setInterval(() => {
            if (this.audioWrapper.isPlaying) {
                MultiAudioView.updateProgressBarAndLabels(this);
            }
        }, 5, this.audioWrapper.isPlaying);
    }

    togglePlayPause(): void {
        if (this.audioWrapper.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        MultiAudioView.adjustPlayPauseButton(this);
    }

    play() {
        this.audioWrapper.play();
        this.audioWrapper.isPlaying = true;
    }

    pause() {
        this.audioWrapper.pause();
        this.audioWrapper.isPlaying = false;
    }

    public isPlaying(): boolean {
        return this.audioWrapper.isPlaying;
    }

    skipBack() {
        this.audioWrapper.skipBack();
        MultiAudioView.updateProgressBarAndLabels(this);
    }

    // seekTo() {
    //     const element = document.getElementById("progressBar") as HTMLInputElement;
    //     const seekTo = parseFloat(element.value);
    //     this.audioWrapper.skipTo(seekTo);
    // }

    switchTrack(source: string) {
        this.audioWrapper.pause();
        this.audioWrapper.playTrack(source);
        if (this.audioWrapper.isPlaying) {
            this.play();
        } else {
            this.pause();
        }
    }

    setVolume(value: string) {
        const volume = parseFloat(value)
        this.audioWrapper.setVolume(volume / 100);
    }

    muteAndUnmute() {
        if (this.audioWrapper.isMuted) {
            this.audioWrapper.unmute();
            this.audioWrapper.isMuted = false;
        } else {
            this.audioWrapper.mute();
            this.audioWrapper.isMuted = true;
        }
        MultiAudioView.toggleMuteButton(this);
    }

    public isMuted(): boolean {
        return this.audioWrapper.isMuted;
    }

    loopOnAndOff() {
        if (this.audioWrapper.isLoop) {
            this.audioWrapper.loopOff();
            this.audioWrapper.isLoop = false;
        } else {
            this.audioWrapper.loopOn();
            this.audioWrapper.isLoop = true;
        }
        MultiAudioView.toggleLoopButton(this);
    }

    public isLoop(): boolean {
        return this.audioWrapper.isLoop;
    }

    getCurrentTimeInMin(): string {
        const minutes = Math.floor(this.audioWrapper.getCurrentTime() / 60);
        const seconds = Math.round(this.audioWrapper.getCurrentTime() % 60);
        if (seconds < 10) {
            return `${minutes}:0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    getCurrentTimePerThousand(): string {
        return (1000 / this.duration * this.audioWrapper.getCurrentTime()).toString();
    }


    getRemainingTimeInMin(): string {
        if (this.duration == 0) return "0:00";

        const inSec = Math.floor(this.duration - this.audioWrapper.getCurrentTime());

        const minutes = Math.floor(inSec / 60);
        const seconds = Math.round(inSec % 60);
        if (seconds < 10) {
            return `${minutes}:0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }


}
