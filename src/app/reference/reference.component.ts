import { Component, OnInit } from '@angular/core';
import {DaoService} from '../dao/dao.service';
import {Reference} from '../dto/reference';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {
  references: Reference[];

  constructor(private daoService: DaoService) { }

  ngOnInit(): void {
    this.getReference();
  }

  getReference(): void {
    this.daoService.getReferences()
      .subscribe(reference => this.references = reference['content']);
  }

  add(message: string): void {
    message = message.trim();
    if (!message) { return; }
    const reference = new Reference(message);
    this.daoService.addReference(reference)
      .subscribe(msg => {
        this.references.push(msg);
      });
  }

  delete(msg: Reference): void {
    this.references = this.references.filter(h => h !== msg);
    this.daoService.deleteReference(msg).subscribe();
  }
}
