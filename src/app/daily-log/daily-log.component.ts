import {Component, OnInit} from '@angular/core';
import {Dailylog} from '../dto/dailylog';
import {DaoService} from '../dao/dao.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.css']
})
export class DailyLogComponent implements OnInit {
  timenow: number = Date.now();
  dailylog: Dailylog[];
  myGroup: any;

  constructor(private daoService: DaoService, formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getDailylog();
    this.myGroup = new FormGroup({ // compiler needed, wtf is this?!
      firstName: new FormControl()
    });
  }

  getDailylog(): void {
    this.daoService.getDailylog()
      .subscribe(dailylog => this.dailylog = dailylog);
  }

  add3(timestamp: string, category: string, message: string): void {
    message = message.trim();
    category = category.trim();
    if (!message) {
      return;
    }
    const dl = new Dailylog(new Date(timestamp), 'Webclient', category, message);

    this.daoService.addDailylog(dl) // Black magic of TS, Probably create new Inbox and fill message with string
      .subscribe(msg => {
        this.dailylog.push(msg);
      });
  }

  add(category: string, message: string): void {
    message = message.trim();
    if (!message) {
      return;
    }
    const dl = new Dailylog(new Date(), 'Webclient', category, message);

    this.daoService.addDailylog(dl) // Black magic of TS, Probably create new Inbox and fill message with string
      .subscribe(msg => {
        this.dailylog.push(msg);
      });
  }
}
