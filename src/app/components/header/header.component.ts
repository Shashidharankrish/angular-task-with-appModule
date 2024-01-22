
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { selectGroups } from '../../store/group/group.selector';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo = { name: 'Shashidharan', email: 'shashidharankrish@gmail.com', photo: 'favicon.ico' };
  isDropdownOpen: Boolean = false;
  totalGroupsCreated: number = 0;
  totalGroupsUpdated: number = 0;

  constructor(private store: Store ) {
    
  
  
  }

 ngOnInit(): void {
    this.store.select(selectGroups).pipe(
      tap(groups => {
        this.totalGroupsCreated = groups.length;
        this.totalGroupsUpdated = groups.filter(group => group.isModified).length;
      })
    ).subscribe();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
