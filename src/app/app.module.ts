import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ModelModule } from './model/model.module';
import { routing } from './app.routing';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { SingleItemResolverResolver } from './common/single-item-resolver.resolver';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ModelModule,
    NavBarModule,
    routing
  ],
  providers: [SingleItemResolverResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
