import {Component, OnInit} from '@angular/core';
import {Task} from '../dto/task';
import {TaskDaoService} from '../dao/task-dao.service';
import {Tag} from '../dto/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tasksByTag: Task[];
  pTags: Tag[] = [
    {name: 'Interview'},
    {name: 'Other'},
    {name: 'Work'},
    {name: 'Recovery'},
    {name: '5min'},
    {name: 'Cooking'},
    {name: 'Home'},
    {name: 'Apartment Improvement'},
    {name: 'Book'},
    {name: 'Interesting'},
    {name: 'Programming'},
    {name: 'Archive'}
  ];

  constructor(private taskDaoService: TaskDaoService) {
  }

  ngOnInit(): void {
  }

  showTag(value: string): void {
    if (value.length < 2 || value.length > 50) {
      return;
    }
    value = value.trim();
    if (!value) {
      return;
    }
    this.taskDaoService.getTasksByTag(value).subscribe(data => this.tasksByTag = data);
  }

  showTasksByTag(value: string): void {
    if (value.length < 2 || value.length > 50) {
      return;
    }
    value = value.trim();
    if (!value) {
      return;
    }
    this.taskDaoService.getTasksByTag(value).subscribe(data => this.tasksByTag = data);
  }
}
