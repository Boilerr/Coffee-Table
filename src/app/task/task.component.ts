import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DaoService} from '../dao/dao.service';
import {Location} from '@angular/common';
import {Task} from '../dto/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  constructor(
    private route: ActivatedRoute,
    private daoService: DaoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const tid = +this.route.snapshot.paramMap.get('tid');
    console.log('getTask' + id);
    console.log('getTask t' + tid);
    this.daoService.getTask(id)
      .subscribe(hero => this.task = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.daoService.updateTask(this.task)
      .subscribe(() => this.goBack());
  }

  deleteTask(task: Task): void {
    // this.task = this.task.filter(h => h !== task);
    this.daoService.deleteTask(task).subscribe(() => this.goBack());
  }
}
