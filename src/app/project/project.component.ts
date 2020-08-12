import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  id: number;
  panelOpenState = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
  }
}
