import {Component, OnInit} from '@angular/core';
import {Inbox} from '../dto/inbox';
import {DaoService} from '../dao/dao.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  inbox: Inbox[];

  constructor(private daoService: DaoService) { }

  ngOnInit(): void {
    this.getInbox();
  }

  getInbox(): void {
    this.daoService.getInboxes()
      .subscribe(inbox => this.inbox = inbox);
  }

  add(message: string): void {
    message = message.trim();
    if (!message) { return; }
    this.daoService.addInbox({ message } as Inbox) // Black magic of TS, Probably create new Inbox and fill message with string
      .subscribe(msg => {
        this.inbox.push(msg);
      });
  }

  delete(msg: Inbox): void {
    this.inbox = this.inbox.filter(h => h !== msg);
    this.daoService.deleteInbox(msg).subscribe();
  }

}
