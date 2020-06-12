import {CSS_CLASS_MC_ONE} from "./Globals";
import {QuestionModel} from "./model/QuestionModel";
import {Selector} from "./Selector";
import {MCType} from "./MCType";
import {MCView} from "./view/MCView";

export class MCInitializer {

    public static initializeQuestions(): void {

        console.log("Initialize Questions ...");

        let questions = Selector.getAllMCs();

        console.log("Found " + questions.length + " mc-questions");

        questions.forEach(function (questionElement) {
            let questionModel: QuestionModel = MCInitializer.createQuestionModel(questionElement);
            questionModel.debugOut();

            MCInitializer.registerUserEvents(questionModel);
            MCView.updateView(questionModel);
        });

    }

    private static createQuestionModel(questionElement: HTMLElement): QuestionModel {

        const questionId: string = questionElement.id;

        console.log("Initialize question with ID: " + questionId);

        // const selectorOptions = "#" + questionId + " ." + CSS_CLASS_MC_OPTION;
        // let mc_options = document.querySelectorAll(selectorOptions);
        let mc_options = Selector.getAllOptions(questionId);
        console.log("Found " + mc_options.length + " options.");

        let optionIDs: string[] = [];
        mc_options.forEach(function (mcOption) {
            optionIDs.push(mcOption.id);
        })

        // const selectorOptionsCorrect = "#" + questionId + " ." + CSS_CLASS_MC_OPTION + "." + CSS_CLASS_MC_OPTION_CORRECT;
        // let mc_options_correct = document.querySelectorAll(selectorOptionsCorrect);
        let mc_options_correct = Selector.getCorrectOptions(questionId);
        console.log("Found " + mc_options_correct.length + " correct options.");

        let correctOptionIDs: string[] = [];
        mc_options_correct.forEach(function (mcOptionCorrect) {
            correctOptionIDs.push(mcOptionCorrect.id);
        });

        let mcType: MCType;
        if (questionElement.classList.contains(CSS_CLASS_MC_ONE)) {
            mcType = MCType.ONE;
        } else {
            mcType = MCType.MULTI;
        }

        return new QuestionModel(questionId, mcType, optionIDs, correctOptionIDs);
    }

    private static registerUserEvents(questionModel: QuestionModel): void {

        console.log("register user events ...");

        questionModel.getOptionIDs().forEach(function (optionId) {

            let mcOption = Selector.getOption(optionId);

            mcOption.addEventListener("click", function () {
                // console.log(optionId + ": click!");
                // QuizController.optionClicked(questionModel, optionId);
                questionModel.getState().optionClicked(optionId);
            });

        });

        let buttonCheck: HTMLElement = Selector.getButtonCheck(questionModel.getId());
        buttonCheck.addEventListener("click", function () {
            // QuizController.buttonCheckClicked(questionModel);
            questionModel.getState().buttonCheckClicked();
        });

        let buttonShowSolution: HTMLElement = Selector.getButtonShowSolution(questionModel.getId());
        buttonShowSolution.addEventListener("click", function () {
            // QuizController.buttonShowSolutionClicked(questionModel);
            questionModel.getState().buttonShowSolutionClicked();
        });

        let buttonRetry: HTMLElement = Selector.getButtonRetry(questionModel.getId());
        buttonRetry.addEventListener("click", function () {
            // QuizController.buttonRetryClicked(questionModel);
            questionModel.getState().buttonRetryClicked();
        });

    }

}