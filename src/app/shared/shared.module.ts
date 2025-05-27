import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionanchorDirective } from './accordion/accordionanchor.directive';
import { AccordionlinkDirective } from './accordion/accordionlink.directive';
import { AccordionDirective } from './accordion/accordion.directive';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AccordionanchorDirective,
    AccordionlinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionanchorDirective,
    AccordionlinkDirective,
    AccordionDirective
  ]
})
export class SharedModule { }
