import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.scss']
})
export class StockHistoryComponent implements OnInit {

  product: any;
  stock: any;
  stockEntries: Array<any> = [];
  p=1;
  
  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    
    this.stock = this.apiservice?.stockSelected;
    this.product = this.apiservice?.stockSelected?.product;
    console.log('data', this.product);
    let data = {
      product: this.product?._id
    }

    this.apiservice.listStockEntriesbyProduct(data)
      .subscribe((data: any) => {
        this.stockEntries = data.entries;
      })
  }

}