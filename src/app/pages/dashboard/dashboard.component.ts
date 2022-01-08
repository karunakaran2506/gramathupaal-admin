import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { ChartComponent, ApexChart, ApexNonAxisChartSeries, ApexResponsive } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  info: any;
  todaySales = 0;
  todayOrders = 0;
  totalStores = 0;
  totalcredit : number = 0;
  totalfree : number = 0;
  totalcash : number = 0;
  totalcard : number = 0;
  totalupi : number = 0;
  totaltoken : number = 0;
  totalmilkcard : number = 0;

  @ViewChild("chart", { static: false }) chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  constructor(private apiservice: ApiService) { }

  async ngOnInit() {

    await this.apiservice.overallTodayOrderDetails()
    .subscribe((response: any) => {
      const data = response?.data;
      this.totalcredit = data?.totalcredit;
      this.totalmilkcard = data?.totalmilkcard;
      this.totaltoken = data?.totaltoken;
      this.totalupi = data?.totalupi;
      this.totalcard = data?.totalcard;
      this.totalcash = data?.totalcash;
      this.totalfree = data?.totalfree;

      this.chartOptions = {
        series: [this.totalcash, this.totalcard, this.totalupi, this.totalcredit, this.totalfree, this.totalmilkcard, this.totaltoken],
        chart: {
          width: 500,
          type: "pie"
        },
        labels: ["Cash", "Card", "UPI", "Credit", "Free", "Milkcard", "Token"],
        responsive: [
          {
            breakpoint: 300,
            options: {
              chart: {
                width: 500
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    })

    this.apiservice.dashboarDetails()
      .subscribe((data: any) => {
        this.info = data.data;
        this.todaySales = this.info?.todaySales;
        this.todayOrders = this.info?.todayOrders;
        this.totalStores = this.info?.totalStores;
      })
  }

}
