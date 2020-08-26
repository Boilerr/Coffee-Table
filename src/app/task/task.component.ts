import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Task} from '../dto/task';
import {TaskDaoService} from '../dao/task-dao.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

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

  updateTask(): void {
    this.taskDaoService.updateTask(this.task)
      .subscribe(() => this.goBack());
  }

  deleteTask(task: Task): void {
    this.taskDaoService.deleteTask(task).subscribe(() => this.goBack());
  }

  addT(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.task.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(fruit: string): void {
    const index = this.task.tags.indexOf(fruit);

    if (index >= 0) {
      this.task.tags.splice(index, 1);
    }
  }
}

export interface Fruit {
  name: string;
}
