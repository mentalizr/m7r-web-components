import {MultiAudioAbstractState} from "./MultiAudioAbstractState";
import {MultiAudio} from "../MultiAudio";
import {MultiAudioView} from "../MultiAudioView";
import {PlayingState} from "./PlayingState";
import {PausedState} from "./PausedState";

export class FinishedState extends MultiAudioAbstractState {

    constructor(multiAudio: MultiAudio) {
        super(multiAudio);
        multiAudio.clearInterval();
    }

    public playPauseButtonPressed() {
        this.multiAudio.audioElement.currentTime = 0;
        this.multiAudio.audioElement.play();
        MultiAudioView.displayPauseButton(this.multiAudio);
        this.multiAudio.state = new PlayingState(this.multiAudio);
    }

    progressSliderInputAdjusted() {
        super.progressSliderInputAdjusted();
        this.multiAudio.state = new PausedState(this.multiAudio);
    }

}