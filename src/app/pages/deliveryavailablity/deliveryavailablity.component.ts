import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-deliveryavailablity',
  templateUrl: './deliveryavailablity.component.html',
  styleUrls: ['./deliveryavailablity.component.scss']
})
export class DeliveryavailablityComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  deliveryAvailablity: FormGroup;
  storeSelected: string;
  customerSelected : any;
  stores: Array<any>;
  customer: Array<any>;
  customerorders: Array<any>;
  entrydate = new Date();

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.deliveryAvailablity = new FormGroup({
      store: new FormControl(''),
      customer: new FormControl(''),
      comments: new FormControl(''),
      subscriptionpackorder: new FormControl(),
      availablity: new FormControl(false),
      entrydate: new FormControl(this.entrydate),
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]?._id;
        this.stores = data?.stores;
        this.changeValue(this.storeSelected);
      })
  }

  changeValue(value:any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }

    this.apiservice.viewCustomerbyStore(this.storeSelected)
      .subscribe((data: any) => {
        this.customer = data?.customer;
      })
  }

  changeCustomer(value: any) {
    this.customerSelected = value;
    let data = {
      customer: this.customerSelected
    }

    this.apiservice.listSubscriptionorderbyCustomer(data)
     .subscribe((data:any) => {
       this.customerorders = data?.order;
     })
  }

  onSubmit(value: any) {
    if (this.deliveryAvailablity.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {

      this.apiservice.createDeliveryavailablity(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.toastr.success(data.message);
            this.oncancel();
          }
          else {
            this.toastr.error(data.message);
          }
        })
    }
  }

  oncancel() {
    this.formGroupDirective.resetForm();
  }
}