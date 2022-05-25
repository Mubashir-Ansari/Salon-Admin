import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { UpdateAccount } from '../accounts/accounts.component';

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
  dialog: any;
  myservice: any;
  toastr: any;
  object: any;
  selectedsalon: any;
  salonNames: any;
  constructor(private http: HttpClient) {
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
      text: 'All the Services associated to this Salon will get delete',
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
            'Specific Service has been deleted.',
            'success'
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  url = './assets/service.png';
}
