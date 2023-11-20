import {AudioWrapper} from "./AudioWrapper";
import {MultiAudioView} from "./MultiAudioView";
import {MultiAudioSelector} from "./MultiAudioSelector";

export class MultiAudio {
    public htmlId: string;
    public sources: string[];
    public duration: number;
    public audioWrapper: AudioWrapper;
    public currentTimeInSec: string | undefined;
    public currentTimeInMin: string = "0:00";
    public remainingTimeInMin: string = "0:00";
    public init: boolean;

    constructor(htmlId: string, sources: string[]) {
        this.htmlId = htmlId;
        this.sources = sources;
        this.audioWrapper = new AudioWrapper();
        this.audioWrapper.playTrack(sources[0]);

        this.init = true;

        this.sources.forEach(function (source) {
            console.log("Source: [" + source + "].");
        });

        // this.determineDurationOfFirstSource();
        // this.duration = this.determineDuration();
        // console.log("Duration: " + this.duration);

        //only for now
        // this.loadPlaylist();

        setInterval(() => {
            if (this.audioWrapper.isPlaying) {
                this.updateProcedure(true);
            }
        }, 5, this.audioWrapper.isPlaying);
    }

    private determineDurationOfFirstSource(): void {
        const audio = new Audio(this.sources[0]);
        audio.addEventListener("durationchange", () => {
            console.log("durationchange fired: " + audio.duration);
            this.duration = audio.duration;
        });
    }

    // private determineDuration(): number {
    //     let durations = new Array<number>();
    //     this.sources.forEach(function (source) {
    //         const audio = new Audio();
    //         audio.src = source;
    //         audio.load();
    //         const duration = audio.duration;
    //         console.log("duration of [" + source + "] is " + duration + ".");
    //         durations.push(audio.duration);
    //     })
    //     return Math.max(...durations);
    // }

    public getHtmlId(): string {
        return this.htmlId;
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
        this.init = false;
        this.audioWrapper.isPlaying = true;
        // this.currentTrack = this.player.getCurrentTrack();
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
    }

    //set the time from which the player should continue playing
    seekTo() {
        const element = document.getElementById("progressBar") as HTMLInputElement;
        const seekTo = parseFloat(element.value);
        this.audioWrapper.skipTo(seekTo);
    }

    // //skip to a certain song inside the playlist
    // skipSong(track: AudioTrack) {
    //     const trackIndex = this.playlist.indexOf(track, 0);
    //     this.player.pause();
    //     this.player.playTrackAtIndex(trackIndex)
    //
    //     if (!this.init) {
    //         this.play()
    //     }
    // }

    switchTrack(source: string) {
        this.audioWrapper.pause();
        this.audioWrapper.playTrack(source);
        if (this.audioWrapper.isPlaying) {
            this.play();
        } else {
            this.pause();
        }

        // if (!this.init) {
        //     this.play()
        // }
    }

    //sets the volume of the player between 0-100
    setVolume(value: string) {
        const volume = parseFloat(value)
        this.audioWrapper.setVolume(volume / 100);
    }

    //mutes the Audio output
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

    //lets the currently selected Track to be looped after play though
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

    //updates all values inside this class that are shown on the overlay.
    //Values are taken out of the Subclass AudioPlayer.ts
    private updateProcedure(debug: boolean) {

        //update PercentageValue and the Slider
        this.currentTimeInSec = this.audioWrapper.getCurrentTimeInSec().toString();
        this.updateProgressbarValue();

        //update TimeStampValue
        this.currentTimeInMin = this.audioWrapper.getCurrentTimeInMin();
        this.updateCurrentTimeLabel();

        //update RemainingTimeValue
        this.remainingTimeInMin = this.audioWrapper.getRemainingTimeInMin();
        this.updateRemainingTime();

        if (debug) {
            console.log("{cTime in Min: " + this.currentTimeInMin + "} " + "{rTime in Min:" + this.remainingTimeInMin + "} duration: " + this.audioWrapper.getDuration());
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
        const label = MultiAudioSelector.getCurrentTimeLabel(this);
        label.innerHTML = String(this.currentTimeInMin);
    }

    //updates the RemainingTimeLabel to the updated value
    private updateRemainingTime() {
        const label = MultiAudioSelector.getRemainingTimeLabel(this);
        label.innerHTML = String(this.remainingTimeInMin);
    }

    //Returns the hole playtime of the currently selected track in seconds
    // getCurrentTrackDurationInSec(): number {
    //     if (!this.currentTrack) {
    //         return 0;
    //     }
    //     return this.currentTrack.duration
    // }
}
