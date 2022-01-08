import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-ordersbypaymethod',
  templateUrl: './ordersbypaymethod.component.html',
  styleUrls: ['./ordersbypaymethod.component.scss']
})
export class OrdersbypaymethodComponent implements OnInit {

  constructor(
    private apiservice : ApiService,
    private router : Router,
    public dialogRef: MatDialogRef<OrdersbypaymethodComponent>,
    @Inject(MAT_DIALOG_DATA) public orders: Array<any>) { }

  p = 1;
  totalSales = 0.00;

  ngOnInit() {
    let totalSales = 0;
    this.orders.map((x: any) => {
      totalSales = x?.totalamount + totalSales;
    })
    this.totalSales = totalSales;
  }

  viewCustomer(data: any) {
    this.apiservice.customerSelected = data;
    this.dialogRef.close();
    this.router.navigateByUrl('/view-customer');
  }

}
