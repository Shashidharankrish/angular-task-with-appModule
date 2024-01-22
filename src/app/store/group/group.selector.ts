import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupState } from './group.state';

export const selectGroupState = createFeatureSelector<GroupState>('group');

export const selectGroups = createSelector(
  selectGroupState,
  (state: GroupState) => state.groups
);
