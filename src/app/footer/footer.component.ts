import { Component, HostListener, OnInit } from '@angular/core';
import { MaterialModule } from '../shared/material-module';
// import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-footer',
  imports: [MaterialModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

   @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
      scrollBtn.style.display = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 200 ? 'block' : 'none';
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
