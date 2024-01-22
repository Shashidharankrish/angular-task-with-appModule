import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as GroupActions from '../group/group.action';
import { GroupService } from '../../services/group.service';

@Injectable()
export class GroupEffects {

   loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.loadGroups),
      mergeMap(() =>
        this.groupService.getAllGroups().pipe(
          map((groups) => GroupActions.loadGroupsSuccess({ groups })),
          catchError((error) => {
           const errorMessage = 'Failed to load groups'; 
            return of(GroupActions.loadGroupsFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  createGroup$ = createEffect(() =>
  this.actions$.pipe(
    ofType(GroupActions.createGroup),
    switchMap(action =>
      this.groupService.createGroup(action.group).pipe(
        switchMap(() => [
          GroupActions.createGroupSuccess(),
          GroupActions.loadGroups(), 
        ]),
        catchError(() => of(GroupActions.createGroupFailure()))
      )
    )
  )
);

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.deleteGroup),
      switchMap(action =>
        this.groupService.deleteGroup(action._id).pipe(
          switchMap(() => [
            GroupActions.deleteGroupSuccess(),
            GroupActions.loadGroups() 
          ]),
          catchError(error => of(GroupActions.deleteGroupFailure({ error })))
        )
      )
    )
  );

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.updateGroup),
      switchMap(action =>
        this.groupService.updateGroup(action.group).pipe(
          switchMap(() => [
            GroupActions.updateGroupSuccess(),
            GroupActions.loadGroups(),
          ]),
          catchError((error: Error) => of(GroupActions.updateGroupFailure({ error })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private groupService: GroupService
  ) {}
}
