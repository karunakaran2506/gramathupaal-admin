import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-add-vaccination',
  templateUrl: './add-vaccination.component.html',
  styleUrls: ['./add-vaccination.component.scss']
})
export class AddVaccinationComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addVaccineForm: FormGroup;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private commonservice: CommonService,
    public dialog: MatDialogRef<AddVaccinationComponent>
  ) { }

  ngOnInit() {

    this.addVaccineForm = new FormGroup({
      name: new FormControl('', Validators.required),
      entrydate: new FormControl('', Validators.required),
      description: new FormControl(''),
      cow: new FormControl(this.apiservice?.cowSelected?._id),
    })
  }

  onSubmit(value) {
    if (this.addVaccineForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      this.apiservice.addVaccination(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.successToast(data.message);
            this.apiservice.listCow()
              .subscribe((data: any) => {
                this.commonservice.updateCowList(data?.cow)
              })
            this.dialog.close();
          }
          else {
            this.errorToast(data.message);
          }
        })
    }
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }

}
