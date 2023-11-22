import {
    CSS_CLASS__CURRENT_TIME_LABEL,
    CSS_CLASS__LOOP_BUTTON,
    CSS_CLASS__MULTI_AUDIO, CSS_CLASS__MUTE_BUTTON,
    CSS_CLASS__PLAY_PAUSE_BUTTON, CSS_CLASS__PROGRESS_BAR, CSS_CLASS__REMAINING_TIME_LABEL,
    CSS_CLASS__SKIP_BACK_BUTTON, CSS_CLASS__TRACK_BUTTON, CSS_CLASS__VOLUME_SLIDER
} from "./MultiAudioGlobals";
import {MultiAudio} from "./MultiAudio";

export class MultiAudioSelector {

    public static getAllMultiAudio() {
        const selector = "." + CSS_CLASS__MULTI_AUDIO;
        return document.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllTrackButtons(multiAudio: MultiAudio) {
        return this.getAllTrackButtonsById(multiAudio.htmlId);
    }

    public static getAllTrackButtonsById(multiAudioId: string) {
        const selector = "#" + multiAudioId + " ." + CSS_CLASS__TRACK_BUTTON;
        const trackButtons = document.querySelectorAll<HTMLElement>(selector);
        if (trackButtons.length == 0) console.error("No track-button found.");
        return trackButtons;
    }

    public static getTrackButtonForSource(multiAudio: MultiAudio, source: string): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " button[data-source='" + source + "']";
        return document.querySelector<HTMLElement>(selector);
    }

    public static getPlayPauseButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__PLAY_PAUSE_BUTTON;
        let playPauseHtmlElement = document.querySelector<HTMLElement>(selector);
        if (playPauseHtmlElement == null) console.error("Play/Pause-Button not found.");
        return playPauseHtmlElement;
    }

    public static getSkipBackButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__SKIP_BACK_BUTTON;
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

    public static getProgressBar(multiAudio: MultiAudio): HTMLInputElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__PROGRESS_BAR;
        return document.querySelector<HTMLInputElement>(selector);
    }

    public static getCurrentTimeLabel(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__CURRENT_TIME_LABEL;
        return document.querySelector<HTMLElement>(selector);
    }

    public static getRemainingTimeLabel(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__REMAINING_TIME_LABEL;
        return document.querySelector<HTMLElement>(selector);
    }

}