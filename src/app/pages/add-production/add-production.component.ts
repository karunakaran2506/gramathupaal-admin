import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-production',
  templateUrl: './add-production.component.html',
  styleUrls: ['./add-production.component.scss'],
})
export class AddProductionComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addProductionForm: FormGroup;
  stores = [];
  products = [];
  preparationdate = new Date();
  storeSelected: any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addProductionForm = new FormGroup({
      description: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
      batchnumber: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      labourcharges: new FormControl('Placed', Validators.required),
      rawmaterials: new FormControl(''),
      preparationdate: new FormControl(this.preparationdate),
      store: new FormControl('', Validators.required),
    });

    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]?._id;
      this.stores = data?.stores;
      this.fetchData();
    });
  }

  fetchData() {
    this.apiservice
      .listProduct({ store: this.storeSelected })
      .subscribe((data: any) => {
        this.products = data.product;
      });
  }

  onSubmit(value: any) {
    if (this.addProductionForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    } else {
      this.apiservice.createProduction(value).subscribe((data: any) => {
        if (data.success) {
          this.successToast(data.message);
          this.router.navigateByUrl('view-production');
        } else {
          this.errorToast(data.message);
        }
      });
    }
  }

  oncancel() {
    this.formGroupDirective.resetForm();
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }
}
