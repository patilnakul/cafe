import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material-module';
import { AppHeaderComponent } from '../../../layouts/full/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'], // Note: this must be plural: 'styleUrls'
  imports: [
    MaterialModule,
    HttpClientModule
  ],
  providers: [UserService, SnackbarService]
})
export class ConfirmationComponent implements OnInit {

  @Output() onEmitStatusChange = new EventEmitter(); // Proper naming convention with @Output
  details: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    if (this.dialogData && this.dialogData.confirmation) {
      this.details = this.dialogData;
    }
  }

  handleChangeAction() {
    this.onEmitStatusChange.emit();
  }
}
