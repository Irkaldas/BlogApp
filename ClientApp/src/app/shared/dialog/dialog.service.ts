import { ComponentType } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, Inject, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  private factory!: ComponentFactory<any>;
  private dialogComponent!: ComponentRef<any>;

  open(component: ComponentType<unknown>) {

    this.factory = this.resolver.resolveComponentFactory(DialogComponent);
    this.dialogComponent = this.factory.create(this.injector);

    this.dialogComponent.instance.open(component);
    this.dialogComponent.hostView.detectChanges();

    this.appRef.attachView(this.dialogComponent.hostView);

    const { nativeElement } = this.dialogComponent.location;
    this.document.body.appendChild(nativeElement);
  }

  close() {
    this.appRef.detachView(this.dialogComponent.hostView);
    this.dialogComponent.destroy();
  }
}
