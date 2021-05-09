import { basicDetailsModel } from '../model/model';
import { basicDetailsActionTypes, basicDetailsAction } from '../actions/basicDetailsAction';

const initialState: basicDetailsModel = {
    formName: '',
    description: '',
    searchKeywords: [],
    createNew: true,
    createFromPreset: false
};

export function basicDetailsReducer(state: basicDetailsModel | undefined = initialState, action: basicDetailsAction): basicDetailsModel {
    let basicDetails = {};
    switch (action.type) {
        case basicDetailsActionTypes.ADD_BASIC_DETAILS:
            return { ...state, ...action.payload }
        default:
            return state;
    }

}
