import { Component, OnInit } from '@angular/core';
import {DaoService} from '../dao/dao.service';
import {Reference} from '../dto/reference';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {
  reference: Reference[];

  constructor(private daoService: DaoService) { }

  ngOnInit(): void {
    this.getReference();
  }

  getReference(): void {
    this.daoService.getReferences()
      .subscribe(reference => this.reference = reference);
  }

  add(message: string): void {
    message = message.trim();
    if (!message) { return; }
    this.daoService.addReference({ message } as Reference) // Black magic of TS, Probably create new Inbox and fill message with string
      .subscribe(msg => {
        this.reference.push(msg);
      });
  }

  delete(msg: Reference): void {
    this.reference = this.reference.filter(h => h !== msg);
    this.daoService.deleteReference(msg).subscribe();
  }

}
