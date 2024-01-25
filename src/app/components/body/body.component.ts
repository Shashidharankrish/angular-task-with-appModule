import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../../store/model/group.model';
import { Store } from '@ngrx/store';
import * as GroupActions from '../../store/group/group.action';
import { PopupComponent } from '../popup/popup.component';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { EMPTY, Observable, first } from 'rxjs';
import { selectGroups } from '../../store/group/group.selector';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BodyComponent implements OnInit {
 
  groups$: Observable<Group[]>;
  expandedGroup: Group | null = null;
  columnsToDisplay = ['serialNumber', 'name', 'createdTime', 'actions'];
  dataSource: MatTableDataSource<Group>;
  searchTerm: string = '';
  filteredGroups: any[] = [];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor( private dialog: MatDialog, private store: Store) {
    this.groups$ = store.select(selectGroups);
    this.dataSource = new MatTableDataSource<Group>([]);
    this.dataSource.sort = this.sort;
   
  }



ngOnInit(): void {
    this.store.dispatch(GroupActions.loadGroups());
    this.loadGroups();
    this.groups$.pipe(
      first(), 
      switchMap(() => this.groups$) 
    ).subscribe(groups => {
      this.dataSource.data = groups;
       this.dataSource.sort = this.sort;
       if (groups && groups.length > 0) {
          this.expandedGroup = groups[0];
       }
    });
  }



  editGroup(group: any): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '600px',
      data: {
        mode: 'Edit',
        group: group,
        id: group._id,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadGroups();
    });
  }

  copyGroup(group: Group): void {
   
    console.log('Copy group:', group);
  }

  deleteGroup(_id: string) {
  this.store.dispatch(GroupActions.deleteGroup({ _id }));
  this.groups$.pipe(
    first(), 
    switchMap(() => this.groups$) 
  ).subscribe(groups => {
    
  });
}
  
  openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  loadGroups(): void {
    this.groups$.pipe(
      tap(groups => {
         this.dataSource.data = groups;
        this.applySearchFilter();
      }),
      catchError(error => {
        console.error('Error fetching groups:', error);
        return EMPTY;
      })
    ).subscribe();
  }


applySearchFilter(): void {
  this.groups$.pipe(
    tap(groups => {
      this.filteredGroups = groups.filter(group => {
        const groupName = group.groupName || '';
        const createdTime = group.createdTime ? new Date(group.createdTime) : null;
        const searchTermLower = this.searchTerm.toLowerCase();
        const nameMatch = groupName.toLowerCase().includes(searchTermLower);
        const dateMatch = !searchTermLower || (createdTime && createdTime.toDateString().toLowerCase().includes(searchTermLower));
        return nameMatch || dateMatch;
      });
      this.dataSource.data = this.filteredGroups;
      this.dataSource.sort = this.sort; 
    })
  ).subscribe();
}


  

  toggleExpansion(group: Group): void {
  this.expandedGroup = this.expandedGroup === group ? null : group;
}
}
