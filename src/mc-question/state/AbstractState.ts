import {QuestionModel} from "../model/QuestionModel";

export abstract class AbstractState {

    protected _questionModel: QuestionModel;

    protected constructor(questionModel: QuestionModel) {
        this._questionModel = questionModel;
    }

    public abstract getStateClass(): string;

    public abstract optionClicked(optionId: string): void;

    public abstract buttonCheckClicked(): void;

    public abstract buttonShowSolutionClicked(): void;

    public abstract buttonRetryClicked(): void;

}


