import {AbstractState} from "./AbstractState";
import {QuestionModel} from "../model/QuestionModel";
import {CSS_CLASS_STATE_CORRECT} from "../Globals";
import {QuestionResult} from "../QuestionResult";

export class CorrectState extends AbstractState {

    constructor(questionModel: QuestionModel, questionResult: QuestionResult) {
        super(questionModel);

        this._questionModel.setShowFeedbackSuccess(true);
        this._questionModel.setShowFeedbackFail(false);
        this._questionModel.setShowButtonCheck(false);
        this._questionModel.setShowButtonShowSolution(false);
        this._questionModel.setShowButtonRetry(false);

        this._questionModel.setQuestionResult(questionResult);
        this._questionModel.clearSelected();

    }

    buttonCheckClicked(): void {
        console.error("Button 'check' should not be accessible for question ID " + this._questionModel.getId());
    }

    buttonRetryClicked(): void {
        console.error("Button 'retry' should not be accessible for question ID " + this._questionModel.getId());
    }

    buttonShowSolutionClicked(): void {
        console.error("Button 'show solution' should not be accessible for question ID " + this._questionModel.getId());
   }

    optionClicked(optionId: string): void {
        // do intentionally nothing
    }

    getStateClass(): string {
        return CSS_CLASS_STATE_CORRECT;
    }

}