import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  editCustomerForm: FormGroup;
  customer: any;
  storeSelected: any;
  store = [];
  customeraddressForms: FormArray;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.customer = this.apiservice.customerSelected;

    this.editCustomerForm = this.formBuilder.group({
      customer: [this.customer._id],
      name: [this.customer.name, Validators.required],
      nickname: [this.customer.nickname],
      phone: [this.customer.phone, Validators.required],
      store: [this.customer.store, Validators.required],
      customeraddress: this.formBuilder.array([]),
    })

    for (let i = 0; i < this.customer?.customeraddress.length; i++) {
      const customeraddress = this.customer?.customeraddress[i];
      this.addExistingAddress(customeraddress);
    }

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data.stores[0]._id;
        this.store = data.stores;
      })
  }

  addExistingAddress(value: any) {
    const form = this.formBuilder.group({
      id: [value._id],
      addressline1: [value.addressline1, Validators.required],
      addressline2: [value.addressline2, Validators.required],
      pincode: [value.pincode, Validators.required],
      landmark: [value.landmark, Validators.required],
      area: [value.area, Validators.required],
      city: [value.city, Validators.required],
      state: [value.state, Validators.required],
      country: [value.country, Validators.required],
    });
    this.customeraddressForms = this.editCustomerForm.get('customeraddress') as FormArray;
    this.customeraddressForms.push(form);
  }

  addCustomerAddress() {
    const form = this.formBuilder.group({
      addressline1: ['', Validators.required],
      addressline2: ['', Validators.required],
      pincode: ['', Validators.required],
      landmark: ['', Validators.required],
      area: ['', Validators.required],
      city: ['Coimbatore', Validators.required],
      state: ['Tamilnadu', Validators.required],
      country: ['India', Validators.required],
    });
    this.customeraddressForms = this.editCustomerForm.get('customeraddress') as FormArray;
    this.customeraddressForms.push(form);
  }

  removeForm(value: number) {
    this.customeraddressForms = this.editCustomerForm.get('customeraddress') as FormArray;
    this.customeraddressForms.removeAt(value);
  }

  checkAddressForm(index: number) {
    this.customeraddressForms = this.editCustomerForm.get('customeraddress') as FormArray;
    const result = this.customeraddressForms.at(index);
    return !!!result?.value?.id;
  }

  onSubmit(value: any) {
    if (this.editCustomerForm.status == 'INVALID') {
      this.errorToast('Enter all valid data');
    }
    else {

      let payload = {
        name: value.name,
        customer: value.customer,
        nickname: value.nickname,
        phone: value.phone,
        store: value.store,
        customeraddress: JSON.stringify(value.customeraddress),
      }

      this.apiservice.editCustomer(payload)
        .subscribe((data: any) => {
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('customers')
          }
          else {
            this.errorToast(data.message);
          }
        })
    }
  }

  oncancel() {
    this.router.navigateByUrl('customers');
  }

  successToast(message: string) {
    this.toastr.success(message);
  }

  errorToast(message: string) {
    this.toastr.error(message);
  }

}