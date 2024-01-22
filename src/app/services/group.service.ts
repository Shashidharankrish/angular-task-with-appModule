import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { environment } from '../../environment';
import { Group } from '../store/model/group.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getAllGroups(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/groups');
  }

  createGroup(group: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/groups', group).pipe(
    tap(() => this.openSnackBar('Group created successfully')),
    catchError(() => {
      this.openSnackBar('Failed to create group');
      return EMPTY;
    })
  );
  }

  updateGroup(group: any): Observable<any> {
  return this.http.put<any>(this.apiUrl + '/groups/' + group.id, group).pipe(
    tap(() => this.openSnackBar('Group updated successfully')),
    catchError(() => {
      this.openSnackBar('Failed to update group');
      return EMPTY;
    })
  );
}

  deleteGroup(id: string) {
    return this.http.delete<any>(this.apiUrl + '/groups/' + id).pipe(
    tap(() => this.openSnackBar('Group deleted successfully')),
    catchError(() => {
      this.openSnackBar('Failed to delete group');
      return EMPTY;
    })
  );
  }

  getTotalGroups(): Observable<any> {
    return this.getAllGroups().pipe(
      map((groups) => ({
        totalGroupsCreated: groups.length,
        totalGroupsUpdated: groups.filter((group: Group) => group.isModified).length,
      }))
    );
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
       horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: ['custom-snackbar']
    });
  }
  

}
