import { Component, OnInit } from '@angular/core';
import {Reference} from '../dto/reference';
import {ReferenceDaoService} from '../dao/reference-dao.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {
  references: Reference[];

  constructor(private referenceDaoService: ReferenceDaoService) { }

  ngOnInit(): void {
    this.getReference();
  }

  getReference(): void {
    this.referenceDaoService.getReferences()
      .subscribe(reference => this.references = reference['content']);
  }

  add(message: string): void {
    message = message.trim();
    if (!message) { return; }
    const reference = new Reference(message);
    this.referenceDaoService.addReference(reference)
      .subscribe(msg => {
        this.references.push(msg);
      });
  }

  delete(msg: Reference): void {
    this.references = this.references.filter(h => h !== msg);
    this.referenceDaoService.deleteReference(msg).subscribe();
  }
}
