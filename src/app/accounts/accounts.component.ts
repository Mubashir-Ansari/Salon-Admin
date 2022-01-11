import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  Bank: string;
  Balance: number;
  Remarks: string;
}
export interface SalonRecord {
  name: string;
  position: number;
  address: string;
  edit: string;
  delete: string;
}
const ELEMENT_DATA: SalonRecord[] = [
  { position: 101, name: 'Deja-Vu', address: 'Karachi', edit: '', delete: '' },
  {
    position: 102,
    name: 'Freinds Salon',
    address: 'Karachi',
    edit: '',
    delete: '',
  },
  {
    position: 103,
    name: 'Sara Salon & Spa',
    address: 'Lahore',
    edit: '',
    delete: '',
  },
  {
    position: 104,
    name: 'Toni & Teez',
    address: 'Islamabad',
    edit: '',
    delete: '',
  },
  {
    position: 105,
    name: 'MahRose Beauty Salon',
    address: 'Karachi',
    edit: '',
    delete: '',
  },
  {
    position: 106,
    name: 'Pengs Salon',
    address: 'Islamabad',
    edit: '',
    delete: '',
  },
  {
    position: 107,
    name: 'Kashees Beauty Salon',
    address: 'Lahore',
    edit: '',
    delete: '',
  },
  {
    position: 108,
    name: 'Salon for Women',
    address: 'Karachi',
    edit: '',
    delete: '',
  },
  {
    position: 109,
    name: 'ABC - Salon',
    address: 'Lahore',
    edit: '',
    delete: '',
  },
  { position: 110, name: 'Hairdo', address: 'Karachi', edit: '', delete: '' },
];
export interface DialogData {
  name: string;
  Bank: string;
  Balance: number;
  Remarks: string;
  edit: ' ';
  delete: ' ';
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements AfterViewInit {
  name: string;
  Bank: string;
  Balance: number;
  Remarks: string;
  object: any;
  listData: MatTableDataSource<any>;
  AccountModel: AccountModel;
  // displayedColumns: string[] = ['name', 'Bank', 'Balance', 'Remarks'];
  displayedColumns: string[] = [
    'position',
    'name',
    'address',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    private toastr: ToastrService,
    private myservice: MyserviceService
  ) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAccount, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '50%',
      width: '25%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        name: this.name,
        Bank: this.Bank,
        Balance: this.Balance,
        Remarks: this.Remarks,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.name = result['name'];
      this.Bank = result['Bank'];
      this.Balance = result['Balance'];
      this.Remarks = result['Remarks'];
      this.AccountModel = {
        name: this.name,
        Bank: this.Bank,
        Balance: this.Balance,
        Remarks: this.Remarks,
      };
      this.showSuccess();
    });
  }
  updateDialog(): void {
    const dialogRef = this.dialog.open(UpdateAccount, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '50%',
      width: '25%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        name: this.name,
        Bank: this.Bank,
        Balance: this.Balance,
        Remarks: this.Remarks,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.name = result['name'];
      this.Bank = result['Bank'];
      this.Balance = result['Balance'];
      this.Remarks = result['Remarks'];
      this.AccountModel = {
        name: this.name,
        Bank: this.Bank,
        Balance: this.Balance,
        Remarks: this.Remarks,
      };
      this.showSuccess();
    });
  }
  getData(data) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'All the Details associated to this Salon will get delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#32CD32',
      confirmButtonText: 'Yes, delete it!',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your Salon has been deleted.', 'success');
        }
      },
      (error) => {
        console.error(error);
      }
    );
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
  ) {
    this.http
      .get('http://localhost:5000/ViewAccount', {
        withCredentials: true,
      })
      .subscribe(
        (res) => {
          console.log('resss');
          this.object = res;
          for (let i = 0; i < this.object.length; i++) {
            this.name.push(this.object[i]['name']);
          }
          console.log(this.name, 'here at profittt');
          this.Names = this.name;
          console.log(this.Names);
        },
        (err) => {
          console.log('resss');
          console.log(err);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export class clientsClass {
  clientsMsg: string;
}
