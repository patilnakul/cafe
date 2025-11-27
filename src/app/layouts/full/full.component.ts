import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MaterialModule } from '../../shared/material-module';
import { AppHeaderComponent } from './header/header.component'; // Adjust the path as needed
import { AppSidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { TokenInterceptor } from '../../services/token-interceptor.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from '../../services/snackbar.service';
import { RouteGuardService } from '../../services/route-guard.service';



/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  imports: [
    MaterialModule,
    AppHeaderComponent,
    AppSidebarComponent,
    RouterOutlet
  ],
  styleUrls: [],
  providers:[DashboardService,AuthService,UserService,TokenInterceptor,HttpClientModule,SnackbarService,RouteGuardService]
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() { }
}
