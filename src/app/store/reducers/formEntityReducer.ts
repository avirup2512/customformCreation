import { formEntity, formEntityListModel, formEntityModel, groupListModel } from '../model/model';
import { formEntityAction, formEntityActionTypes } from '../actions/formEntityAction'
const formEntityList: formEntityListModel = {
    group: {
        listingText: 'Create group', properties: {}, hasFooterButton: false, isGroup: true, entityType: 'group', hint: false, required: false, responseValidation: false, description: false
    },
    textField: {
        listingText: 'Text field', properties: {}, hasFooterButton: true,
        footerButtonList: ['Required', 'Description', 'Hint text', 'Response validation'], isGroup: false, entityType: 'textField', hint: true, required: false, responseValidation: false, description: false, valid: false, touched: false
    },
    textArea: {
        listingText: 'Text area', properties: {}, hasFooterButton: true,
        footerButtonList: ['Required', 'Description', 'Hint text', 'Response validation'], isGroup: false, entityType: 'textArea', hint: false, required: false, responseValidation: false, description: false, valid: false, touched: false
    },
    dateField: {
        listingText: 'Date field', properties: {}, hasFooterButton: true,
        footerButtonList: ['Required', 'Description', 'Hint text', 'Response validation'], isGroup: false, entityType: 'dateField', hint: false, required: false, responseValidation: false, description: false, valid: false, touched: false
    },
    dropDown: {
        listingText: 'Dropdown', properties: {}, hasFooterButton: true,
        footerButtonList: ['Required', 'Description', 'Hint text', 'Response validation'], isGroup: false, entityType: 'dropdown', hint: false, required: false, responseValidation: false, description: false, valueType: "static", selectType
            : "single", url: '', dropDownOptions: [], valid: false, touched: false
    },
    button: {
        listingText: 'Button', properties: {}, hasFooterButton: true,
        footerButtonList: ['Required', 'Description', 'Hint text', 'Response validation'], isGroup: false, entityType: 'button', hint: false, required: false, responseValidation: false, description: false
    }
};
function idGenerator(min: any, max: any) {
    let id = Math.random() * (max - min) + min + new Date();
    return id;
}

const intialGroup: groupListModel = {
    groupName: "Group 1",
    group: []
}

const initialState: formEntityModel = {
    formEntityList,
    currentFormentityList: [intialGroup]
}

export function formEntityReducer(state: formEntityModel | undefined = initialState, action: formEntityAction): formEntityModel {
    let currentFormentityList: Array<any> = [];
    state.currentFormentityList.forEach((e: any) => {
        let group: any = {};
        group.group = [];
        group.groupName = e.groupName;
        e.group.forEach((g: any) => {
            group.group.push(g);
        })
        currentFormentityList.push(group);
    });
    let group: Array<any> = [];
    switch (action.type) {
        case formEntityActionTypes.ADD_ENTITY:
            if (action.payload !== undefined) {
                currentFormentityList[currentFormentityList.length - 1].group.push(Object.assign({}, action.payload, { entityId: idGenerator(1, 5) }))
            };
            return { ...state, currentFormentityList }
        case formEntityActionTypes.ADD_GROUP:
            if (action.payload !== undefined) {
                currentFormentityList.push(action.payload);
            };
            return { ...state, currentFormentityList }
        case formEntityActionTypes.EDIT_GROUP_NAME:
            currentFormentityList.forEach((e: any, i: any) => {
                if (action.payload.groupIndex == i) {
                    e.groupName = action.payload.groupName
                }
            });
            return { ...state, currentFormentityList };
        case formEntityActionTypes.REMOVE_GROUP:
            if (action.payload !== undefined) {
                currentFormentityList = currentFormentityList.filter((e: any, i: any) => {
                    return i !== action.payload;
                })
            }
            return { ...state, currentFormentityList }
        case formEntityActionTypes.REMOVE_ENTITY:
            if (action.payload !== undefined) {
                currentFormentityList.forEach((e: any, i: any) => {
                    if (i == action.payload.groupIndex && e.group.length > 0) {
                        e.group = e.group.filter((g: any, j: any) => {
                            return j !== action.payload.entityIndex;
                        })
                    }
                })
            };
            return { ...state, currentFormentityList }
        case formEntityActionTypes.MOVE_ENTITY:
            currentFormentityList.forEach((e: any, i: any) => {
                if (i == action.payload.dragStartGroupIndex) {
                    if (action.payload.dragStartGroupIndex == action.payload.dropGroupIndex) {
                        e.group.splice(action.payload.entityCurrentIndex, 0, e.group.splice(action.payload.entityPreviousIndex, 1)[0]);
                    } else {
                        currentFormentityList[action.payload.dropGroupIndex].group.splice(action.payload.entityCurrentIndex, 0, currentFormentityList[action.payload.dragStartGroupIndex].group[action.payload.entityPreviousIndex]);
                        currentFormentityList[action.payload.dragStartGroupIndex].group.splice(action.payload.entityPreviousIndex, 1)
                    }
                }
            })
            return { ...state, currentFormentityList }
        case formEntityActionTypes.EDIT_ENTITY:
            currentFormentityList.forEach((e: any, i) => {
                e.groupName = action.payload.groupArray[i].groupName
                e.group = e.group.map((g: any, j: any) => {
                    return { ...g, ...action.payload.groupArray[i].groupArray[j] }
                });
            })
            return { ...state, currentFormentityList }
        case formEntityActionTypes.COPY_ENTITY:
            if (action.payload !== undefined) {
                let sourceObject: Object = {}
                currentFormentityList.forEach((e: any, i: any) => {
                    if (i == action.payload.groupIndex && e.group.length > 0) {
                        e.group.forEach((g: any, j: any) => {
                            if (j == action.payload.entityIndex) {
                                sourceObject = g;
                            };
                        });
                        e.group.push(sourceObject)
                    }
                });
            };
            return { ...state, currentFormentityList };
        case formEntityActionTypes.MAKE_ENTITY_TOUCHED:
            currentFormentityList.forEach((e: any, i) => {
                e.group = e.group.map((g: any, j: any) => {
                    let newGroup = Object.assign({}, g, { touched: true });
                    return newGroup
                });
            });
            console.log(currentFormentityList);

            return { ...state, currentFormentityList }
        case formEntityActionTypes.SESSION_EXPIRED:
            state = initialState
            return { ...state }
        default:
            return state;
    }
}

