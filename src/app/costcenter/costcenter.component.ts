import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UpdateAccount } from '../accounts/accounts.component';

export interface DialogData {
  name: string;
  description: string;
  amount: number;
  duration: string;
  edit: ' ';
  delete: ' ';
}

export interface SalonRecord {
  servicename: string;
  description: string;
  charges: number;
  time: string;
  edit: string;
  delete: string;
}
const ELEMENT_DATA: SalonRecord[] = [];
@Component({
  selector: 'app-costcenter',
  templateUrl: './costcenter.component.html',
  styleUrls: ['./costcenter.component.css'],
})
export class CostcenterComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'amount',
    'duration',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  myservice: any;
  object: any;
  selectedsalon: any;
  salonNames: any;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.http.get('http://localhost:3000/SalonNames').subscribe((data) => {
      console.log(data);
      this.salonNames = data;
    });
  }

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
      .get('http://localhost:3000/service/', { params })
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
  updateDialog(data): void {
    const dialogRef = this.dialog.open(UpdateCostcenter, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '60%',
      width: '30%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        name: data.name,
        description: data.description,
        amount: data.amount,
        duration: data.duration,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      data.name = result['name'];
      data.description = result['description'];
      data.amount = result['amount'];
      data.duration = result['duration'];
      this.http.put('http://localhost:3000/service', data).subscribe((data) => {
        console.log(data);
      });
      this.showSuccess();
    });
  }
  showSuccess() {
    this.toastr.success('Successful!', 'Account Added');
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
          .delete('http://localhost:3000/deleteService', options)
          .subscribe(
            (res) => {
              console.log(res);
              if (res['message'] === 'service deleted') {
                Swal.fire(
                  'Deleted!',
                  'Specific Salon Service has been deleted.',
                  'success'
                );
              } else {
                Swal.fire(
                  'Error!',
                  'Unable to Delete the Salon Service',
                  'error'
                );
              }
            },
            (error) => {
              console.error(error);
            }
          );
      }
    });
  }
  url = './assets/service.png';
}

@Component({
  selector: 'update-costcenter',
  templateUrl: './update-costcenter.html',
})
export class UpdateCostcenter {
  object: any;
  name: string[] = [];
  Names: any;
  constructor(
    public dialogRef: MatDialogRef<UpdateCostcenter>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
