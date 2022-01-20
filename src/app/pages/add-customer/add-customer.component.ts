import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addCustomerForm: FormGroup;
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

    this.addCustomerForm = this.formBuilder.group({
      name: ['', Validators.required],
      nickname: [''],
      phone: ['', Validators.required],
      store: ['', Validators.required],
      customeraddress: this.formBuilder.array([]),
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data.stores[0]._id;
        this.store = data.stores;
      })
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
    this.customeraddressForms = this.addCustomerForm.get('customeraddress') as FormArray;
    this.customeraddressForms.push(form);
  }

  removeForm(value: number) {
    this.customeraddressForms = this.addCustomerForm.get('customeraddress') as FormArray;
    this.customeraddressForms.removeAt(value);
  }

  onSubmit(value: any) {
    console.log('addCustomerForm', this.addCustomerForm);
    if (this.addCustomerForm.status == 'INVALID') {
      this.errorToast('Enter all valid data');
    }
    else {

      let payload = {
        name: value.name,
        nickname: value.nickname,
        phone: value.phone,
        store: value.store,
        customeraddress: JSON.stringify(value.customeraddress),
      }

      this.apiservice.customerSignUp(payload)
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
    this.formGroupDirective.resetForm();
  }

  successToast(message: string) {
    this.toastr.success(message);
  }

  errorToast(message: string) {
    this.toastr.error(message);
  }

}