import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ShowHideDirective } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UpdateAccount } from '../accounts/accounts.component';

export interface SalonRecord {
  clientname: string;
  servicename: string;
  amount: number;
  date: string;
  time: string;
  edit: string;
  delete: string;
}
const ELEMENT_DATA: SalonRecord[] = [];
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements DoCheck {
  displayedColumns: string[] = [
    'clientname',
    'servicename',
    'amount',
    'date',
    'time',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialog: any;
  myservice: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  forTable(varr) {
    console.log(this.selectedsalon);
    let data = { id: this.selectedsalon['_id'] };
    const params = new HttpParams().append('id', this.selectedsalon['_id']);
    this.http
      .get('http://localhost:3000/SalonAvailed/', { params })
      .subscribe((data) => {
        console.log(data);
        this.object = data;
        if (this.object.hasOwnProperty('message')) {
          console.log('no service is availble for this salon');
          this.dataSource = new MatTableDataSource();
        } else {
          this.dataSource = new MatTableDataSource(this.object);
        }
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  updateDialog(): void {
    const dialogRef = this.dialog.open(UpdateAccount, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '50%',
      width: '25%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  showSuccess() {
    this.toastr.success('Successful!', 'Account Added');
  }
  getData(data) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'All the links associated to this Transaction will get delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#32CD32',
      confirmButtonText: 'Yes, delete it!',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your Transaction has been deleted.',
            'success'
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  newDivs: addDivisions[] = [];
  newEntries: entries[] = [];
  object: any;
  projects: string[] = [];
  clients: string[] = [];
  entriesObject: entries[] = [
    {
      project: '',
      client: '',
      receiver: '',
      amount: '',
      reason: '',
      method: '',
      remarks: '',
    },
  ];
  project: string = '';
  client: string = '';
  receiver: string = '';
  amount: string = '';
  reason: string = '';
  method: string = '';
  remarks: string = '';
  i: number = 0;
  selectedProject: string;
  sum: number = 0;
  total: number;
  data: any = {};
  objects: any;
  objectsEmpty: any = [];
  salonNames: any;
  selectedsalon: any;

  listData: MatTableDataSource<any>;

  addNewDiv() {
    this.newDivs.push({
      project: this.selectedProject,
      client: this.client,
      amount: 0,
      receiver: '',
      reason: '',
      method: '',
      remarks: '',
    });
  }

  remove(todel) {
    let objects = this.newDivs.filter(function (obj) {
      return obj.receiver !== todel;
    });
    this.newDivs = objects;
    let temp: number = 0;
    for (let i = 0; i < this.newDivs.length; i++) {
      temp = temp + this.newDivs[i]['amount'];
    }
    this.sum = temp;
  }

  showerror(message) {
    console.log('here');
    this.toastr.error(message, 'Error!');
  }

  showsuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  final() {
    console.log(this.newDivs);
    let summ: number = 0;
    for (let i = 0; i < this.newDivs.length; i++) {
      summ = summ + this.newDivs[i]['amount'];
    }

    if (summ === this.total) {
      console.log('debit = credit');
      this.http
        .post('http://localhost:5000/Entries', this.newDivs, {
          withCredentials: true,
        })
        .subscribe(
          (res) => {
            {
              console.log(res);
              if (res['message'] === 'Entries are added') {
                this.showsuccess(res['message']);
                this.newDivs = [];
                this.client = '';
                this.selectedProject = '';
                this.total = 0;
              } else {
                this.showerror(res['message']);
              }
            }
          },
          (err) => {
            console.log(err);
            console.log(err['message']);
          }
        );
    } else {
      this.showerror('Debit Is Not Equal To Credit');
      console.log('debit not equal to credit');
    }
  }

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.http.get('http://localhost:3000/SalonNames').subscribe((data) => {
      console.log(data);
      this.salonNames = data;
    });
  }

  ngDoCheck(): void {
    let temp: number = 0;
    for (let i = 0; i < this.newDivs.length; i++) {
      temp = temp + this.newDivs[i]['amount'];
    }
    this.sum = temp;
  }

  addEntry() {
    console.log(this.newDivs, 'test');
  }

  columnHeader2 = {
    project: 'project',
    client: ' client',
    amount: 'amount',
    receiver: 'receive',
    reason: 'reason',
    method: 'method',
    remarks: 'remarks',
  };
}

export interface addDivisions {
  project: string;
  client: string;
  receiver: string;
  reason: string;
  amount: number;
  method: string;
  remarks: string;
}

export interface entries {
  project: string;
  client: string;
  receiver: string;
  amount: string;
  reason: string;
  method: string;
  remarks: string;
}
