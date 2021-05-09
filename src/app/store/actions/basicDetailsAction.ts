import { Action } from '@ngrx/store';
export enum basicDetailsActionTypes {
    ADD_BASIC_DETAILS = 'ADD_BASIC_DETAILS'
};

export class addBasicDetails implements Action {
    readonly type = basicDetailsActionTypes.ADD_BASIC_DETAILS
    constructor(public payload: any) {
        console.log(payload);
    }
}

export type basicDetailsAction = addBasicDetails