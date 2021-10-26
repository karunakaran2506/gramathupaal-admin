import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  active : any;
  details : any;
  permissions : any;
  activepage : any;

  constructor(
    private router : Router,
    private sidenav : MatDrawer
  ) { }

  ngOnInit(){
    this.active = 'dashboard';
    this.permissions = JSON.parse(localStorage.getItem('userPermissions'));
  }

  makeactive(page){
    this.active = page; 
  }

  openpage(page){
    this.activepage = page;
    this.router.navigateByUrl(page);
    this.sidenav.close();
  }

}
