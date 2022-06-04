import {
  AfterViewInit,
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { AccountModel } from '../AccountModel';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from 'src/app/services/myservice.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

export interface UserData {
  name: string;
  city: string;
  address: string;
  email: string;
  gender: string;
  category: string;
}
export interface SalonRecord {
  name: string;
  city: string;
  address: string;
  email: string;
  category: string;
  gender: string;
  edit: string;
  delete: string;
}

export interface DialogData {
  name: string;
  city: string;
  address: string;
  password: string;
  email: string;
  gender: string;
  category: string;
  maps: string;
  edit: ' ';
  delete: ' ';
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements AfterViewInit {
  info: string = ' ';
  name: string;
  city: string;
  address: string;
  email: string;
  gender: string;
  category: string;
  password: string;
  maps: string;
  object: any;
  listData: MatTableDataSource<any>;
  AccountModel: AccountModel;
  // displayedColumns: string[] = ['name', 'Bank', 'Balance', 'Remarks'];
  displayedColumns: string[] = [
    'name',
    'address',
    'city',
    'email',
    'category',
    'gender',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedsalon: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchKey: string;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}
  // ngOnInit() {
  //   this.dataSource = new MatTableDataSource(this.object);
  //   // this.dataSource.paginator = this.paginator;
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  ngAfterViewInit() {
    console.log('zain haiderr');
    this.http.get('http://localhost:3000/AllSalon').subscribe((data) => {
      console.log(data);
      this.object = data;
      this.dataSource = new MatTableDataSource(this.object);
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAccount, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '85%',
      width: '30%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        name: this.name,
        city: this.city,
        address: this.address,
        email: this.email,
        gender: this.gender,
        password: this.password,
        category: this.category,
        maps: this.maps,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.name = result['name'];
      this.city = result['city'];
      this.address = result['address'];
      this.email = result['email'];
      this.gender = result['gender'];
      this.password = result['password'];
      this.maps = result['maps'];
      this.category = result['category'];
      this.AccountModel = {
        name: this.name,
        city: this.city,
        address: this.address,
        email: this.email,
        gender: this.gender,
        password: this.password,
        category: this.category,
        maps: this.maps,
      };
      console.log(this.AccountModel);
      this.http
        .post('http://localhost:3000/salon', this.AccountModel)
        .subscribe((data) => {
          console.log(data);
        });
      this.showSuccess();
    });
  }
  updateDialog(data): void {
    const dialogRef = this.dialog.open(UpdateAccount, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '85%',
      width: '30%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        name: data.name,
        city: data.city,
        address: data.address,
        email: data.email,
        gender: data.gender,
        password: data.password,
        category: data.category,
        maps: data.maps,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      data.name = result['name'];
      data.city = result['city'];
      data.address = result['address'];
      data.email = result['email'];
      data.gender = result['gender'];
      data.password = result['password'];
      data.maps = result['maps'];
      data.category = result['category'];
      this.http.put('http://localhost:3000/salon', data).subscribe((data) => {
        console.log(data);
      });
      this.showSuccess();
    });
  }
  getData(data) {
    console.log(data);
    Swal.fire({
      title: 'Are you sure?',
      text: 'All the Details associated to this Salon will get delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#32CD32',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          body: data,
        };
        this.http
          .delete('http://localhost:3000/deleteSalon', options)
          .subscribe(
            (res) => {
              console.log(res);
              if (res['message'] === 'account deleted') {
                Swal.fire(
                  'Deleted!',
                  'Your Salon has been deleted.',
                  'success'
                );
              } else {
                Swal.fire('Error!', 'Unable to Delete the Salon', 'error');
              }
              this.info = ' ';
            },
            (error) => {
              console.error(error);
            }
          );
      }
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  showSuccess() {
    this.toastr.success('Successful!', 'Salon Added');
  }
}
@Component({
  selector: 'dialog-account',
  templateUrl: './dialog-account.html',
})
export class DialogAccount {
  constructor(
    public dialogRef: MatDialogRef<DialogAccount>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'update-account',
  templateUrl: './update-account.html',
})
export class UpdateAccount {
  object: any;
  name: string[] = [];
  Names: any;
  constructor(
    public dialogRef: MatDialogRef<UpdateAccount>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export class clientsClass {
  clientsMsg: string;
}
