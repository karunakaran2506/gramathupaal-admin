import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { CommonService } from 'src/app/service/common/common.service';
import { UpdateFeedledgerComponent } from '../update-feedledger/update-feedledger.component';

@Component({
  selector: 'app-view-feedledger',
  templateUrl: './view-feedledger.component.html',
  styleUrls: ['./view-feedledger.component.scss'],
})
export class ViewFeedledgerComponent implements OnInit {
  storeSelected: string;
  dateSelected: Date = new Date();
  ledgerEntries: Array<any> = [];
  stores: Array<any>;
  p = 1;

  constructor(
    private apiservice: ApiService,
    private dialog: MatDialog,
    private commonservice: CommonService
  ) {}

  ngOnInit() {
    this.commonservice.feedLedgerEntries.subscribe((data:any) => {
      this.ledgerEntries = data;
    });
    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]._id;
      this.stores = data?.stores;
      this.fetchData();
    });
  }

  fetchData() {
    let data = {
      store: this.storeSelected,
      date: this.dateSelected,
    };

    this.apiservice.listFeedLedger(data).subscribe((data: any) => {
      this.commonservice.updateFeedLedger(data?.entries);
    });
  }

  updateBalance(data: any) {
    this.apiservice.feedledgerSelected = data;
    this.apiservice.feedledgerSelected.dateSelected = this.dateSelected;
    this.dialog.open(UpdateFeedledgerComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }
}
