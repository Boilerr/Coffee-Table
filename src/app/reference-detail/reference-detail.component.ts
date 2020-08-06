import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DaoService} from '../dao/dao.service';
import {Location} from '@angular/common';
import {Reference} from '../dto/reference';

@Component({
  selector: 'app-reference-detail',
  templateUrl: './reference-detail.component.html',
  styleUrls: ['./reference-detail.component.css']
})
export class ReferenceDetailComponent implements OnInit {

  @Input() msg: Reference;

  constructor(
    private route: ActivatedRoute,
    private daoService: DaoService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getReference();
  }

  getReference(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.daoService.getReference(id)
      .subscribe(msg => this.msg = msg);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.daoService.updateReference(this.msg)
      .subscribe(() => this.goBack());
  }
}
