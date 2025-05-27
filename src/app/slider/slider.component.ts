import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-slider',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {
  slides = [
    {
      title: 'Fast Food Delight',
      description: 'Juicy burgers and crispy fries delivered hot and fast, straight to your door.',
      buttonText: 'Order Now',
      icon: 'fastfood'
    },
    {
      title: 'Cheesy Specials',
      description: 'Indulge in our cheesy, melty sandwiches — a comfort food classic reimagined.',
      buttonText: 'Order Now',
        icon: 'restaurant'
    },
    {
      title: 'Wrap & Roll',
      description: 'Spicy wraps packed with flavor — for when you’re on the go but craving bold taste.',
      buttonText: 'Order Now',
       icon: 'dinner_dining'
    }
  ];

  currentIndex = 0;
  containerWidth = 0;
  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    this.updateWidth();
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5000);
  }

  @HostListener('window:resize')
  updateWidth() {
    this.containerWidth = document.querySelector('.slider-container')?.clientWidth || 0;
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * this.containerWidth}px)`;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
