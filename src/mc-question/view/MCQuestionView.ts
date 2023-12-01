import {QuestionModel} from "../model/QuestionModel";
import {MCSelector} from "../MCSelector";
import {CSS_CLASS_STATE_PREFIX} from "../MCGlobals";

export class MCQuestionView {

    public static updateStateClass(questionModel: QuestionModel) {

        let question: HTMLElement = MCSelector.getQuestion(questionModel.getId());

        this.cleanState(question);
        this.updateCurrentState(questionModel, question);
    }

    private static cleanState(question: HTMLElement): void {

        let currentStateClass: string = "";

        question.classList.forEach(
            function (value, key, parent) {
                if (value.startsWith(CSS_CLASS_STATE_PREFIX)) {
                    currentStateClass = value;
                }
            });

        if (currentStateClass !== "") {
            question.classList.remove(currentStateClass);
        }
    }

    private static updateCurrentState(questionModel: QuestionModel, question: HTMLElement): void {
        const currentStateClass: string = questionModel.getState().getStateClass();
        if (currentStateClass !== "") {
            question.classList.add(questionModel.getState().getStateClass());
        }
    }


}