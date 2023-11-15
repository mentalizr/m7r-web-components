import {MultiAudio} from "./MultiAudio";
import {MultiAudioSelector} from "./MultiAudioSelector";
import {ICON_PAUSE, ICON_PLAY, ICON_VOLUME_DOWN, ICON_VOLUME_MUTE} from "./MultiAudioGlobals";

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

}