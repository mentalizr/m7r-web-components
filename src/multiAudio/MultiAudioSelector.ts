import {
    CSS_CLASS__CURRENT_TIME_LABEL,
    CSS_CLASS__LOOP_BUTTON,
    CSS_CLASS__MULTI_AUDIO,
    CSS_CLASS__MUTE_BUTTON,
    CSS_CLASS__PLAY_PAUSE_BUTTON,
    CSS_CLASS__PROGRESS_BAR,
    CSS_CLASS__REMAINING_TIME_LABEL,
    CSS_CLASS__SKIP_BACK_BUTTON,
    CSS_CLASS__TRACK_BUTTON,
    CSS_CLASS__VOLUME_SLIDER
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
        return document.querySelectorAll<HTMLElement>(selector);
    }

    public static getTrackButtonForSource(multiAudio: MultiAudio, source: string): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " button[data-source='" + source + "']";
        return document.querySelector<HTMLElement>(selector);
    }

    public static getPlayPauseButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__PLAY_PAUSE_BUTTON;
        return document.querySelector<HTMLElement>(selector);
    }

    public static getSkipBackButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__SKIP_BACK_BUTTON;
        return document.querySelector<HTMLElement>(selector);
    }

    public static getLoopButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__LOOP_BUTTON;
        return document.querySelector<HTMLElement>(selector);
    }

    public static getMuteButton(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__MUTE_BUTTON;
        return document.querySelector<HTMLElement>(selector);
    }

    public static getVolumeSlider(multiAudio: MultiAudio): HTMLElement {
        const selector = "#" + multiAudio.htmlId + " ." + CSS_CLASS__VOLUME_SLIDER;
        return document.querySelector<HTMLElement>(selector);
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