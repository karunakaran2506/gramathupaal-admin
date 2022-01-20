import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-subscriptionorder',
  templateUrl: './add-subscriptionorder.component.html',
  styleUrls: ['./add-subscriptionorder.component.scss']
})
export class AddSubscriptionorderComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addSubscriptionorder: FormGroup;
  storeSelected: string;
  packSelected: string;
  customerSelected: string;
  customer: Array<any>;
  deliveryman: Array<any>;
  customeraddress: Array<any>;
  subscriptionpack: Array<any>;
  stores: Array<any>;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.apiservice.listSubscriptionpack()
     .subscribe((data:any)=>{
       this.subscriptionpack = data.subscriptionpack;
     })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]?._id;
        this.stores = data?.stores;
        this.changeValue(this.storeSelected);
      })

    this.addSubscriptionorder = new FormGroup({
      store: new FormControl(''),
      subscriptionpack: new FormControl(''),
      customer: new FormControl(''),
      customeraddress: new FormControl(''),
      validity: new FormControl(),
      deliveryman: new FormControl('')
    })
  }

  changeValue(value: any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.viewCustomerbyStore(this.storeSelected)
      .subscribe((data: any) => {
        this.customer = data?.customer;
      })

      this.apiservice.viewDeliverymanbyStore(data)
      .subscribe((data: any) => {
        this.deliveryman = data?.deliveryman;
      })
  }

  changeCustomer(value: any) {
    this.customerSelected = value;
    let data = {
      customer: this.customerSelected
    }
    this.apiservice.viewCustomerAddress(data)
      .subscribe((data: any) => {
        this.customeraddress = data?.address;
      })
  }

  onSubmit(value: any) {
    if (this.addSubscriptionorder.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {
      const subscriptionpack = value?.subscriptionpack?.split(",");

      let payload = {
        subscriptionpack : subscriptionpack[0],
        validity : subscriptionpack[1],
        price : subscriptionpack[2],
        store : value?.store,
        customer : value?.customer,
        customeraddress : value?.customeraddress,
        deliveryman : value?.deliveryman
      }

      this.apiservice.createSubscriptionorder(payload)
        .subscribe((data: any) => {
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigateByUrl('/view-activesubscription');
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
