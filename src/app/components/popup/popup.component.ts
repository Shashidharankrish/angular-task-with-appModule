
import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as GroupActions from '../../store/group/group.action';
import { Group } from '../../store/model/group.model';
import { selectGroups } from '../../store/group/group.selector';
import { Member } from '../../store/model/member.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  groupName: string = '';
  adminName: string = '';
  isModified?: boolean = false;
  mode: GroupDialogMode = GroupDialogMode.Create;
  groups: Group[] = [];
  members: Member[] = [];

  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponent>,
     private store: Store
  ) {
    this.mode = data?.mode || GroupDialogMode.Create;
    const group = data?.group || {};
    if (group) {
      this.groupName = group.name || group.groupName || '';
      this.adminName = group.adminName || '';
       this.members = data?.group?.members || [{ name: '' }];
    }
  }

  addMember(): void {
  this.members = [...this.members, { name: '' }];
}
  closeDialog(): void {
    this.dialogRef.close();
  }

saveGroup(): void {
  if (this.isFormValid()) {
    const groupData: Group = {
      id: this.data?.group?._id,
      groupName: this.groupName,
      adminName: this.adminName,
      members: this.members,
      isModified: this.isModified,
      createdTime: new Date(),
    };

    if (this.mode === GroupDialogMode.Edit) {
  groupData.isModified= true
  this.store.dispatch(GroupActions.updateGroup({ group: groupData }));
} else {
  this.store.dispatch(GroupActions.createGroup({ group: groupData }));
}

    this.dialogRef.close(); 
  } else {
    console.log('Form is not valid. Please fill in all required fields.');
  }
}
 isFormValid(): boolean {
  return !!(
    this.groupName &&
    this.adminName &&
    Array.isArray(this.members) &&
    this.members.every(member => typeof member.name === 'string' && member.name.trim() !== '')
  );
}



 loadGroups(): void {
  this.store.select(selectGroups).subscribe(
    (data) => {
      this.groups = data;
    },
    (error) => {
      console.error('Error fetching groups:', error);
    }
  );
}
  
}

export enum GroupDialogMode {
  Create = 'Create',
  Edit = 'Edit',
}

