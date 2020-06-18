import {AbstractState} from "./AbstractState";
import {CSS_CLASS_STATE_SHOW_SOLUTION} from "../Globals";
import {QuestionModel} from "../model/QuestionModel";
import {AnsweringState} from "./AnsweringState";
import {MCView} from "../view/MCView";

export class ShowSolutionState extends AbstractState {

    constructor(questionModel: QuestionModel) {
        super(questionModel);

        this._questionModel.setShowFeedbackSuccess(false);
        this._questionModel.setShowFeedbackFail(false);
        this._questionModel.setShowButtonCheck(false);
        this._questionModel.setShowButtonShowSolution(false);
        this._questionModel.setShowButtonRetry(true);
    }

    buttonCheckClicked(): void {
        console.error("Button 'check' should not be accessible for question ID " + this._questionModel.getId());
    }

    buttonRetryClicked(): void {
        // console.log("Button 'retry' clicked for question ID " + this._questionModel.getId());

        this._questionModel.clearSelected();
        this._questionModel.clearQuestionResult();
        this._questionModel.setState(new AnsweringState(this._questionModel));
        MCView.updateView(this._questionModel);
    }

    buttonShowSolutionClicked(): void {
        console.error("Button 'show solution' should not be accessible for question ID " + this._questionModel.getId());
    }

    getStateClass(): string {
        return CSS_CLASS_STATE_SHOW_SOLUTION;
    }

    optionClicked(optionId: string): void {
        // do intentionally nothing
    }

}