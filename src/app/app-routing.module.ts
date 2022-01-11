import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributesComponent } from './attributes/attributes.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { RegisterComponent } from './register/register.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CostcenterComponent } from './costcenter/costcenter.component';
import { JentryComponent } from './jentry/jentry.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashComponent,
    children: [
      { path: 'about', component: AttributesComponent },
      { path: 'managesalons', component: AccountsComponent },
      { path: 'salontransactions', component: JentryComponent },
      { path: 'activeservices', component: CostcenterComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'report', component: ReportComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
