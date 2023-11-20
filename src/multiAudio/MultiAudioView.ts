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