import {MCType} from "../MCType";
import {AbstractState} from "../state/AbstractState";
import {AnsweringState} from "../state/AnsweringState";
import {QuestionResult} from "../QuestionResult";

export class QuestionModel {

    private readonly _id: string;
    private readonly _mcType: MCType;
    private readonly _optionIDs: string[];
    private readonly _correctOptionIDs: string[];

    private _selectedIDs = new Set<string>();
    private _showFeedbackSuccess = false;
    private _showFeedbackFail = false;
    private _showButtonCheck = true;
    private _showButtonShowSolution = false;
    private _showButtonRetry = false;

    // private _selectedCorrect = new Set<string>();
    // private _selectedIncorrect = new Set<string>();
    // private _unselectedIncorrect = new Set<string>();

    private _state: AbstractState;

    private _questionResult: QuestionResult | undefined = undefined;

    constructor(id, mcType: MCType, optionIDs: string[], correctOptionIDs: string[]) {
        this._id = id;
        this._mcType = mcType;
        this._optionIDs = optionIDs;
        this._correctOptionIDs = correctOptionIDs;

        if (optionIDs.length == 0) {
            console.error("No answering options found for question ID [" + id + "].");
        }

        if (correctOptionIDs.length == 0) {
            console.error("No correct answer options found for question ID [" + id + "].");
        }

        if (mcType == MCType.ONE && correctOptionIDs.length > 1) {
            console.error("Found more than one correct answer options while MC type is 'ONE' for question ID [" + id + "].");
        }

        this._state = new AnsweringState(this);
    }

    public getId(): string {
        return this._id;
    }

    public getMCType(): MCType {
        return this._mcType;
    }

    public isMCTypeOne(): boolean {
        return this._mcType === MCType.ONE;
    }

    public isMCTypeMulti(): boolean {
        return this._mcType === MCType.MULTI;
    }

    public getOptionIDs(): string[] {
        return this._optionIDs;
    }

    public getCorrectOptionIDs(): string[] {
        return this._correctOptionIDs;
    }

    public selectOption(optionID: string) {
        this._selectedIDs.add(optionID);
    }

    public unselectOption(optionID: string) {
        this._selectedIDs.delete(optionID);
    }

    public toggleSelectOption(optionID: string) {
        if (this._selectedIDs.has(optionID)) {
            this._selectedIDs.delete(optionID);
        } else {
            this._selectedIDs.add(optionID);
        }
    }

    public isSelected(optionID: string): boolean {
        return this._selectedIDs.has(optionID);
    }

    public selectExclusive(optionID: string) {
        this._selectedIDs.clear();
        this._selectedIDs.add(optionID);
    }

    public clearSelected(): void {
        this._selectedIDs.clear();
    }

    public isShowFeedbackSuccess(): boolean {
        return this._showFeedbackSuccess;
    }

    public setShowFeedbackSuccess(value: boolean) {
        this._showFeedbackSuccess = value;
    }

    public isShowFeedbackFail(): boolean {
        return this._showFeedbackFail;
    }

    public setShowFeedbackFail(value: boolean) {
        this._showFeedbackFail = value;
    }

    public isShowButtonCheck(): boolean {
        return this._showButtonCheck;
    }

    public setShowButtonCheck(value: boolean) {
        this._showButtonCheck = value;
    }

    public isShowButtonRetry(): boolean {
        return this._showButtonRetry;
    }

    public setShowButtonRetry(value: boolean) {
        this._showButtonRetry = value;
    }

    public isShowButtonShowSolution(): boolean {
        return this._showButtonShowSolution;
    }

    public setShowButtonShowSolution(value: boolean) {
        this._showButtonShowSolution = value;
    }

    public getState(): AnsweringState {
        return this._state;
    }

    public setState(state: AbstractState) {
        this._state = state;
    }

    // public setValidationResult(questionResult: QuestionResult): void {
    //     this._selectedCorrect = questionResult.getSelectedCorrect();
    //     this._selectedIncorrect = questionResult.getSelectedIncorrect();
    //     this._unselectedIncorrect = questionResult.getUnselectedIncorrect();
    // }

    public setQuestionResult(questionResult: QuestionResult): void {
        this._questionResult = questionResult;
    }

    public getQuestionResult(): QuestionResult {
        return this._questionResult;
    }

    public clearQuestionResult(): void {
        this._questionResult = undefined;
    }

    public debugOut(): void {
        console.log("Question ID: " + this._id);
        console.log("    mcType: " + this._mcType);
        console.log("    number of options: " + this._optionIDs.length);
        console.log("    options:");
        this._optionIDs.forEach(function (optionId) {
            console.log("        " + optionId);
        });
        console.log("    correct options:");
        this._correctOptionIDs.forEach(function (correctOptionId) {
            console.log("        " + correctOptionId);
        });
        console.log("    selected options:");
        this._selectedIDs.forEach(function (selectedId) {
            console.log("        " + selectedId);
        });
        console.log("    Validation:");
        if (this._questionResult != undefined) {
            console.log("        selected correct:");
            this._questionResult.getSelectedCorrect().forEach(function (selectedCorrectId) {
                console.log("            " + selectedCorrectId);
            });
            console.log("        selected incorrect:");
            this._questionResult.getUnselectedIncorrect().forEach(function (selectedIncorrectId) {
                console.log("            " + selectedIncorrectId);
            });
            console.log("        unselected incorrect:");
            this._questionResult.getUnselectedIncorrect().forEach(function (unselectedIncorrectId) {
                console.log("            " + unselectedIncorrectId);
            });
        } else {
            console.log("        none");
        }
        console.log("    Feedback state:");
        console.log("        success: " + this._showFeedbackSuccess);
        console.log("        fail: " + this._showFeedbackFail);
        console.log("    Button state:");
        console.log("        check: " + this._showButtonCheck);
        console.log("        show solution: " + this._showButtonShowSolution);
        console.log("        retry: " + this._showButtonRetry);
        console.log("    State: " + this._state.constructor.name);
    }

}