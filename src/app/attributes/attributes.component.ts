import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  name: string;
  position: number;
  address: string;
  edit: string;
  delete: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
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
@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css'],
})
export class AttributesComponent implements AfterViewInit {
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
  constructor(private router: Router, private toastr: ToastrService) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
