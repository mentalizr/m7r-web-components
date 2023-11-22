import {MultiAudio} from "../MultiAudio";
import {MultiAudioView} from "../MultiAudioView";
import {MultiAudioSelector} from "../MultiAudioSelector";

export abstract class MultiAudioAbstractState {

    protected multiAudio: MultiAudio;

    protected constructor(multiAudio: MultiAudio) {
        this.multiAudio = multiAudio;
    }

    public abstract playPauseButtonPressed();

    public progressSliderInputAdjusted() {
        const value = MultiAudioView.getProgressBarValue(this.multiAudio);
        this.multiAudio.gotoTimestampPerThousand(value);
        MultiAudioView.updateProgressBarAndLabels(this.multiAudio);
    }

    public skipBackButtonPressed() {
        this.multiAudio.audioElement.currentTime = 0;
        MultiAudioView.updateProgressBarAndLabels(this.multiAudio);
    }

    public loopButtonPressed() {
        this.multiAudio.toggleLoop();
        MultiAudioView.toggleLoopButton(this.multiAudio);
    }

    public muteButtonPressed() {
        this.multiAudio.toggleMute();
        MultiAudioView.toggleMuteButton(this.multiAudio);
    }

    public volumeSet() {
        const volumeSlider: HTMLElement = MultiAudioSelector.getVolumeSlider(this.multiAudio);
        const htmlInputElement = <HTMLInputElement> volumeSlider;
        this.multiAudio.setVolumeByPercentageString(htmlInputElement.value);
    }

    public trackSwitched(source: string) {
        this.multiAudio.switchTrack(source);
        const trackButtons = MultiAudioSelector.getAllTrackButtonsById(this.multiAudio.htmlId);
        MultiAudioView.toggleTrackButton(this.multiAudio, trackButtons, source);
    }

}