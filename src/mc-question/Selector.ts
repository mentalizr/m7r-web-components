import {
    CSS_CLASS_BUTTON_CHECK, CSS_CLASS_BUTTON_RETRY, CSS_CLASS_BUTTON_SHOW,
    CSS_CLASS_FEEDBACK_FAIL,
    CSS_CLASS_FEEDBACK_SUCCESS,
    CSS_CLASS_MC_MULTI,
    CSS_CLASS_MC_ONE,
    CSS_CLASS_MC_OPTION,
    CSS_CLASS_MC_OPTION_CORRECT
} from "./Globals";

export class Selector {

    public static getQuestion(questionID: string): HTMLElement {
        const selector = "#" + questionID;
        const question = document.querySelector<HTMLElement>(selector);

        if (question == null) {
            console.error("No question found with ID [" + questionID + "].");
        }

        return question;
    }

    public static getAllMCs() {
        const selector = "." + CSS_CLASS_MC_ONE + ", ." + CSS_CLASS_MC_MULTI;
        return document.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllOptions(questionId: string) {
        const selectorOptions = "#" + questionId + " ." + CSS_CLASS_MC_OPTION;
        let options = document.querySelectorAll<HTMLElement>(selectorOptions);

        if (options.length == 0) {
            console.error("No answering options found for MC question with ID [" + questionId + "].");
        }

        return options;
    }

    public static getCorrectOptions(questionId: string) {
        const selectorOptionsCorrect = "#" + questionId + " ." + CSS_CLASS_MC_OPTION + "." + CSS_CLASS_MC_OPTION_CORRECT;
        let options_correct = document.querySelectorAll<HTMLElement>(selectorOptionsCorrect);

        if (options_correct.length == 0) {
            console.error("No correct answering options found for MC question with ID [" + questionId + "].");
        }

        return options_correct;
    }

    public static getOption(optionId: string): HTMLElement {
        const selectorOption = "#" + optionId;
        let option = document.querySelector<HTMLElement>(selectorOption);

        if (option == null) {
            console.error("MC question option with ID [" + optionId + "] not found.");
        }

        return option;
    }

    // public static getOptionIcon(optionId: string): HTMLElement {
    //     const selector = "#" + optionId + " span[class^\='m7r-mc-icon'], #" + optionId + " span[class*\='m7r-mc-icon']";
    //     console.log(selector);
    //     let iconSpan = document.querySelector<HTMLElement>(selector);
    //
    //     if (iconSpan == null) {
    //         console.error("No iconSpan found for optionId " + optionId);
    //     }
    //
    //     return iconSpan;
    // }

    public static getFeedbackSuccess(questionId: string): HTMLElement {
        const selector = "#" + questionId + " ." + CSS_CLASS_FEEDBACK_SUCCESS;
        let element = document.querySelector<HTMLElement>(selector);

        if (element == null)
            console.error("Feedback element success not found for question ID [" + questionId + "].");

        return element;
    }

    public static getFeedbackFail(questionId: string): HTMLElement {
        const selector = "#" + questionId + " ." + CSS_CLASS_FEEDBACK_FAIL;
        let element = document.querySelector<HTMLElement>(selector);

        if (element == null)
            console.error("Feedback element 'fail' not found for question ID [" + questionId + "].");

        return element;
    }

    public static getButtonCheck(questionId: string): HTMLElement {
        const selector= "#" + questionId + " ." + CSS_CLASS_BUTTON_CHECK;
        let element = document.querySelector<HTMLElement>(selector);

        if (element == null) {
            console.error("Button element 'check' not found for question ID [" + questionId + "].");
        }

        return element;
    }

    public static getButtonShowSolution(questionId: string): HTMLElement {
        const selector= "#" + questionId + " ." + CSS_CLASS_BUTTON_SHOW;
        let element = document.querySelector<HTMLElement>(selector);

        if (element == null) {
            console.error("Button element 'show' not found for question ID [" + questionId + "].");
        }

        return element;
    }

    public static getButtonRetry(questionId: string): HTMLElement {
        const selector= "#" + questionId + " ." + CSS_CLASS_BUTTON_RETRY;
        let element = document.querySelector<HTMLElement>(selector);

        if (element == null) {
            console.error("Button element 'retry' not found for question ID [" + questionId + "].");
        }

        return element;
    }


}