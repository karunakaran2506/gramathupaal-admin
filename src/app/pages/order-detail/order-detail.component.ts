import { Component, OnInit } from '@angular/core';
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
    private router : Router
  ) { }

  ngOnInit() {
    this.orderdetail = this.apiservice.orderselected;
    console.log(this.orderdetail);
  }

}
