import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {InboxComponent} from './inbox/inbox.component';
import {CalendarComponent} from './calendar/calendar.component';
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
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {TaskComponent} from './task/task.component';

const routes: Routes = [
  { path: 'dailylog', component: DailyLogComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'projects', component: ProjectComponent},
  { path: 'projects/:id/tasks', component: ProjectDetailComponent},
  { path: 'tasks/:id', component: TaskComponent},
  { path: 'reference', component: ReferenceComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'wiki', component: WikiComponent} ,
  { path: 'worktime', component: WorktimeComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'inbox/:id', component: InboxDetailComponent },
  { path: 'reference/:id', component: ReferenceDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
