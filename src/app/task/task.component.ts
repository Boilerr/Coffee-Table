import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Task} from '../dto/task';
import {Tag} from '../dto/tag';
import {TaskDaoService} from '../dao/task-dao.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';

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

  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private route: ActivatedRoute,
    private taskDaoService: TaskDaoService,
    private location: Location
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
    this.getTask();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.fruits.push(event.option.viewValue);
    this.task.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
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

