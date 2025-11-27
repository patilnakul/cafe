import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items';
import { jwtDecode } from 'jwt-decode';
import { MaterialModule } from '../../../shared/material-module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullComponent } from '../full.component';
import { AppHeaderComponent } from '../header/header.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports:[
    MaterialModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  // styleUrls: ['./sidebar.component.css']
  providers: [MenuItems]
})
export class AppSidebarComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
userRole:any;
token:any=localStorage.getItem('token');
tokenPayload:any;

  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    // Use (max-width: 768px) for mobile screens
    this.tokenPayload= jwtDecode(this.token);
    this.userRole=this.tokenPayload?.role;

    this.mobileQuery = media.matchMedia('(max-width: 768px)');

    // Define the listener
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();

    // Modern way (recommended)
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    // Clean up listener
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
