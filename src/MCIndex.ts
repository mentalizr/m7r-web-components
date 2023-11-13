import {MCInitializer} from "./mc-question/MCInitializer";
import {MultiAudioInitializer} from "./multiAudio/MultiAudioInitializer";

export function initializeWebComponents(): void {

    if (document.readyState == "loading") {

        // console.log("addEventListener ...");

        window.addEventListener("DOMContentLoaded", function () {
            // QuizController.registerUserEvents();
            MCInitializer.initializeQuestions();
            MultiAudioInitializer.initialize();
        })
    } else {

        // console.log("direct ...");

        // QuizController.registerUserEvents();
        MCInitializer.initializeQuestions();
        MultiAudioInitializer.initialize();
    }

}

// call when loaded ...
initializeWebComponents();


