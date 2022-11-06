import { ComponentType } from '@angular/cdk/portal';
import { Component, ElementRef, OnInit, ViewContainerRef, ViewChild, ComponentRef, Input, OnDestroy } from '@angular/core';
import { DialogContentAnchorDirective } from './dialog-content-anchor.directive';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @ViewChild(DialogContentAnchorDirective, { static: true }) dialogContent!: DialogContentAnchorDirective;

  constructor(
    private dialogService: DialogService
  ) { }

  private componentRef!: ComponentRef<unknown>;

  open(component: ComponentType<unknown>) {
    const viewContainerRef = this.dialogContent.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(component);
  }

  close() {
    this.dialogContent.viewContainerRef.clear();
    this.componentRef.destroy();
    this.dialogService.close();
  }
}
