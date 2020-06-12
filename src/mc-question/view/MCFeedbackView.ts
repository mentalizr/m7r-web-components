import {QuestionModel} from "../model/QuestionModel";
import {Selector} from "../Selector";
import {CSS_CLASS_BS_D_INLINE_BLOCK, CSS_CLASS_BS_D_NONE} from "../Globals";

export class MCFeedbackView {

    public static updateFeedback(questionModel: QuestionModel) {

        let feedbackSuccess: HTMLElement = Selector.getFeedbackSuccess(questionModel.getId());
        if (questionModel.isShowFeedbackSuccess()) {
            MCFeedbackView.showFeedback(feedbackSuccess);
        } else {
            MCFeedbackView.hideFeedback(feedbackSuccess);
        }

        let feedbackFail: HTMLElement = Selector.getFeedbackFail(questionModel.getId());
        if (questionModel.isShowFeedbackFail()) {
            MCFeedbackView.showFeedback(feedbackFail);
        } else {
            MCFeedbackView.hideFeedback(feedbackFail);
        }
    }

    private static showFeedback(feedback: HTMLElement): void {
        if (!feedback.classList.contains(CSS_CLASS_BS_D_INLINE_BLOCK)) {
            feedback.classList.remove(CSS_CLASS_BS_D_NONE);
            feedback.classList.add(CSS_CLASS_BS_D_INLINE_BLOCK);
        }
    }

    private static hideFeedback(feedback: HTMLElement): void {
        if (feedback.classList.contains(CSS_CLASS_BS_D_INLINE_BLOCK)) {
            feedback.classList.remove(CSS_CLASS_BS_D_INLINE_BLOCK);
        }
        feedback.classList.add(CSS_CLASS_BS_D_NONE);
    }

}