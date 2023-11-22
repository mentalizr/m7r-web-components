import {MultiAudioAbstractState} from "./MultiAudioAbstractState";
import {MultiAudio} from "../MultiAudio";
import {MultiAudioView} from "../MultiAudioView";
import {PlayingState} from "./PlayingState";

export class PausedState extends MultiAudioAbstractState {

    constructor(multiAudio: MultiAudio) {
        super(multiAudio);
        multiAudio.clearInterval();
    }

    public playPauseButtonPressed() {
        this.multiAudio.audioElement.play();
        MultiAudioView.displayPauseButton(this.multiAudio);
        this.multiAudio.state = new PlayingState(this.multiAudio);
    }

}