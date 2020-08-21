import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../dto/project';
import {ActivatedRoute} from '@angular/router';
import {DaoService} from '../dao/dao.service';
import {Location} from '@angular/common';
import {Task} from '../dto/task';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  tasks: Task[];

constructor(
  private route: ActivatedRoute,
  private daoService: DaoService,
  private location: Location
) {
}

ngOnInit(): void {
  this.getTasks();
}

  getTasks(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  console.log(id);
  this.daoService.getTasksByProjectId(id).subscribe(data => this.tasks = data);
}

goBack(): void {
  this.location.back();
}

/*save(): void {
  this.daoService.updateInbox(this.msg)
    .subscribe(() => this.goBack());
}*/
  add(value: string): void {
  }
}
