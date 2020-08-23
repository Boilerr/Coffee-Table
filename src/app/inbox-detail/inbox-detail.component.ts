import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Inbox} from '../dto/inbox';
import {InboxDaoService} from '../dao/inbox-dao.service';


@Component({
  selector: 'app-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.css']
})
export class InboxDetailComponent implements OnInit {

  @Input() msg: Inbox;

  constructor(
    private route: ActivatedRoute,
    private inboxDaoService: InboxDaoService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getInbox();
  }

  getInbox(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.inboxDaoService.getInbox(id)
      .subscribe(msg => this.msg = msg);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.inboxDaoService.updateInbox(this.msg)
      .subscribe(() => this.goBack());
  }
}
