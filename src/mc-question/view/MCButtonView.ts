import {QuestionModel} from "../model/QuestionModel";
import {Selector} from "../Selector";
import {CSS_CLASS_BS_D_NONE} from "../Globals";

export class MCButtonView {

    public static updateButtons(questionModel: QuestionModel): void {

        let buttonCheck: HTMLElement = Selector.getButtonCheck(questionModel.getId());
        if (questionModel.isShowButtonCheck()) {
            MCButtonView.showButton(buttonCheck);
        } else {
            MCButtonView.hideButton(buttonCheck);
        }

        let buttonShowSolution: HTMLElement = Selector.getButtonShowSolution(questionModel.getId());
        if (questionModel.isShowButtonShowSolution()) {
            // console.log("Button Show: SHOW");
            MCButtonView.showButton(buttonShowSolution);
        } else {
            // console.log("Button Show: HIDE");
            MCButtonView.hideButton(buttonShowSolution);
        }

        let buttonRetry: HTMLElement = Selector.getButtonRetry(questionModel.getId());
        if (questionModel.isShowButtonRetry()) {
            MCButtonView.showButton(buttonRetry);
        } else {
            MCButtonView.hideButton(buttonRetry);
        }
    }

    private static showButton(button: HTMLElement): void {
        if (button.classList.contains(CSS_CLASS_BS_D_NONE)) {
            button.classList.remove(CSS_CLASS_BS_D_NONE);
        }
    }

    private static hideButton(button: HTMLElement): void {
        if (!button.classList.contains(CSS_CLASS_BS_D_NONE)) {
            button.classList.add(CSS_CLASS_BS_D_NONE);
        }
    }

}