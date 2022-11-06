import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDialogContentAnchor]'
})
export class DialogContentAnchorDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
