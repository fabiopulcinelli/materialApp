import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { Pagina2Component } from './components/pagina2/pagina2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailUserDialogComponent } from './components/detail-user-dialog/detail-user-dialog.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    DetailUserComponent,
    ToolbarComponent,
    SidenavComponent,
    Pagina2Component,
    DetailUserDialogComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
