import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { routing } from './app.routing';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { ArticleResolverResolver } from './resolvers/article-resolver.resolver';
import { ErrorComponent } from './error/error.component';
import { ServicesModule } from './services/services.module';
import { StateModule } from './store/state.module';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { httpInterceptorProviders } from './shared/interceptors/interceptors.index';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NavBarModule,
    StateModule,
    ServicesModule,
    routing,
  ],
  providers: [
    ArticleResolverResolver,
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
