import { AfterViewInit, Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constant';
import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentModule } from '../material-component/material-component.module';
import { MaterialModule } from '../shared/material-module';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { TokenInterceptor } from '../services/token-interceptor.interceptor';
import { RouteGuardService } from '../services/route-guard.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MaterialComponentModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DashboardService, SnackbarService, UserService, AuthService, TokenInterceptor, RouteGuardService],
})
export class DashboardComponent implements AfterViewInit {

  responseMessage: any;
  data: any;

  ngAfterViewInit() { }

  constructor(
    private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,

  ) {
    this.ngxService.start();
    this.dashboardData();
  }

  dashboardData() {

    this.dashboardService.getDetails().subscribe((response: any) => {
      this.ngxService.stop();
      this.data = response;
      console.log("getting the data ", response);
    },
      (error: any) => {
        this.ngxService.stop();
        console.log("getting the api error ");
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, "error");
      })
  }

}
