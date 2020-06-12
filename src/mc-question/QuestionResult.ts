import {QuestionModel} from "./model/QuestionModel";

export class QuestionResult {

    private _questionModel: QuestionModel;

    private _selectedCorrect: Set<string>;
    private _selectedIncorrect: Set<string>;
    private _unselectedCorrect: Set<string>;
    private _unselectedIncorrect: Set<string>;

    constructor(questionModel: QuestionModel) {
        this._questionModel = questionModel;

        let optionIDs: string[] = this._questionModel.getOptionIDs();
        let correctOptionIDs: Set<string> = new Set<string>(this._questionModel.getCorrectOptionIDs());

        let selectedCorrect: Set<string> = new Set();
        let selectedIncorrect: Set<string> = new Set();
        let unselectedCorrect: Set<string> = new Set();
        let unselectedIncorrect: Set<string> = new Set();

        optionIDs.forEach(function (optionID: string) {

            const definedAsCorrect: boolean = correctOptionIDs.has(optionID);
            const selected: boolean = questionModel.isSelected(optionID);

            if (definedAsCorrect) {
                if (selected) {
                    selectedCorrect.add(optionID);
                } else {
                    unselectedIncorrect.add(optionID);
                }
            } else {
                if (selected) {
                    selectedIncorrect.add(optionID);
                } else {
                    unselectedCorrect.add(optionID);
                }
            }

        });

        this._selectedCorrect = selectedCorrect;
        this._selectedIncorrect = selectedIncorrect;
        this._unselectedCorrect = unselectedCorrect;
        this._unselectedIncorrect = unselectedIncorrect;

    }

    public isAnsweredCorrectly(): boolean {
        return this._selectedIncorrect.size === 0 && this._unselectedIncorrect.size === 0;
    }

    public getSelectedCorrect(): Set<string> {
        return this._selectedCorrect;
    }

    public getSelectedIncorrect(): Set<string> {
        return this._selectedIncorrect;
    }

    public getUnselectedIncorrect(): Set<string> {
        return this._unselectedIncorrect;
    }

}