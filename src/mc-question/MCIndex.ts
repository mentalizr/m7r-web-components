import {MCInitializer} from "./MCInitializer";

if (document.readyState == "loading") {

    console.log("addEventListener ...");

    window.addEventListener("DOMContentLoaded", function () {
        // QuizController.registerUserEvents();
        MCInitializer.initializeQuestions();
    })
} else {

    console.log("direct ...");

    // QuizController.registerUserEvents();
    MCInitializer.initializeQuestions();
}

