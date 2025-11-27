import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../shared/material-module';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { TokenInterceptor } from '../services/token-interceptor.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from '../services/snackbar.service';
import { RouteGuardService } from '../services/route-guard.service';



@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
  ],
    // providers:[DashboardService,AuthService,UserService,TokenInterceptorInterceptor,HttpClientModule,SnackbarService,RouteGuardService],

  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
