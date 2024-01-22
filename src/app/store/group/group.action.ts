import { createAction, props } from '@ngrx/store';
import { Group } from '../model/group.model';

export const loadGroups = createAction('[Group] Load Groups');

export const loadGroupsSuccess = createAction(
  '[Group] Load Groups Success',
  props<{ groups: Group[] }>()
);

export const loadGroupsFailure = createAction(
  '[Group] Load Groups Failure',
  props<{ error: any }>()
);
export const toggleGroupExpansion = createAction(
  '[Group] Toggle Group Expansion',
  props<{ group: Group }>()
);
export const toggleGroupExpansionSuccess = createAction('[Group] Toggle Group Success');
export const toggleGroupExpansionFailure = createAction('[Group] Toggle Group Failure');


export const createGroup = createAction('[Group] Create Group', props<{ group: Group }>());
export const createGroupSuccess = createAction('[Group] Create Group Success');
export const createGroupFailure = createAction('[Group] Create Group Failure');

export const updateGroup = createAction('[Group] Update Group', props<{ group: Group }>());
export const updateGroupSuccess = createAction('[Group] Update Group Success');
export const updateGroupFailure = createAction('[Group] Update Group Failure',props<{ error: any }>());;

export const deleteGroup = createAction('[Group] Delete Group', props<{ _id: string }>());
export const deleteGroupSuccess = createAction('[Group] Delete Group Success');
export const deleteGroupFailure = createAction('[Group] Delete Group Failure', props<{ error: any }>());

