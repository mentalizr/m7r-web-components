import {MultiAudioSelector} from "./MultiAudioSelector";
import {MultiAudio} from "./MultiAudio";

export class MultiAudioInitializer {

    public static initialize() : void {
        console.log("MultiAudioInitializer called.");

        const multiAudioHtmlElements = MultiAudioSelector.getAllMultiAudio();
        multiAudioHtmlElements.forEach(function (multiAudioHtmlElement) {
            const multiAudio = new MultiAudio();
            MultiAudioInitializer.registerUserEvents(multiAudio);
        });
    }

    private static registerUserEvents(multiAudio: MultiAudio) {
        console.log("Register MultiAudio.");

        const playPauseButton : HTMLElement = MultiAudioSelector.getPlayPauseButton();
        playPauseButton.addEventListener("click", function () {
            multiAudio.playAndPause();
        });
    }

}