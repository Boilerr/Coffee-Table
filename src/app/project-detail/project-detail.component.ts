import {Component, OnInit} from '@angular/core';
import {Project} from '../dto/project';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Task} from '../dto/task';
import {ProjectDaoService} from '../dao/project-dao.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  tasks: Task[];
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectDaoService: ProjectDaoService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getTasks();
    this.getProject();
  }

  getTasks(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.projectDaoService.getTasksByProjectId(id).subscribe(data => this.tasks = data);
  }

  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('getTask' + id);
    this.projectDaoService.getProject(id)
      .subscribe(hero => this.project = hero);
  }

  goBack(): void {
    this.location.back();
  }

  addTask(taskText: string): void {
    if (taskText.length < 3 || taskText.length > 100){
      return;
    }
    taskText = taskText.trim();
    if (!taskText) {
      return;
    }
    const id = +this.route.snapshot.paramMap.get('id');
    const task = new Task(taskText, '');
    this.projectDaoService.addTaskByProjectId(task, id)
      .subscribe(msg => {
        this.tasks.push(msg);
      });
  }

  saveTitle(): void {
    this.projectDaoService.updateProject(this.project)
      .subscribe(() => this.goBack());
  }

  saveDescription(): void {
    this.projectDaoService.updateProject(this.project)
      .subscribe(() => this.goBack());
  }

  deleteProject(project: Project): void {
    this.projectDaoService.deleteProject(project).subscribe(() => this.goBack());
  }
}
