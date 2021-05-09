import { formCreationPageModel } from '../model/model';
import { formCreationPageAction, formCreationPageActionTypes } from '../actions/formCreationPageAction';

const initialState: formCreationPageModel = {
    inBasicDetailsPage: false,
    inEditPage: false,
    inPreviewPage: false
}

export function formcreationPagereducer(state: formCreationPageModel | undefined = initialState, action: formCreationPageAction): formCreationPageModel {
    switch (action.type) {
        case formCreationPageActionTypes.ON_BASIC_DETAILS_PAGE:
            let inBasicDetailsPage: boolean = false;
            if (action.payload !== undefined) {
                inBasicDetailsPage = action.payload;
            }
            return { ...state, inBasicDetailsPage }
        case formCreationPageActionTypes.ON_EDIT_PAGE:
            let inEditPage: boolean = false;
            if (action.payload !== undefined) {
                inEditPage = action.payload;
            }
            return { ...state, inEditPage }
        case formCreationPageActionTypes.ON_PREVIEW_PAGE:
            let inPreviewPage: boolean = false;
            if (action.payload !== undefined) {
                inPreviewPage = action.payload;
            }
            return { ...state, inPreviewPage }
        default:
            return state;
    }


}

