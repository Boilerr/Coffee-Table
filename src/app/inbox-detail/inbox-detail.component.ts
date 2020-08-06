import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DaoService} from '../dao/dao.service';
import { Location } from '@angular/common';
import {Inbox} from '../dto/inbox';


@Component({
  selector: 'app-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.css']
})
export class InboxDetailComponent implements OnInit {

@Input() msg: Inbox;

constructor(
  private route: ActivatedRoute,
  private daoService: DaoService,
  private location: Location
) {}

ngOnInit(): void {
  this.getInbox();
}

getInbox(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.daoService.getInbox(id)
    .subscribe(msg => this.msg = msg);
}

goBack(): void {
  this.location.back();
}

save(): void {
  this.daoService.updateInbox(this.msg)
    .subscribe(() => this.goBack());
}
}
