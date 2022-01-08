import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  menuitems = [];
  
  orderdetail : any;

  constructor(
    private apiservice : ApiService,
    private router : Router,
    public dialogRef: MatDialogRef<OrderDetailComponent>,
  ) { }

  ngOnInit() {
    this.orderdetail = this.apiservice.orderselected;
  }

  viewCustomer(data: any) {
    this.apiservice.customerSelected = data;
    this.dialogRef.close();
    this.router.navigateByUrl('/view-customer');
  }

}
