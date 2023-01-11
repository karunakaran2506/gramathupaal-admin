import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-cowtreatment',
  templateUrl: './add-cowtreatment.component.html',
  styleUrls: ['./add-cowtreatment.component.scss']
})
export class AddCowtreatmentComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addCowTreatment: FormGroup;
  store = [];
  cow = [];
  entrydate = new Date();

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addCowTreatment = new FormGroup({
      cow: new FormControl('', Validators.required),
      store: new FormControl('', Validators.required),
      problem: new FormControl('', Validators.required),
      prescription: new FormControl('', Validators.required),
      entrydate: new FormControl(new Date(), Validators.required),
      comment: new FormControl(''),
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.store = data.stores;
      })
  }

  onStoreChange(value: string) {
    this.apiservice.listCow({ store: value })
      .subscribe((data: any) => {
        this.cow = data.cow;
      })
  }

  oncancel() {
    this.formGroupDirective.resetForm();
  }

  onSubmit(value) {
    if (this.addCowTreatment.status == 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {
      this.apiservice.addCowTreatment(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigateByUrl('view-cow-treatment');
          }
          else {
            this.toastr.error(data.message);
          }
        })
    }
  }

}
