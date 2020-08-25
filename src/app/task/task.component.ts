import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Task} from '../dto/task';
import {TaskDaoService} from '../dao/task-dao.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskDaoService: TaskDaoService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskDaoService.getTask(id)
      .subscribe(hero => this.task = hero);
  }

  goBack(): void {
    this.location.back();
  }

  saveDescription(): void {
    this.taskDaoService.updateTask(this.task)
      .subscribe(() => this.goBack());
  }

  deleteTask(task: Task): void {
    this.taskDaoService.deleteTask(task).subscribe(() => this.goBack());
  }
}
