import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { UpdateAccount } from '../accounts/accounts.component';
import { environment } from 'src/environments/environment.prod';
const baseUrl = environment.baseUrl;

export interface SalonRecord {
  imageurl: string;
  description: string;
  edit: string;
  delete: string;
}
const ELEMENT_DATA: SalonRecord[] = [
  {
    description: 'Stylish Hair cut with nice look.',
    imageurl: './assets/barber1.png',
    edit: '',
    delete: '',
  },
  {
    description: 'Excellent triming and styling.',
    imageurl: './assets/barber2.jpg',
    edit: '',
    delete: '',
  },
  {
    description: 'Beautiful and Elegant makeup.',
    imageurl: './assets/barber3.jpeg',
    edit: '',
    delete: '',
  },
  {
    description: 'High quality and smoothing facial.',
    imageurl: './assets/barber4.jpg',
    edit: '',
    delete: '',
  },
  {
    description: 'Smart and Handsome pm.',
    imageurl: './assets/barber5.jpg',
    edit: '',
    delete: '',
  },
  {
    description: 'Cleaning and drying hair.',
    imageurl: './assets/barber4.jpg',
    edit: '',
    delete: '',
  },
];
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements AfterViewInit {
  displayedColumns: string[] = ['imageurl', 'description', 'edit', 'delete'];
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
      text: 'The Following Image will get delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#32CD32',
      confirmButtonText: 'Yes, delete it!',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Portfolio Image has been deleted.', 'success');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
