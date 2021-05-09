import { ActionReducerMap } from '@ngrx/store';
import { footerButtonActionReducer } from './footerButtonActionReducer';
import { footerButtonActionModel, formCreationPageModel, formEntityModel, basicDetailsModel } from '../model/model';
import { formcreationPagereducer } from './formCreationPageReducer';
import { formEntityReducer } from './formEntityReducer';
import { basicDetailsReducer } from './basicDetailsReducer'
export const rootReducer = {};

export interface AppState {
    buttonActionState: footerButtonActionModel;
    formCreationPage: formCreationPageModel;
    formEntityState: formEntityModel;
    basicDetailsState: basicDetailsModel
};


export const reducers: ActionReducerMap<AppState, any> = {
    buttonActionState: footerButtonActionReducer,
    formCreationPage: formcreationPagereducer,
    formEntityState: formEntityReducer,
    basicDetailsState: basicDetailsReducer
};