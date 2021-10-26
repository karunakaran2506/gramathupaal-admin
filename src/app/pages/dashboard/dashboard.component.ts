import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  salesinfo: any;
  todayordercount = 0;
  todaycashtotal = 0;
  todayonlinetotal = 0;
  todaytotalsales = 0;
  permissions: any;

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
