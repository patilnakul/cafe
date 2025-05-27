import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../shared/global-constant';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService,SnackbarService]
})
export class SignupComponent implements OnInit {


  password = true;
  confirmPassword = true;
  signupForm :any= FormGroup;
  responseMessage: any;

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({

      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]

    })

  }
  validateSubmit() {
    if (this.signupForm.controls['password'].value !== this.signupForm.controls['confirmPassword'].value) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password

    }
    this.userService.signup(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
      this.router.navigate(['/']);
    }, (error) => {

      this.ngxService.stop();

      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, "error");
    });
  }
}
