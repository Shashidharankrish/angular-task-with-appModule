import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { HeaderComponent } from './components/header/header.component';
import { PopupComponent } from './components/popup/popup.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GroupEffects } from './store/group/group.effect';
import { Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { groupReducer } from './store/group/group.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    PopupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatTableModule,
    CommonModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    EffectsModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('group', groupReducer),
    EffectsModule.forRoot([GroupEffects]),
    AppRoutingModule,
    BrowserAnimationsModule,MatSortModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
