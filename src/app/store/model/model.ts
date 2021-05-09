export interface footerButtonActionModel {
    next: boolean,
    previous: boolean,
    saveAsDraft: boolean,
    submit: boolean
}

export interface formCreationPageModel {
    inBasicDetailsPage: boolean,
    inEditPage: boolean,
    inPreviewPage: boolean
}

export interface formEntityModel {
    formEntityList: formEntityListModel,
    currentFormentityList: Array<groupListModel>
}

export interface basicDetailsModel {
    formName: String,
    description: String
    searchKeywords: Array<any>,
    createNew: boolean,
    createFromPreset: boolean
}

export interface formEntityListModel {
    group: formEntity,
    textField: formEntity,
    textArea: formEntity,
    dateField: formEntity,
    dropDown: formEntity,
    button: formEntity
}

export interface formEntity {
    listingText?: string,
    name?: String,
    label?: String,
    entityType: String,
    isGroup?: boolean,
    properties?: Object,
    hasFooterButton?: boolean,
    hint: boolean;
    hintText?: boolean,
    required?: boolean,
    responseValidation?: boolean,
    description?: boolean,
    footerButtonList?: Array<any>,
    responseValidationText?: String
    descriptionText?: String,
    valueType?: String,
    selectType?: String,
    url?: String,
    dropDownOptions?: Array<any>,
    valid?: boolean,
    touched?: boolean
}
export interface groupListModel {
    groupId?: String,
    groupName: string,
    group: Array<any>
}
