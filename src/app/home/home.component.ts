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
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from '../services/dashboard.service';
import { AppModule } from '../app.module';
import { FooterComponent } from "../footer/footer.component";

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
    SliderComponent,
    HttpClientModule,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService,DashboardService]
})
export class HomeComponent {

  constructor(
    private dialog: MatDialog,
    private userServices: UserService,
  public router: Router) { }
  ngOnInit(): void {

    this.userServices.checkToken().subscribe((response: any)=>{
      this.router.navigate(['/cafe/dashboard']);
    },
    (error: any) => {
      console.log(error);
    })
  }


  handleSignupAction(): void {
    console.log("Signup clicked");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent, dialogConfig)

  }

  handleForgotPasswordAction(): void {
    console.log("ForgotPassword clicked");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ForgotPasswordComponent, dialogConfig)

  }
  handleLoginAction(): void {
    console.log("Login clicked");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(LoginComponent, dialogConfig)

  }
}
