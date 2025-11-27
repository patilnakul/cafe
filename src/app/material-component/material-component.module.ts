import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialComponentRoutingModule } from './material-component-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';

@NgModule({
  declarations: [],
  // imports: [
  //   MaterialComponentRoutingModule,
  // MatAutocompleteModule,
  //   MatButtonToggleModule,
  //   MatCardModule,
  //   MatCheckboxModule,
  //   MatChipsModule,
  //   MatDatepickerModule,
  //   MatNativeDateModule,
  //   MatExpansionModule,
  //   MatGridListModule,
  //   MatListModule,
  //   MatMenuModule,
  //   MatPaginatorModule,
  //   MatProgressBarModule,
  //   MatProgressSpinnerModule,
  //   MatRadioModule,
  //   MatSelectModule,
  //   MatSidenavModule,
  //   MatSliderModule,
  //   MatSlideToggleModule,
  //   MatSortModule,
  //   MatTableModule,
  //   MatTabsModule,
  //   MatTooltipModule,
  //   MatStepperModule,
  //   MatBadgeModule,
  //   MatBottomSheetModule,
  //   MatSnackBarModule,
  //   MatInputModule,
  //   MatIconModule,
  //   MatToolbarModule,
  //   MatButtonModule,
  //   MatDialogModule,
    

  // ],
  imports:[
    ViewBillProductsComponent,
    ConfirmationComponent,
  
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
     MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatStepperModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    // Add other Material modules here
    ViewBillProductsComponent
  ]
})
export class MaterialComponentModule { }
