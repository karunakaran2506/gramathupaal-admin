import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.scss'],
})
export class AddFeedComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addFeed: FormGroup;
  storeSelected: string;
  productData: Array<any>;
  stores: Array<any>;
  entryDate = new Date();

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addFeed = new FormGroup({
      name: new FormControl(),
      store: new FormControl(),
      unit: new FormControl('kilogram')
    });

    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]?._id;
      this.stores = data?.stores;
    });
  }

  onSubmit(value: any) {
    if (this.addFeed.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    } else {
      this.apiservice.createFeed(value).subscribe((data: any) => {
        if (data.success) {
          this.toastr.success(data.message);
          this.router.navigateByUrl('/view-feed');
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }

  oncancel() {
    this.formGroupDirective.reset();
  }
}
