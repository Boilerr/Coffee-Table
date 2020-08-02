import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LogComponent } from './log/log.component';
import { InboxComponent } from './inbox/inbox.component';
import { NextactionComponent } from './nextaction/nextaction.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WorktimeComponent } from './worktime/worktime.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ProjectsComponent } from './projects/projects.component';
import { WikiComponent } from './wiki/wiki.component';


@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    InboxComponent,
    NextactionComponent,
    CalendarComponent,
    WorktimeComponent,
    RecoveryComponent,
    ProjectsComponent,
    WikiComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
