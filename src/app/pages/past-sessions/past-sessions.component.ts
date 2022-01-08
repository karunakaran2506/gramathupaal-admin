import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-past-sessions',
  templateUrl: './past-sessions.component.html',
  styleUrls: ['./past-sessions.component.scss']
})
export class PastSessionsComponent implements OnInit {

  user: any;
  dateSelected: Date = new Date();
  orders: Array<any> = [];
  totalamount = 0;
  session: any;
  store: any;

  constructor(private apiservice: ApiService) { }

  ngOnInit() {

    this.user = this.apiservice.userSelected;

    let data = {
      user: this.user?._id
    }

    this.apiservice.viewUserDetails(data)
      .subscribe((data: any) => {
        this.user = data?.user;
        this.session = data?.session;
        this.store = this.user?.store;
      })
    this.getValue();
  }

  datechange(value) {
    this.dateSelected = value;
    this.getValue();
  }

  getValue() {
    let payload = {
      user: this.user._id,
      date: this.dateSelected
    }

    this.apiservice.viewUserPastSessions(payload)
      .subscribe((data: any) => {
        this.session = data?.session;
      })
  }

}
