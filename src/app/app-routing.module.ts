import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogComponent } from './log/log.component';
import { InboxComponent } from './inbox/inbox.component';
import {CalendarComponent} from './calendar/calendar.component';
import {NextactionComponent} from './nextaction/nextaction.component';
import {RecoveryComponent} from './recovery/recovery.component';
import {WikiComponent} from './wiki/wiki.component';
import {WorktimeComponent} from './worktime/worktime.component';
import {HomeComponent} from './home/home.component';
import {TagsComponent} from './tags/tags.component';
import {InboxDetailComponent} from './inbox-detail/inbox-detail.component';
import {ReferenceComponent} from './reference/reference.component';

const routes: Routes = [
  { path: 'log', component: LogComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'nextaction', component: NextactionComponent },
  { path: 'reference', component: ReferenceComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'worktime', component: WorktimeComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'inbox/:id', component: InboxDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
