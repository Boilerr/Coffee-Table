import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InboxComponent } from './inbox/inbox.component';
import { NextactionComponent } from './nextaction/nextaction.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WorktimeComponent } from './worktime/worktime.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { WikiComponent } from './wiki/wiki.component';
import { HomeComponent } from './home/home.component';
import { TagsComponent } from './tags/tags.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { HttpClientModule } from '@angular/common/http';
import { InboxDetailComponent } from './inbox-detail/inbox-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReferenceComponent } from './reference/reference.component';
import { ReferenceDetailComponent } from './reference-detail/reference-detail.component';
import { DailyLogComponent } from './daily-log/daily-log.component';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    NextactionComponent,
    CalendarComponent,
    WorktimeComponent,
    RecoveryComponent,
    TagsComponent,
    WikiComponent,
    HomeComponent,
    InboxDetailComponent,
    ReferenceComponent,
    ReferenceDetailComponent,
    DailyLogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule,
    AppRoutingModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
