import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    const inbox = [
      {id: 1, timestamp: '09:50:15', message: 'firrst message' },
      {id: 2, timestamp: '09:50:15', message: 'firrstfdgd message' },
      {id: 3, timestamp: '09:50:15', message: 'firrstdfs message' },
      {id: 4, timestamp: '09:50:15', message: 'firrst3453 message' },
      {id: 5, timestamp: '09:50:15', message: 'firrst message' },
      {id: 6, timestamp: '09:50:15', message: 'firrst wermessage' },
      {id: 7, timestamp: '09:50:15', message: 'firrstwer message' },
      {id: 8, timestamp: '09:50:15', message: 'firrst message' },
      {id: 9, timestamp: '09:50:15', message: 'wer message' },
      {id: 10, timestamp: '09:50:15', message: 'firrst messwerw34age' }
    ];
    return {heroes, inbox};
  }
}
