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
const ELEMENT_DATA: SalonRecord[] = [
  {
    charges: 1000,
    description: 'Stylish Hair cut with nice look.',
    servicename: 'Hair Cut',
    time: '50 min',
    edit: '',
    delete: '',
  },
  {
    charges: 500,
    description: 'Excellent triming and styling.',
    servicename: 'Beard Trim',
    time: '25 min',
    edit: '',
    delete: '',
  },
  {
    charges: 5000,
    description: 'Beautiful and Elegant makeup.',
    servicename: 'Bridal Makeup',
    time: '3 hr',
    edit: '',
    delete: '',
  },
  {
    charges: 1500,
    description: 'High quality and smoothing facial.',
    servicename: 'Facial',
    time: '45 min',
    edit: '',
    delete: '',
  },
  {
    charges: 3500,
    description: 'Smart and Handsome pm.',
    servicename: 'Groom Makeup',
    time: '2 hr',
    edit: '',
    delete: '',
  },
  {
    charges: 1200,
    description: 'Cleaning and drying hair.',
    servicename: 'Hair Wash',
    time: '30 min',
    edit: '',
    delete: '',
  },
];
@Component({
  selector: 'app-costcenter',
  templateUrl: './costcenter.component.html',
  styleUrls: ['./costcenter.component.css'],
})
export class CostcenterComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'servicename',
    'description',
    'charges',
    'time',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialog: any;
  myservice: any;
  toastr: any;
  constructor() {}

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
