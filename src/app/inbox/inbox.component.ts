import {Component, OnInit} from '@angular/core';
import {Inbox} from '../dto/inbox';
import {DaoService} from '../dao/dao.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  inboxes: Inbox[];

  constructor(private daoService: DaoService) { }

  ngOnInit(): void {
    this.getInbox();
  }

  getInbox(): void {
    this.daoService.getInboxes()
      .subscribe(inbox => this.inboxes = inbox['content']);
  }

  add(message: string): void {
    message = message.trim();
    if (!message) { return; }
    const inbox = new Inbox(message);
    this.daoService.addInbox(inbox)
      .subscribe(msg => {
        this.inboxes.push(msg);
      });
  }

  delete(msg: Inbox): void {
    this.inboxes = this.inboxes.filter(h => h !== msg);
    this.daoService.deleteInbox(msg).subscribe();
  }

}
