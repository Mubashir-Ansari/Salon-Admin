import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  about() {
    this.router.navigateByUrl('dashboard/about');
  }
  managesalons() {
    this.router.navigateByUrl('dashboard/managesalons');
  }
  salontransactions() {
    this.router.navigateByUrl('dashboard/salontransactions');
  }
  activeservices() {
    this.router.navigateByUrl('dashboard/activeservices');
  }
  salonportfolio() {
    this.router.navigateByUrl('dashboard/portfolio');
  }
  salonreport() {
    this.router.navigateByUrl('dashboard/report');
  }
}
