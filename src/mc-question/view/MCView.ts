import {QuestionModel} from "../model/QuestionModel";
import {MCQuestionView} from "./MCQuestionView";
import {MCOptionView} from "./MCOptionView";
import {MCFeedbackView} from "./MCFeedbackView";
import {MCButtonView} from "./MCButtonView";

export class MCView {

    public static updateView(questionModel: QuestionModel): void {
        MCQuestionView.updateStateClass(questionModel);
        MCOptionView.updateOptions(questionModel);
        MCFeedbackView.updateFeedback(questionModel);
        MCButtonView.updateButtons(questionModel);
    }
}