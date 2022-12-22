import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-update-feedledger',
  templateUrl: './update-feedledger.component.html',
  styleUrls: ['./update-feedledger.component.scss'],
})
export class UpdateFeedledgerComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  updateBalance: FormGroup;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private commonservice: CommonService,
    public dialog: MatDialogRef<UpdateFeedledgerComponent>
  ) {}

  ngOnInit() {
    this.updateBalance = new FormGroup({
      ledger: new FormControl(
        this.apiservice?.feedledgerSelected?._id,
        Validators.required
      ),
      totalamount: new FormControl(
        this.apiservice?.feedledgerSelected?.totalamount,
        Validators.required
      ),
      receivedamount: new FormControl(
        '',
        Validators.required
      ),
      oldamount: new FormControl(
        this.apiservice?.feedledgerSelected?.receivedamount,
        Validators.required
      ),
    });
  }

  onSubmit(value:any) {
    if (this.updateBalance.status == 'INVALID') {
      this.errorToast('Enter valid data');
    } else {
      let payload = {
        ...value,
        receivedamount: value.oldamount + value.receivedamount,
      };
      this.apiservice.updateBalance(payload).subscribe((data: any) => {
        if (data.success) {
          this.successToast(data.message);
          this.apiservice
            .listFeedLedger({
              store: this.apiservice?.feedledgerSelected?.store,
              date: this.apiservice?.feedledgerSelected?.dateSelected,
            })
            .subscribe((data: any) => {
              this.commonservice.updateFeedLedger(data?.entries);
            });
          this.dialog.close();
        } else {
          this.errorToast(data.message);
        }
      });
    }
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }
}
