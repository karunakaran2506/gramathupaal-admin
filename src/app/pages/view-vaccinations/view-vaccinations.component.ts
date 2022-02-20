import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-vaccinations',
  templateUrl: './view-vaccinations.component.html',
  styleUrls: ['./view-vaccinations.component.scss']
})
export class ViewVaccinationsComponent implements OnInit {

  vaccine : Array<any> = [];
  p = 1;
  
  constructor(private apiservice: ApiService) { }

  ngOnInit(){
    console.log(this.apiservice?.cowSelected);
    this.vaccine = this.apiservice?.cowSelected?.vaccination;
  }

}
