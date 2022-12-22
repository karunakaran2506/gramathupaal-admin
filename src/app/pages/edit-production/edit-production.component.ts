import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-production',
  templateUrl: './edit-production.component.html',
  styleUrls: ['./edit-production.component.scss'],
})
export class EditProductionComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  editProductionForm: FormGroup;
  stores = [];
  products = [];
  preparationdate = new Date();
  storeSelected: any;
  production: any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.production = this.apiservice.productionSelected;
    this.editProductionForm = new FormGroup({
      description: new FormControl(
        this.production?.description,
        Validators.required
      ),
      product: new FormControl(
        this.production?.product?._id,
        Validators.required
      ),
      batchnumber: new FormControl(this.production?.batchnumber),
      quantity: new FormControl(this.production?.quantity, Validators.required),
      labourcharges: new FormControl(
        this.production?.labourcharges,
        Validators.required
      ),
      rawmaterials: new FormControl(this.production?.rawmaterials),
      preparationdate: new FormControl(
        this.convertDate(this.production?.preparationdate)
      ),
      store: new FormControl(this.production?.store, Validators.required),
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

  convertDate(date: Date) {
    if (date) {
      const result = moment(date).format('YYYY-MM-DD');
      return result;
    } else {
      return '';
    }
  }

  onSubmit(value: any) {
    if (this.editProductionForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    } else {
      this.apiservice.editProduction(value).subscribe((data: any) => {
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
    this.router.navigateByUrl('/view-production');
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }
}
