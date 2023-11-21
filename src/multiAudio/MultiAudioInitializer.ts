import {MultiAudioSelector} from "./MultiAudioSelector";
import {MultiAudio} from "./MultiAudio";
import {TRACK_BUTTON_SOURCE_ATTRIBUTE} from "./MultiAudioGlobals";
import {MultiAudioView} from "./MultiAudioView";

export class MultiAudioInitializer {

    public static initialize() : void {
        console.log("MultiAudioInitializer called.");
        MultiAudioInitializer.initializeEachMultiAudioElement();
    }

    private static initializeEachMultiAudioElement() {
        const multiAudioHtmlElements = MultiAudioSelector.getAllMultiAudio();
        multiAudioHtmlElements.forEach(function (multiAudioHtmlElement) {
            const sources = MultiAudioInitializer.querySources(multiAudioHtmlElement);
            const multiAudio = new MultiAudio(multiAudioHtmlElement.id, sources);
            MultiAudioInitializer.registerUserEvents(multiAudio);
            MultiAudioInitializer.registerLifeCycleEvents(multiAudio);
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

    private static registerLifeCycleEvents(multiAudio: MultiAudio) {
        multiAudio.audioWrapper.audioElement.addEventListener("durationchange", () => {
            // console.log("durationchange fired: " + multiAudio.audioWrapper.audioElement.duration);
            multiAudio.duration = multiAudio.audioWrapper.audioElement.duration;
            MultiAudioView.updateProgressBarAndLabels(multiAudio);
        });
    }

    private static registerUserEvents(multiAudio: MultiAudio) {

        const playPauseButton : HTMLElement = MultiAudioSelector.getPlayPauseButton(multiAudio);
        playPauseButton.addEventListener("click", function () {
            multiAudio.togglePlayPause();
        });

        const rewindButton: HTMLElement = MultiAudioSelector.getRewindButton(multiAudio);
        rewindButton.addEventListener("click", function () {
            multiAudio.skipBack();
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

        const multiAudioHtmlId = multiAudio.htmlId;
        const trackButtons = MultiAudioSelector.getAllTrackButtons(multiAudioHtmlId);
        trackButtons.forEach(function (trackButton) {
            trackButton.addEventListener("click", () => {
                const source = trackButton.getAttribute(TRACK_BUTTON_SOURCE_ATTRIBUTE);
                multiAudio.switchTrack(source);
                MultiAudioView.toggleTrackButton(multiAudio, trackButtons, source);
            });
        });

    }

}