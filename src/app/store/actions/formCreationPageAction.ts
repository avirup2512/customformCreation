import { Action } from '@ngrx/store';

export enum formCreationPageActionTypes {
    ON_BASIC_DETAILS_PAGE = 'ON_BASIC_DETAILS_PAGE',
    ON_EDIT_PAGE = 'ON_EDIT_PAGE',
    ON_PREVIEW_PAGE = "ON_PREVIEW_PAGE"
};
export class onBasicDetailsPage implements Action {
    readonly type = formCreationPageActionTypes.ON_BASIC_DETAILS_PAGE
    constructor(public payload: any) { }
}

export class onEditPage implements Action {
    readonly type = formCreationPageActionTypes.ON_EDIT_PAGE
    constructor(public payload: any) {
    }
}

export class onPreviwePage implements Action {
    readonly type = formCreationPageActionTypes.ON_PREVIEW_PAGE
    constructor(public payload: any) { }
};

export type formCreationPageAction = onBasicDetailsPage | onEditPage | onPreviwePage;