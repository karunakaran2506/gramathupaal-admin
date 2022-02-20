import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-add-cowweight',
  templateUrl: './add-cowweight.component.html',
  styleUrls: ['./add-cowweight.component.scss']
})
export class AddCowweightComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addCowWeightForm: FormGroup;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private commonservice: CommonService,
    public dialog: MatDialogRef<AddCowweightComponent>
  ) { }

  ngOnInit() {

    this.addCowWeightForm = new FormGroup({
      quantity: new FormControl(1, Validators.required),
      entrydate: new FormControl('', Validators.required),
      cow: new FormControl(this.apiservice?.cowSelected?._id),
    })
  }

  onSubmit(value) {
    if (this.addCowWeightForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      this.apiservice.addCowWeight(value)
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
