import {QuestionModel} from "../model/QuestionModel";
import {MCSelector} from "../MCSelector";
import {
    CSS_CLASS_MC_OPTION_SELECTED,
    CSS_CLASS_MC_OPTION_VALIDATED_CORRECT,
    CSS_CLASS_MC_OPTION_VALIDATED_INCORRECT, CSS_CLASS_MC_OPTION_VALIDATED_MISSING
} from "../MCGlobals";

export class MCOptionView {

    public static updateOptions(questionModel: QuestionModel): void {

        MCOptionView.updateSelectionState(questionModel);
        MCOptionView.updateValidationState(questionModel);
    }

    private static updateSelectionState(questionModel: QuestionModel): void {

        const options: string[] = questionModel.getOptionIDs();

        options.forEach(function (optionID) {
            if (questionModel.isSelected(optionID)) {
                MCOptionView.selectOption(optionID, questionModel);
            } else {
                MCOptionView.unselectOption(optionID);
            }
        });
    }

    private static updateValidationState(questionModel: QuestionModel): void {

        const options: string[] = questionModel.getOptionIDs();

        options.forEach(function (optionID: string) {

            MCOptionView.cleanValidation(optionID);

            if (questionModel.getQuestionResult() !== undefined) {
                if (questionModel.getQuestionResult().getSelectedCorrect().has(optionID)) {
                    MCOptionView.markOptionAsSelectedCorrect(optionID);
                } else if (questionModel.getQuestionResult().getSelectedIncorrect().has(optionID)) {
                    MCOptionView.markOptionAsSelectedIncorrect(optionID);
                } else if (questionModel.getQuestionResult().getUnselectedIncorrect().has(optionID)) {
                    // MCView.markOptionAsUnselectedIncorrect(optionID);
                }
            }

        });
    }

    public static selectOption(optionID: string, questionModel: QuestionModel): void {

        let option: HTMLElement = MCSelector.getOption(optionID);
        if (!option.classList.contains(CSS_CLASS_MC_OPTION_SELECTED)) {
            option.classList.add(CSS_CLASS_MC_OPTION_SELECTED);
        }
    }

    public static unselectOption(optionID: string): void {
        let option: HTMLElement = MCSelector.getOption(optionID);

        if (option.classList.contains(CSS_CLASS_MC_OPTION_SELECTED)) {
            option.classList.remove(CSS_CLASS_MC_OPTION_SELECTED);
        }
    }

    private static cleanValidation(optionID: string): void {
        let option: HTMLElement = MCSelector.getOption(optionID);

        if (option.classList.contains(CSS_CLASS_MC_OPTION_VALIDATED_CORRECT)) {
            option.classList.remove(CSS_CLASS_MC_OPTION_VALIDATED_CORRECT);
        } else if (option.classList.contains(CSS_CLASS_MC_OPTION_VALIDATED_INCORRECT)) {
            option.classList.remove(CSS_CLASS_MC_OPTION_VALIDATED_INCORRECT);
        } else if (option.classList.contains(CSS_CLASS_MC_OPTION_VALIDATED_MISSING)) {
            option.classList.remove(CSS_CLASS_MC_OPTION_VALIDATED_MISSING);
        }
    }

    private static markOptionAsSelectedCorrect(optionID: string): void {
        let option: HTMLElement = MCSelector.getOption(optionID);
        option.classList.add(CSS_CLASS_MC_OPTION_VALIDATED_CORRECT);
    }

    private static markOptionAsSelectedIncorrect(optionID: string): void {
        let option: HTMLElement = MCSelector.getOption(optionID);
        option.classList.add(CSS_CLASS_MC_OPTION_VALIDATED_INCORRECT);
    }

    private static markOptionAsUnselectedIncorrect(optionID: string): void {
        let option: HTMLElement = MCSelector.getOption(optionID);
        option.classList.add(CSS_CLASS_MC_OPTION_VALIDATED_MISSING);
    }

}