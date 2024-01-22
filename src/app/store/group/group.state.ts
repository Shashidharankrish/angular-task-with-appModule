import { Group } from '../model/group.model';

export interface GroupState {
  groups: Group[];
  loading: boolean;
  error: any;
}