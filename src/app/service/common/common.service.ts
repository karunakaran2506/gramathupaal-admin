import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public cowList = new BehaviorSubject({});
  public feedLedgerEntries = new BehaviorSubject({});

  constructor() {}

  public updateCowList(data: any) {
    this.cowList.next(data);
  }

  public updateFeedLedger(data: any) {
    this.feedLedgerEntries.next(data);
  }
}
