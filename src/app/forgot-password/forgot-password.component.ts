import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constant';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
   providers: [UserService,SnackbarService]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any = FormGroup;
  responseMessage: any;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
    })
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;

    var data = {
      email: formData.email,
    }
    this.userService.forgotPassword(data).subscribe((response: any) => {
      
      this.ngxService.stop();
      this.responseMessage = response?.message ;
      this.dialogRef.close();
      this.snackbarService.openSnackBar(this.responseMessage,"success")
    },
    (error: any) => {
    
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;

      }
      this.snackbarService.openSnackBar(this.responseMessage, "error");
    })
    
  }
}
