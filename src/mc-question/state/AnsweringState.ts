import {AbstractState} from "./AbstractState";
import {QuestionModel} from "../model/QuestionModel";
import {MCView} from "../view/MCView";
import {QuestionResult} from "../QuestionResult";
import {CorrectState} from "./CorrectState";
import {IncorrectState} from "./IncorrectState";
import Global = WebAssembly.Global;
import {CSS_CLASS_STATE_ANSWERING} from "../Globals";

export class AnsweringState extends AbstractState {

    constructor(questionModel: QuestionModel) {
        super(questionModel);

        this._questionModel.setShowFeedbackSuccess(false);
        this._questionModel.setShowFeedbackFail(false);
        this._questionModel.setShowButtonCheck(true);
        this._questionModel.setShowButtonShowSolution(false);
        this._questionModel.setShowButtonRetry(false);
    }

    optionClicked(optionId: string): void {

        console.log("Option clicked: " + optionId + " QuestionModel: " + this._questionModel.getId());

        if (this._questionModel.isMCTypeOne()) {
            this._questionModel.selectExclusive(optionId);
        } else {
            this._questionModel.toggleSelectOption(optionId);
        }

        // TODO debug
        // questionModel.debugOut();

        MCView.updateView(this._questionModel);
    }

    buttonCheckClicked(): void {
        console.log("Button 'check' clicked for question ID " + this._questionModel.getId());

        const questionResult: QuestionResult = new QuestionResult(this._questionModel);

        if (questionResult.isAnsweredCorrectly()) {
            console.log("Question answered correctly.");
            this._questionModel.setState(new CorrectState(this._questionModel, questionResult));
        } else {
            console.log("Question answered incorrectly.");
            this._questionModel.setState(new IncorrectState(this._questionModel, questionResult));
        }

        MCView.updateView(this._questionModel);

    }

    buttonShowSolutionClicked(): void {
        console.error("Button 'show solution' should not be accessible for question ID " + this._questionModel.getId());
    }

    buttonRetryClicked(): void {
        console.error("Button 'retry' should not be accessible for question ID " + this._questionModel.getId());
    }

    getStateClass(): string {
        return CSS_CLASS_STATE_ANSWERING;
    }

}