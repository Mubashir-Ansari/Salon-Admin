import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../services/myservice.service';
import { environment } from 'src/environments/environment.prod';
const baseUrl = environment.baseUrl;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  myChart: Chart;
  data: any = {};
  selectedsalon: String;
  salonNames: any;
  objects: any;
  object: any;
  reportdata: any;
  monthsName: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'dec',
  ];
  validate: string[] = [];
  format: string[] = [];
  months: string[] = [];
  expenses: number[] = [];
  amounts: number[] = [];
  sum: number = 0;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private myservice: MyserviceService,
    private router: Router
  ) {
    this.http.get(`${baseUrl}/SalonNames`).subscribe((data) => {
      console.log(data);
      this.salonNames = data;
    });
  }

  ngOnInit() {
    console.log('VALUEE:');
  }

  showerror(message) {
    this.toastr.error(message, 'Error!');
  }

  showsuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  async forReport(varr) {
    console.log('here at reportss');
    console.log(this.salonNames);
    console.log(this.selectedsalon);
    let filterr = 'Finished';
    const params = new HttpParams()
      .set('id', this.selectedsalon['_id'])
      .set('filter', filterr);
    console.log('TEST', params);
    await this.http
      .get(`${baseUrl}/SalonAvailed/`, {
        params,
      })
      .toPromise()
      .then((data) => {
        console.log(data);
        this.object = data;
      })
      .catch((err) => {
        console.log('error');
      });
    console.log(this.object, 'DATA');
    this.NewFunction(this.object);
  }
  NewFunction(reportdata) {
    console.log('here', reportdata);
    this.validate = [];
    this.format = [];
    this.months = [];
    this.expenses = [];
    this.amounts = [];
    this.sum = 0;
    for (let i = 0; i < reportdata.length; i++) {
      this.format.push(
        reportdata[i]['date'][5] +
          reportdata[i]['date'][6] +
          reportdata[i]['date'][7]
      );
      this.amounts.push(reportdata[i].services['amount']);
    }
    for (let i = 0; i < this.format.length; i++) {
      console.log(i, 'loop');
    }

    for (let i = 0; i < this.format.length; i++) {
      if (this.validate.includes(this.format[i]) === false) {
        let index = this.monthsName.indexOf(this.format[i]);
        console.log(index);
        this.validate.push(this.format[i]);
        this.months.push(this.monthsName[index]);
        for (let j = 0; j < this.format.length; j++) {
          if (this.format[i] === this.format[j]) {
            this.sum = this.sum + this.amounts[j];
          }
        }

        if (this.sum !== 0) {
          this.expenses.push(this.sum);
          this.sum = 0;
        }
      }
      console.log(i);
    }
    console.log(this.months, 'months');
    console.log(this.expenses, 'expenses');
    if (this.myChart) {
      console.log('here at destroy');
      this.myChart.destroy();
    }
    this.chartFunc();
  }
  chartFunc() {
    this.myChart = new Chart('testChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Total Income',
            data: this.expenses,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        // responsive: true,
        // maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
