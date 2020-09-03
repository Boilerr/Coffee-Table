import {Component, Input, OnInit} from '@angular/core';
import {Inbox} from '../dto/inbox';
import {InboxDaoService} from '../dao/inbox-dao.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  inboxes: Inbox[];

  constructor( private inboxDaoService: InboxDaoService, private location: Location) { }

  ngOnInit(): void {
    this.getInbox();
  }

  getInbox(): void {
    this.inboxDaoService.getInboxes()
      .subscribe(inbox => this.inboxes = inbox['content']);
  }

  add(message: string): void {
    message = message.trim();
    if (!message) { return; }
    const inbox = new Inbox(message);
    this.inboxDaoService.addInbox(inbox)
      .subscribe(msg => {
        this.inboxes.push(msg);
      });
  }

  delete(msg: Inbox): void {
    this.inboxes = this.inboxes.filter(h => h !== msg);
    this.inboxDaoService.deleteInbox(msg).subscribe();
  }

  /*updateInbox(id: number, description: string) {
    this.inboxDaoService.updateInbox(this.msg)
      .subscribe(() => this.goBack());

  }*/
  save(msg: Inbox): void {
    this.inboxDaoService.updateInbox(msg)
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  addInbox(): void {
    const inbox = new Inbox('New inbox');
    this.inboxDaoService.addInbox(inbox)
      .subscribe(msg => {
        this.inboxes.push(msg);
      });
  }
}
