import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Reference} from '../dto/reference';
import {ReferenceDaoService} from '../dao/reference-dao.service';

@Component({
  selector: 'app-reference-detail',
  templateUrl: './reference-detail.component.html',
  styleUrls: ['./reference-detail.component.css']
})
export class ReferenceDetailComponent implements OnInit {

  @Input() msg: Reference;

  constructor(
    private route: ActivatedRoute,
    private referenceDaoService: ReferenceDaoService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getReference();
  }

  getReference(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.referenceDaoService.getReference(id)
      .subscribe(msg => this.msg = msg);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.referenceDaoService.updateReference(this.msg)
      .subscribe(() => this.goBack());
  }
}
