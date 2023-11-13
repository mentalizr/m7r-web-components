import {CSS_CLASS__MULTI_AUDIO, ID__PLAY_PAUSE_BUTTON} from "./MultiAudioGlobals";

export class MultiAudioSelector {

    public static getAllMultiAudio() {
        const selector = "." + CSS_CLASS__MULTI_AUDIO;
        return document.querySelectorAll<HTMLElement>(selector);
    }

    public static getPlayPauseButton(): HTMLElement {
        const selector = "#" + ID__PLAY_PAUSE_BUTTON;
        let playPauseHtmlElement = document.querySelector<HTMLElement>(selector);

        if (playPauseHtmlElement == null) {
            console.error("Play/Pause-Button not found.");
        }

        return playPauseHtmlElement;
    }


}