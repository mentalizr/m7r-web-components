import {AbstractState} from "./AbstractState";
import {QuestionModel} from "../model/QuestionModel";
import {Selector} from "../Selector";
import {CSS_CLASS_STATE_INCORRECT} from "../Globals";
import {MCView} from "../view/MCView";
import {AnsweringState} from "./AnsweringState";
import {QuestionResult} from "../QuestionResult";
import {ShowSolutionState} from "./ShowSolutionState";

export class IncorrectState extends AbstractState {

    constructor(questionModel: QuestionModel, questionResult: QuestionResult) {
        super(questionModel);

        this._questionModel.setShowFeedbackSuccess(false);
        this._questionModel.setShowFeedbackFail(true);
        this._questionModel.setShowButtonCheck(false);
        this._questionModel.setShowButtonShowSolution(true);
        this._questionModel.setShowButtonRetry(true);

        this._questionModel.setQuestionResult(questionResult);
        this._questionModel.clearSelected();
    }

    buttonCheckClicked(): void {
        console.error("Button 'check' should not be accessible for question ID " + this._questionModel.getId());
    }

    buttonRetryClicked(): void {
        console.log("Button 'retry' clicked for question ID " + this._questionModel.getId());

        this._questionModel.clearSelected();
        this._questionModel.clearQuestionResult();
        this._questionModel.setState(new AnsweringState(this._questionModel));
        MCView.updateView(this._questionModel);
    }

    buttonShowSolutionClicked(): void {
        console.log("Button 'show solution' clicked for question ID " + this._questionModel.getId());

        this._questionModel.clearSelected();
        this._questionModel.clearQuestionResult();
        this._questionModel.setState(new ShowSolutionState(this._questionModel));
        MCView.updateView(this._questionModel);
    }

    optionClicked(optionId: string): void {
        // do intentionally nothing
    }

    getStateClass(): string {
        return CSS_CLASS_STATE_INCORRECT;
    }

}