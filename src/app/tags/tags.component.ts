import { Component, OnInit } from '@angular/core';
import {Task} from '../dto/task';
import {TaskDaoService} from '../dao/task-dao.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tasksByTag: Task[];

  constructor(private taskDaoService: TaskDaoService) {
  }

  ngOnInit(): void {
  }

  showTag(value: string): void {
    if (value.length < 2 || value.length > 50){
      return;
    }
    value = value.trim();
    if (!value) {
      return;
    }
    this.taskDaoService.getTasksByTag(value).subscribe(data => this.tasksByTag = data);

  }
}
