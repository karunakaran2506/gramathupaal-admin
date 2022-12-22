import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-cowmilkentry',
  templateUrl: './view-cowmilkentry.component.html',
  styleUrls: ['./view-cowmilkentry.component.scss'],
})
export class ViewCowmilkentryComponent implements OnInit {

  cowmilk: Array<any> = [];
  dateSelected: Date = new Date();
  p = 1;
  totalQuantity: Number = 0;

  constructor(private apiservice: ApiService) {}

  ngOnInit() {
    this.cowmilk = this.apiservice?.cowSelected?.cowmilk;
    this.datechange(this.dateSelected);
  }

  datechange(value: Date) {
    this.dateSelected = value;

    this.apiservice
      .viewCowMilkEntrybyDate({ date: value, cow: this.apiservice?.cowSelected?._id })
      .subscribe((data: any) => {
        this.cowmilk = data.milkentry;
        let totalQuantity = 0;
        this.cowmilk.map((x:any) => {
          totalQuantity = totalQuantity + x.quantity;
        })
        this.totalQuantity = totalQuantity;
      });
  }
}
