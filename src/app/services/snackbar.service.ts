import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, type: 'success' | 'error' = 'success') {
    const icon = type === 'error' ? '❌' : '✅'; 

    const panelClass = type === 'error' ? 'black-snackbar' : 'green-snackbar';

    this.snackBar.open(`${icon} ${message}`, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: [panelClass]
    });
  }
}
