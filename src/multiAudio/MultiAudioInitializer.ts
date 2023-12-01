import {MultiAudioSelector} from "./MultiAudioSelector";
import {MultiAudio} from "./MultiAudio";
import {TRACK_BUTTON_SOURCE_ATTRIBUTE} from "./MultiAudioGlobals";
import {MultiAudioView} from "./MultiAudioView";
import {FinishedState} from "./state/FinishedState";

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
        const trackButtons = MultiAudioSelector.getAllTrackButtonsById(multiAudioHtmlId);
        let sources = new Array<string>();
        trackButtons.forEach(function (trackButton) {
            sources.push(trackButton.getAttribute(TRACK_BUTTON_SOURCE_ATTRIBUTE));
        });
        return sources;
    }

    private static registerLifeCycleEvents(multiAudio: MultiAudio) {

        multiAudio.audioElement.addEventListener("durationchange", () => {
            // console.log("event [durationchange] fired: " + multiAudio.audioElement.duration);
            multiAudio.duration = multiAudio.audioElement.duration;
            MultiAudioView.updateProgressBarAndLabels(multiAudio);
        });

        multiAudio.audioElement.addEventListener('ended', () => {
            // console.log("event [ended] fired.");
            MultiAudioView.displayPlayButton(multiAudio);
            multiAudio.state = new FinishedState(multiAudio);
        });

    }

    private static registerUserEvents(multiAudio: MultiAudio) {

        const playPauseButton : HTMLElement = MultiAudioSelector.getPlayPauseButton(multiAudio);
        playPauseButton.addEventListener("click", function () {
            multiAudio.state.playPauseButtonPressed();
        });

        const rewindButton: HTMLElement = MultiAudioSelector.getSkipBackButton(multiAudio);
        rewindButton.addEventListener("click", function () {
            multiAudio.state.skipBackButtonPressed();
        });

        const loopButton: HTMLElement = MultiAudioSelector.getLoopButton(multiAudio);
        loopButton.addEventListener("click", function () {
            multiAudio.state.loopButtonPressed();
        });

        const muteButton: HTMLElement = MultiAudioSelector.getMuteButton(multiAudio);
        muteButton.addEventListener("click", function () {
            multiAudio.state.muteButtonPressed();
        });

        const volumeSlider: HTMLElement = MultiAudioSelector.getVolumeSlider(multiAudio);
        volumeSlider.addEventListener("input", () => {
            multiAudio.state.volumeSet();
        });

        const progressSlider: HTMLElement = MultiAudioSelector.getProgressBar(multiAudio);
        progressSlider.addEventListener("input", () => {
            multiAudio.state.progressSliderInputAdjusted();
        });

        const multiAudioHtmlId = multiAudio.htmlId;
        const trackButtons = MultiAudioSelector.getAllTrackButtonsById(multiAudioHtmlId);
        trackButtons.forEach(function (trackButton) {
            trackButton.addEventListener("click", () => {
                const source = trackButton.getAttribute(TRACK_BUTTON_SOURCE_ATTRIBUTE);
                multiAudio.state.trackSwitched(source);
            });
        });

    }

}