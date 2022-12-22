import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-feedledger',
  templateUrl: './add-feedledger.component.html',
  styleUrls: ['./add-feedledger.component.scss'],
})
export class AddFeedledgerComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addFeedLedger: FormGroup;
  storeSelected: string;
  feedSelected: string;
  stores: Array<any>;
  feeds: Array<any>;
  entryDate = new Date();
  mediaContentTypes = ['image/png', 'image/jpeg', 'image/jpeg'];

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addFeedLedger = new FormGroup({
      feed: new FormControl(),
      store: new FormControl(),
      quantity: new FormControl(1),
      totalamount: new FormControl(1),
      receivedamount: new FormControl(1),
      entryDate: new FormControl(this.entryDate),
      file: new FormControl(''),
      fileType: new FormControl(''),
      filesource: new FormControl(Validators.required),
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

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
      const [file] = event.target.files;
      const { type, size } = file;
      if (this.mediaContentTypes.includes(type)) {
        const fileSize = size / 1024 / 1024;
        if (fileSize < 10) {
          reader.onload = () => {
            const base64Content = reader.result as string;
            const { encoded, fileType } = this.base64Decoder(base64Content);
            this.addFeedLedger.patchValue({
              filesource: encoded,
              fileType,
            });
          };
          reader.readAsDataURL(file);
        } else {
          this.toastr.error('File size exceeds the limit of 10 MB');
        }
      } else {
        this.toastr.error('File type not supported');
      }
    }
  }

  onSubmit(value: any) {
    if (this.addFeedLedger.status === 'INVALID') {
      this.toastr.error('Enter valid data');
    } else {
      this.apiservice.saveFeedLedgerEntry(value).subscribe((data: any) => {
        if (data.success) {
          this.toastr.success(data.message);
          this.router.navigateByUrl('/view-feedledger');
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }

  base64Decoder = (imgData: string) => {
    const [imageType, encoded] = imgData?.split(',');
    const fileType = imageType?.split('/')[1].split(';')[0] || 'pdf';
    return { encoded, fileType };
  };

  oncancel() {
    this.formGroupDirective.reset();
  }
}
