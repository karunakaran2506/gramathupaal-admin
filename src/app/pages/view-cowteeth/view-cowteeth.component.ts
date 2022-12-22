import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-cowteeth',
  templateUrl: './view-cowteeth.component.html',
  styleUrls: ['./view-cowteeth.component.scss']
})
export class ViewCowteethComponent implements OnInit {

  cowteeth : Array<any> = [];
  p = 1;
  
  constructor(private apiservice: ApiService) { }

  ngOnInit(){
    this.cowteeth = this.apiservice?.cowSelected?.cowteeth;
  }

}
