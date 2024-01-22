import { createReducer, on } from '@ngrx/store';
import * as GroupActions from './group.action';
import { GroupState } from './group.state';

export const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

export const groupReducer = createReducer(
  initialState,

  on(GroupActions.loadGroups, (state) => ({
    ...state,
    loading: true,
  })),
  on(GroupActions.loadGroupsSuccess, (state, { groups }) => ({
    ...state,
    groups,
    loading: false,
    error: null,
  })),
  on(GroupActions.loadGroupsFailure, (state, { error }) => ({
    ...state,
    groups: [],
    loading: false,
    error,
  })),

  on(GroupActions.createGroupSuccess, state => ({
    ...state,
    error: null,
  })),
  on(GroupActions.createGroupFailure, (state) => ({
    ...state
  })),

  on(GroupActions.deleteGroupSuccess, state => ({
  ...state,
  error: null,
})),
on(GroupActions.deleteGroupFailure, (state, { error }) => ({
  ...state,
  error,
})),
  on(GroupActions.updateGroupSuccess, state => ({
    ...state,
    error: null,
  })),
  on(GroupActions.updateGroupFailure, (state) => ({
    ...state,
    error: null
    
  })),
);
