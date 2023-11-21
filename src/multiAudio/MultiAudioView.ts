import {MultiAudio} from "./MultiAudio";
import {MultiAudioSelector} from "./MultiAudioSelector";
import {
    CSS_CLASS__TRACK_BUTTON__ACTIVE,
    ICON_PAUSE,
    ICON_PLAY,
    ICON_VOLUME_DOWN,
    ICON_VOLUME_MUTE,
    TRACK_BUTTON_SOURCE_ATTRIBUTE
} from "./MultiAudioGlobals";

export class MultiAudioView {

    public static adjustPlayPauseButton(multiAudio: MultiAudio) {
        let playPauseButton: HTMLElement = MultiAudioSelector.getPlayPauseButton(multiAudio);
        if (multiAudio.isPlaying()) {
            if (!playPauseButton.classList.contains(ICON_PAUSE)) {
                playPauseButton.classList.remove(ICON_PLAY);
                playPauseButton.classList.add(ICON_PAUSE);
            }
        } else {
            if (!playPauseButton.classList.contains(ICON_PLAY)) {
                playPauseButton.classList.remove(ICON_PAUSE);
                playPauseButton.classList.add(ICON_PLAY);
            }
        }
    }

    public static toggleLoopButton(multiAudio: MultiAudio) {
        let loopButton: HTMLElement = MultiAudioSelector.getLoopButton(multiAudio);
        if (multiAudio.isLoop()) {
            if (!loopButton.classList.contains("active")) {
                loopButton.classList.add("active");
            }
        } else {
            if (loopButton.classList.contains("active")) {
                loopButton.classList.remove("active");
            }
        }
    }

    public static toggleMuteButton(muliAudio: MultiAudio) {
        let muteButton: HTMLElement = MultiAudioSelector.getMuteButton(muliAudio);
        let volumeSlider: HTMLInputElement = <HTMLInputElement>MultiAudioSelector.getVolumeSlider(muliAudio);
        if (muliAudio.isMuted()) {
            if (muteButton.classList.contains(ICON_VOLUME_DOWN)) {
                muteButton.classList.remove(ICON_VOLUME_DOWN);
                muteButton.classList.add(ICON_VOLUME_MUTE);
            }
            volumeSlider.disabled = true;
        } else {
            if (muteButton.classList.contains(ICON_VOLUME_MUTE)) {
                muteButton.classList.remove(ICON_VOLUME_MUTE);
                muteButton.classList.add(ICON_VOLUME_DOWN);
            }
            volumeSlider.disabled = false;
        }
    }

    public static updateProgressBarMaxValue(multiAudio: MultiAudio, maxValue: string) {
        const slider = MultiAudioSelector.getProgressBar(multiAudio);
        slider.setAttribute("max", maxValue);
    }

    public static updateProgressBarAndLabels(multiAudio: MultiAudio) {
        MultiAudioView.updateProgressbarValue(multiAudio);
        MultiAudioView.updateCurrentTimeLabel(multiAudio);
        MultiAudioView.updateRemainingTime(multiAudio);

        // console.log("{cTime in Min: " + this.currentTimeInMin + "} " + "{rTime in Min:" + this.remainingTimeInMin + "} duration: " + this.audioWrapper.getDuration());
    }

    private static updateProgressbarValue(multiAudio: MultiAudio): void {
        const slider = MultiAudioSelector.getProgressBar(multiAudio);
        slider.value = multiAudio.getCurrentTimePerThousand();
    }

    private static updateCurrentTimeLabel(multiAudio: MultiAudio) {
        const label = MultiAudioSelector.getCurrentTimeLabel(multiAudio);
        label.innerHTML = String(multiAudio.getCurrentTimeInMin());
    }

    private static updateRemainingTime(multiAudio: MultiAudio) {
        const label = MultiAudioSelector.getRemainingTimeLabel(multiAudio);
        label.innerHTML = String(multiAudio.getRemainingTimeInMin());
    }

    public static toggleTrackButton(multiAudio: MultiAudio, allTrackButtons: NodeListOf<HTMLElement>, source: string) {
        console.log("Track-Button: " + source)
        allTrackButtons.forEach(function (trackButton) {
            if (trackButton.getAttribute(TRACK_BUTTON_SOURCE_ATTRIBUTE) === source) {
                trackButton.classList.add(CSS_CLASS__TRACK_BUTTON__ACTIVE);
            } else {
                trackButton.classList.remove(CSS_CLASS__TRACK_BUTTON__ACTIVE);
            }
        });
    }

}