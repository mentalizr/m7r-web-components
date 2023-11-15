import {
    CSS_CLASS__LOOP_BUTTON,
    CSS_CLASS__MULTI_AUDIO, CSS_CLASS__MUTE_BUTTON,
    CSS_CLASS__PLAY_PAUSE_BUTTON,
    CSS_CLASS__REWIND_BUTTON, CSS_CLASS__VOLUME_SLIDER
} from "./MultiAudioGlobals";
import {MultiAudio} from "./MultiAudio";

export class MultiAudioSelector {

    public static getAllMultiAudio() {
        const selector = "." + CSS_CLASS__MULTI_AUDIO;
        return document.querySelectorAll<HTMLElement>(selector);
    }

    public static getPlayPauseButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__PLAY_PAUSE_BUTTON;
        let playPauseHtmlElement = document.querySelector<HTMLElement>(selector);
        if (playPauseHtmlElement == null) console.error("Play/Pause-Button not found.");
        return playPauseHtmlElement;
    }

    public static getRewindButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__REWIND_BUTTON;
        let rewindButtonHtmlElement = document.querySelector<HTMLElement>(selector);
        if (rewindButtonHtmlElement == null) console.error("Rewind-Button not found.");
        return rewindButtonHtmlElement;
    }

    public static getLoopButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__LOOP_BUTTON;
        let loopButtonHtmlElement = document.querySelector<HTMLElement>(selector);
        if (loopButtonHtmlElement == null) console.error("Loop-Button not found.");
        return loopButtonHtmlElement;
    }

    public static getMuteButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__MUTE_BUTTON;
        let muteButtonHtmlElement = document.querySelector<HTMLElement>(selector);
        if (muteButtonHtmlElement == null) console.error("Mute-Button not found.");
        return muteButtonHtmlElement;
    }

    public static getVolumeSlider(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__VOLUME_SLIDER;
        let volumeSliderHtmlElement = document.querySelector<HTMLElement>(selector);
        if (volumeSliderHtmlElement == null) console.error("Volume-Slider not found.");
        return volumeSliderHtmlElement;
    }

}