import { footerButtonActionModel } from '../model/model';
import { footerButtonActions, footerButtonActionTypes } from '../actions/footerButtonAction';

const initialState: footerButtonActionModel = {
    next: false,
    previous: false,
    saveAsDraft: false,
    submit: false
}

export function footerButtonActionReducer(state: footerButtonActionModel | undefined = initialState, action: footerButtonActions): footerButtonActionModel {
    switch (action.type) {
        //CASE FOR CLICK ON NEXT BUTTON IN FOOTER COMPONENT
        case footerButtonActionTypes.CLICK_ON_NEXT:
            let next: boolean = false;
            if (action.payload !== undefined) {
                next = action.payload;
            }
            return { ...state, next }
        //CASE FOR CLICK ON PREVIOUS BUTTON IN FOOTER COMPONENT
        case footerButtonActionTypes.CLICK_ON_PREVIOUS:
            let previous: boolean = false;
            if (action.payload !== undefined) {
                previous = action.payload;
            }
            return { ...state, previous }
        //CASE FOR CLICK ON SAVE AS DRAFT BUTTON IN FOOTER COMPONENT
        case footerButtonActionTypes.CLICK_ON_SAVE_DRAFT:
            let saveAsDraft: boolean = false;
            if (action.payload !== undefined) {
                saveAsDraft = action.payload;
            }
            return { ...state, saveAsDraft }
        //CASE FOR CLICK ON SAVE AS DRAFT BUTTON IN FOOTER COMPONENT
        case footerButtonActionTypes.CLICK_ON_SAVE_SUBMIT:
            let submit: boolean = false;
            if (action.payload !== undefined) {
                submit = action.payload;
            }
            return { ...state, submit }
        default:
            return state;
    }

}