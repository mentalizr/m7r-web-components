import {MultiAudioSelector} from "./MultiAudioSelector";
import {MultiAudio} from "./MultiAudio";

export class MultiAudioInitializer {

    public static initialize() : void {
        console.log("MultiAudioInitializer called.");

        const multiAudioHtmlElements = MultiAudioSelector.getAllMultiAudio();
        multiAudioHtmlElements.forEach(function (multiAudioHtmlElement) {
            const multiAudio = new MultiAudio(multiAudioHtmlElement.id);
            MultiAudioInitializer.registerUserEvents(multiAudio);
        });
    }

    private static registerUserEvents(multiAudio: MultiAudio) {
        console.log("Register MultiAudio.");

        const playPauseButton : HTMLElement = MultiAudioSelector.getPlayPauseButton(multiAudio);
        playPauseButton.addEventListener("click", function () {
            multiAudio.playAndPause();
        });

        const rewindButton: HTMLElement = MultiAudioSelector.getRewindButton(multiAudio);
        rewindButton.addEventListener("click", function () {
            multiAudio.rewind();
        });

        const loopButton: HTMLElement = MultiAudioSelector.getLoopButton(multiAudio);
        loopButton.addEventListener("click", function () {
            multiAudio.loopOnAndOff();
        });

        const muteButton: HTMLElement = MultiAudioSelector.getMuteButton(multiAudio);
        muteButton.addEventListener("click", function () {
            multiAudio.muteAndUnmute();
        });

    }

}