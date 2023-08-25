import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[ContentPosition]'
})
export class ContentPositionDirective {
@Input() set ContentPosition(value : number){
  this.el.nativeElement.style.left = `${value}px`;
}
  constructor(private el : ElementRef) {
   }

}
