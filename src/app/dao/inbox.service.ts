import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InboxService {
  inbox: string[] = [];

  add(message: string): void  {
    this.inbox.push(message);
  }

  clear(): void {
    this.inbox = [];
  }
}
