import {MultiAudioAbstractState} from "./MultiAudioAbstractState";
import {MultiAudio} from "../MultiAudio";
import {MultiAudioView} from "../MultiAudioView";
import {PausedState} from "./PausedState";

export class PlayingState extends MultiAudioAbstractState {

    constructor(multiAudio: MultiAudio) {
        super(multiAudio);
        multiAudio.interval = window.setInterval(() => {
            MultiAudioView.updateProgressBarAndLabels(multiAudio);
            // console.log("interval is running")
        }, 5);
    }

    public playPauseButtonPressed() {
        this.multiAudio.audioElement.pause();
        MultiAudioView.displayPlayButton(this.multiAudio);
        this.multiAudio.state = new PausedState(this.multiAudio);
    }

    public trackSwitched(source: string) {
        super.trackSwitched(source);
        this.multiAudio.audioElement.play();
    }

    progressSliderInputAdjusted() {
        // TODO
    }

}