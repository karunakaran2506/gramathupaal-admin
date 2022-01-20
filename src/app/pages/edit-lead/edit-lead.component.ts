import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { leadstatus, referrals } from 'src/app/shared/common';

@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.scss']
})
export class EditLeadComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  editLeadForm: FormGroup;
  store = [];
  lead : any;
  referrals = referrals;
  leadstatus = leadstatus;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.lead = this.apiservice.leadSelected;

    this.editLeadForm = new FormGroup({
      lead: new FormControl(this.lead._id),
      name: new FormControl(this.lead.name, Validators.required),
      phone: new FormControl(this.lead.phone, Validators.required),
      email: new FormControl(this.lead.email),
      modeofreferral: new FormControl(this.lead.modeofreferral, Validators.required),
      status: new FormControl(this.lead.status, Validators.required),
      comment: new FormControl(this.lead.comment),
      store: new FormControl(this.lead.store, Validators.required),
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.store = data.stores;
      })
  }

  onSubmit(value: any) {
    if (this.editLeadForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      this.apiservice.editLead(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('view-lead');
          }
          else {
            this.errorToast(data.message);
          }
        })
    }
  }

  oncancel() {
    this.router.navigateByUrl('/view-lead');
  }

  successToast(message: any) {
    this.toastr.success(message);
  }

  errorToast(message: any) {
    this.toastr.error(message);
  }

}
