import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constant';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth: AuthService, public router: Router, private snackbarService: SnackbarService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray['expectedRole'];

    const token: any = localStorage.getItem('token');

    var tokenPayload: any;
    try {
      tokenPayload = jwtDecode(token);


    } catch (err) {

      localStorage.clear();
      this.router.navigate(['/']);
    }
    let expectedRole: string = '';

    for (let i = 0; i < expectedRoleArray['length']; i++) {
      if (expectedRoleArray[i] === tokenPayload.role) {
        expectedRole = tokenPayload.role;
        // break;
      }
    }

    if (tokenPayload.role === 'user' || tokenPayload.role === 'admin') {
      if (this.auth.isAuthenticated() && tokenPayload.role === expectedRole) {
        return true;
      }

      this.snackbarService.openSnackBar(GlobalConstants.unauthorized, 'error');
      this.router.navigate(['/cafe/dashboard']);
      return false;
    }
    else{
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }

  }
}
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { SnackbarService } from './snackbar.service';
// import { jwtDecode } from 'jwt-decode';
// import { GlobalConstants } from '../shared/global-constant';

// @Injectable({
//   providedIn: 'root'
// })
// export class RouteGuardService implements CanActivate {

//   constructor(
//     private auth: AuthService,
//     private router: Router,
//     private snackbarService: SnackbarService
//   ) {}

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const expectedRoles: string[] = route.data['expectedRole'];
//     const token = localStorage.getItem('token');

//     if (!token) {
//       this.handleUnauthorized();
//       return false;
//     }

//     let tokenPayload: any;
//     try {
//       tokenPayload = jwtDecode(token);
//     } catch (err) {
//       this.handleUnauthorized();
//       return false;
//     }

//     const userRole = tokenPayload?.role;

//     if (!userRole || !expectedRoles.includes(userRole)) {
//       this.snackbarService.openSnackBar(GlobalConstants.unauthorized, 'error');
//       this.router.navigate(['/cafe/dashboard']);
//       return false;
//     }

//     if (this.auth.isAuthenticated()) {
//       return true;
//     }

//     this.handleUnauthorized();
//     return false;
//   }

//   private handleUnauthorized(): void {
//     localStorage.clear();
//     this.router.navigate(['/']);
//   }
// }
