import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../../services/snackbar.service';
import { GlobalConstants } from '../../../shared/global-constant';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../shared/material-module';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/dashboard.service';
import { AuthService } from '../../../services/auth.service';
import { TokenInterceptor } from '../../../services/token-interceptor.interceptor';
import { RouteGuardService } from '../../../services/route-guard.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-change-password',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HttpClientModule

  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [UserService, SnackbarService, DashboardService, AuthService, TokenInterceptor, RouteGuardService]
})
export class ChangePasswordComponent implements OnInit {

  oldPassword:any  = true;
  newPassword:any = true;
  confirmPassword = true;
  changePasswordForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]

    })
  }
  validateSubmit() {
    if (this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value) {
      return true;
    }
    else {
      return false;
    }
  }

  handlepasswordChangeSubmit() {
    this.ngxService.start();
    var formData = this.changePasswordForm.value;
    const data = {
      oldPassword: formData.oldPassword.trim(),
      newPassword: formData.newPassword.trim()
    };
    this.userService.changePassword(data).subscribe((response: any) => {
      console.log("Data being sent:", data);

      this.ngxService.stop();
      this.responseMessage = response?.Message;
      this.dialogRef.close();
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      console.log("Error response:", error);
      console.log(error);
      this.ngxService.stop();
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
