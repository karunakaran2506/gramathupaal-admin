import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-subscriptionorder',
  templateUrl: './edit-subscriptionorder.component.html',
  styleUrls: ['./edit-subscriptionorder.component.scss']
})
export class EditSubscriptionorderComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  editSubscriptionorder: FormGroup;
  storeSelected: string;
  packSelected: string;
  subscriptionorder: any;
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
    
    this.subscriptionorder = this.apiservice?.subscriptionorderSelected;

    this.apiservice.listSubscriptionpack()
      .subscribe((data: any) => {
        this.subscriptionpack = data.subscriptionpack;
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.stores = data?.stores;
        this.changeValue(this.subscriptionorder?.store);
    })

    this.editSubscriptionorder = new FormGroup({
      subscriptionorder: new FormControl(this.subscriptionorder?._id),
      store: new FormControl(this.subscriptionorder?.store),
      subscriptionpack: new FormControl(`${this.subscriptionorder?.subscriptionpack?._id},${this.subscriptionorder?.subscriptionpack?.validity},${this.subscriptionorder?.subscriptionpack?.price}`),
      customer: new FormControl(this.subscriptionorder?.customer?._id),
      customeraddress: new FormControl(this.subscriptionorder?.customeraddress?._id),
      validity: new FormControl(this.subscriptionorder?.validity),
      deliveryman: new FormControl(this.subscriptionorder?.deliveryman?._id)
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
        this.changeCustomer(this.subscriptionorder?.customer?._id);
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
    if (this.editSubscriptionorder.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {

      let payload = {
        subscriptionorder: value?.subscriptionorder,
        customeraddress: value?.customeraddress,
        deliveryman: value?.deliveryman
      }

      this.apiservice.editSubscriptionorder(payload)
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
    this.router.navigateByUrl('/view-activesubscription');
  }
}
