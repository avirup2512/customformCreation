import { Action } from '@ngrx/store';

// ACTION TYPE FOR BUTTON FUNCTIONALITY OF FOOTER COMPONENT
export enum footerButtonActionTypes {
    CLICK_ON_NEXT = 'CLICK_ON_NEXT',
    CLICK_ON_PREVIOUS = 'CLICK_ON_PREVIOUS',
    CLICK_ON_SAVE_DRAFT = "CLICK_ON_SAVE_DRAFT",
    CLICK_ON_SAVE_SUBMIT = "CLICK_ON_SAVE_SUBMIT"
};
// ACTIONS TYPE FOR BUTTON FUNCTIONALITY OF FOOTER COMPONENT
export class clickOnNext implements Action {
    readonly type = footerButtonActionTypes.CLICK_ON_NEXT
    constructor(public payload: any) {
    }
}

export class clickOnPrevious implements Action {
    readonly type = footerButtonActionTypes.CLICK_ON_PREVIOUS
    constructor(public payload: any) {
    }
}

export class clickOnSaveDraft implements Action {
    readonly type = footerButtonActionTypes.CLICK_ON_SAVE_DRAFT
    constructor(public payload: any) { }
};
export class clickOnSubmit implements Action {
    readonly type = footerButtonActionTypes.CLICK_ON_SAVE_SUBMIT
    constructor(public payload: any) { }
};

export type footerButtonActions = clickOnNext | clickOnPrevious | clickOnSaveDraft | clickOnSubmit