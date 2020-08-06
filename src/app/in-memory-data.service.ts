import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {
    const reference = [
      { id: 1, message: 'Github token: 219837dshg3242hj65464jk234jjk54645623kjj' },
      { id: 2, message: 'Work email: fof@gamil.com' },
      { id: 3, message: 'Amazon password: root' },
      { id: 4, message: 'Visa gold pin: 1111' },
      { id: 5, message: 'Best superman: aquaman' },
      { id: 6, message: 'Thanos: is right' },
      { id: 7, message: 'PS4: 6.72' },
      { id: 8, message: 'Parser: shutdown' },
      { id: 9, message: 'Best compression in UNIX/Linux: rm -rf /' },
      { id: 10, message: 'Day after tomorrow: overmorrow' }
    ];

    const inbox = [
      {id: 1, timestamp: '09:50:15', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' },
      {id: 2, timestamp: '09:50:15', message: 'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,' },
      {id: 3, timestamp: '09:50:15', message: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' },
      {id: 4, timestamp: '09:50:15', message: 'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse' },
      {id: 5, timestamp: '09:50:15', message: 'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' },
      {id: 6, timestamp: '09:50:15', message: 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      {id: 7, timestamp: '09:50:15', message: 'exercitation ullamco laboris' },
      {id: 8, timestamp: '09:50:15', message: 't, consectetur a' },
      {id: 9, timestamp: '09:50:15', message: 'strud exercitation' },
      {id: 10, timestamp: '09:50:15', message: 'firrst messwerw34age' }
    ];
    return {reference, inbox};
  }
}
