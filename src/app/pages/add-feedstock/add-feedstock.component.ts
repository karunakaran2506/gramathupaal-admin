import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-feedstock',
  templateUrl: './add-feedstock.component.html',
  styleUrls: ['./add-feedstock.component.scss'],
})
export class AddFeedstockComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addStock: FormGroup;
  storeSelected: string;
  feedSelected: string;
  stores: Array<any>;
  feeds: Array<any>;
  entryDate = new Date();

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addStock = new FormGroup({
      feed: new FormControl(),
      store: new FormControl(),
      stocktype: new FormControl('in'),
      quantity: new FormControl(1),
      entryDate: new FormControl(this.entryDate),
    });

    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]?._id;
      this.stores = data?.stores;
      this.fetchData();
    });
  }

  fetchData() {
    let payload = {
      store: this.storeSelected,
    };
    this.apiservice.listFeed(payload).subscribe((data: any) => {
      this.feeds = data.feed;
    });
  }

  onSubmit(value: any) {
    if (this.addStock.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    } else {
      this.apiservice.saveFeedStockEntry(value).subscribe((data: any) => {
        if (data.success) {
          this.toastr.success(data.message);
          this.router.navigateByUrl('/view-feedstock');
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
