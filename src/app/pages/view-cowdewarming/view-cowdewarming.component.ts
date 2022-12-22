import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-cowdewarming',
  templateUrl: './view-cowdewarming.component.html',
  styleUrls: ['./view-cowdewarming.component.scss']
})
export class ViewCowdewarmingComponent implements OnInit {

  cowdewarming : Array<any> = [];
  p = 1;
  
  constructor(private apiservice: ApiService) { }

  ngOnInit(){
    this.cowdewarming = this.apiservice?.cowSelected?.cowdewarming;
  }

}
