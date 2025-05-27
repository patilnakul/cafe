import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  // styleUrls: ['./sidebar.component.css']
})
export class AppSidebarComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    // Use (max-width: 768px) for mobile screens
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
