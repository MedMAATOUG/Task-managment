import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[Sidbarwidth]'
})
export class SidbarwidthDirective {
  @Input() set Sidbarwidth (val : number) {
    this.el.nativeElement.style.width = `${val}px`;
  }


  constructor(private el : ElementRef) { }

}
