import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
// import { AppComponent } from '../app.component';
import { BestSellerComponent } from "../best-seller/best-seller.component";
import { SignupComponent } from '../signup/signup.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SliderComponent } from "../slider/slider.component";
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    BestSellerComponent,
    CarouselModule,
    MatCardModule,
    SliderComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
 
  }


  handleSignupAction(): void {
    console.log("Signup clicked");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(SignupComponent, dialogConfig)

  }

    handleForgotPasswordAction(): void {
    console.log("ForgotPassword clicked");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(ForgotPasswordComponent, dialogConfig)

  }
}
