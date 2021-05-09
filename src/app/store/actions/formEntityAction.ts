
import { Action } from '@ngrx/store';

export enum formEntityActionTypes {
    ADD_ENTITY = 'ADD_ENTITY',
    REMOVE_ENTITY = 'REMOVE_ENTITY',
    MOVE_ENTITY = "MOVE_ENTITY",
    ADD_GROUP = 'ADD_GROUP',
    EDIT_GROUP_NAME = "EDIT_GROUP_NAME",
    EDIT_ENTITY = "EDIT_ENTITY",
    MAKE_ENTITY_TOUCHED = "MAKE_ENTITY_TOUCHED",
    COPY_ENTITY = "COPY_ENTITY",
    REMOVE_GROUP = "REMOVE_GROUP",
    SESSION_EXPIRED = "SESSION_EXPIRED"
};

export class editGroupName implements Action {
    readonly type = formEntityActionTypes.EDIT_GROUP_NAME
    constructor(public payload: any) { }
}
export class removeGroup implements Action {
    readonly type = formEntityActionTypes.REMOVE_GROUP
    constructor(public payload: any) { }
}

export class addGroup implements Action {
    readonly type = formEntityActionTypes.ADD_GROUP
    constructor(public payload: any) { }
}
export class addEntity implements Action {
    readonly type = formEntityActionTypes.ADD_ENTITY
    constructor(public payload: any) { }
}

export class removeEntity implements Action {
    readonly type = formEntityActionTypes.REMOVE_ENTITY
    constructor(public payload: any) {
    }
}

export class moveEntity implements Action {
    readonly type = formEntityActionTypes.MOVE_ENTITY
    constructor(public payload: any) {
    }
}
export class editEntity implements Action {
    readonly type = formEntityActionTypes.EDIT_ENTITY
    constructor(public payload: any) {
    }
}
export class copyEntity implements Action {
    readonly type = formEntityActionTypes.COPY_ENTITY
    constructor(public payload: any) {
    }
}
export class touchedEntity implements Action {
    readonly type = formEntityActionTypes.MAKE_ENTITY_TOUCHED
    constructor(public payload: any) {
    }
};
export class sessionExpired implements Action {
    readonly type = formEntityActionTypes.SESSION_EXPIRED
    constructor(public payload: any) {
    }
}
export type formEntityAction = addEntity | removeEntity | moveEntity | addGroup | editGroupName |
    removeGroup | editEntity | copyEntity | touchedEntity | sessionExpired