import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../LoginModel';
import { respond } from '../respond';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  data: LoginModel;
  check: boolean;
  altermessage: string;
  resp: respond = new respond();

  constructor(
    private router: Router,
    private http: HttpClient,
    private elementRef: ElementRef
  ) {}
  Onsubmit() {}

  ngOnInit(): void {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
    //   '#141c2e';
  }
  register() {
    this.router.navigateByUrl('register');
  }
  login() {
    this.router.navigateByUrl('dashboard');
  }
}
