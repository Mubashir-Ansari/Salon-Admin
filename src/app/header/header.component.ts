import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: string;

  constructor(private router: Router, private http: HttpClient) {}

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout() {
    this.router.navigateByUrl('login');
  }
}
