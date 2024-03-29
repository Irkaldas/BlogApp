import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routing';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { ArticleResolverResolver } from './resolvers/article-resolver.resolver';
import { ErrorComponent } from './error/error.component';
import { ServicesModule } from './services/services.module';
import { StateModule } from './store/state.module';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { httpInterceptorProviders } from './shared/interceptors/interceptors.index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ArticleModule } from './store/article/article.module';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DialogService } from './shared/dialog/dialog.service';
import { DialogContentAnchorDirective } from './shared/dialog/dialog-content-anchor.directive';
import { REST_URL } from './services/articles.service';
import { SanitizeHtmlPipe } from './shared/pipe/sanitizeHTML.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    SnackBarComponent,
    DialogComponent,
    DialogContentAnchorDirective,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ArticleModule,
    StateModule,
    ServicesModule,
    routing,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    ArticleResolverResolver, DialogService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
