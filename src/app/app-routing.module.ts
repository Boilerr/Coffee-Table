import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {InboxComponent} from './inbox/inbox.component';
import {CalendarComponent} from './calendar/calendar.component';
import {NextactionComponent} from './nextaction/nextaction.component';
import {RecoveryComponent} from './recovery/recovery.component';
import {WikiComponent} from './wiki/wiki.component';
import {WorktimeComponent} from './worktime/worktime.component';
import {HomeComponent} from './home/home.component';
import {TagsComponent} from './tags/tags.component';
import {InboxDetailComponent} from './inbox-detail/inbox-detail.component';
import {ReferenceComponent} from './reference/reference.component';
import {ReferenceDetailComponent} from './reference-detail/reference-detail.component';
import {DailyLogComponent} from './daily-log/daily-log.component';
import {ProjectComponent} from './project/project.component';

const routes: Routes = [
  { path: 'dailylog', component: DailyLogComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'nextaction', component: NextactionComponent },
  { path: 'reference', component: ReferenceComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'wiki', component: WikiComponent, children: [{path: 'project/:id', component: ProjectComponent}]},
  { path: 'worktime', component: WorktimeComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'inbox/:id', component: InboxDetailComponent },
  { path: 'reference/:id', component: ReferenceDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
