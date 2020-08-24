export class Dailylog {
  id: number; // only for test, inmemory db need id! remove when change to real db
  timestamp: Date;
  from: string;
  category: string;
  message: string;


  constructor(timestamp: Date, from: string, category: string, message: string) {
    this.timestamp = timestamp;
    this.from = from;
    this.category = category;
    this.message = message;
  }
}
