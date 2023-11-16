import {MultiAudioSelector} from "./MultiAudioSelector";
import {MultiAudio} from "./MultiAudio";
import {CSS_CLASS__TRACK_BUTTON, TRACK_BUTTON_SOURCE_ATTRIBUTE} from "./MultiAudioGlobals";

export class MultiAudioInitializer {

    public static initialize() : void {
        console.log("MultiAudioInitializer called.");

        const multiAudioHtmlElements = MultiAudioSelector.getAllMultiAudio();
        multiAudioHtmlElements.forEach(function (multiAudioHtmlElement) {
            const sources = MultiAudioInitializer.querySources(multiAudioHtmlElement);
            const multiAudio = new MultiAudio(multiAudioHtmlElement.id, sources);
            MultiAudioInitializer.registerUserEvents(multiAudio);
        });
    }

    private static querySources(multiAudioHtmlElement: HTMLElement) : string[] {
        const multiAudioHtmlId = multiAudioHtmlElement.id;
        const trackButtons = MultiAudioSelector.getAllTrackButtons(multiAudioHtmlId);
        let sources = new Array<string>();
        trackButtons.forEach(function (trackButton) {
            sources.push(trackButton.getAttribute(TRACK_BUTTON_SOURCE_ATTRIBUTE));
        });
        return sources;
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

        const volumeSlider: HTMLElement = MultiAudioSelector.getVolumeSlider(multiAudio);
        volumeSlider.addEventListener("input", () => {
            const htmlInputElement = <HTMLInputElement>volumeSlider;
            console.log("Value: " + htmlInputElement.value);
            multiAudio.setVolume(htmlInputElement.value);
        });

    }

}