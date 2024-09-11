import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { httpClientInterceptor } from 'src/interceptor/http-client.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatTableModule, } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddModalComponent } from './component/add-modal/add-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { TypesService } from './services/types.service';
import { LoginModalComponent } from './component/login-modal/login-modal.component';
import { AuthService } from './services/auth.service';
import { ConfirmModalComponent } from './component/confirm-modal/confirm-modal.component';
import { ProcessoTjFieldModule } from './process-tj-field/processo-tj-field.module';

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ProcessoTjFieldModule,
  ],
  declarations: [
    AppComponent,
    AddModalComponent,
    LoginModalComponent,
    ConfirmModalComponent,
  ],
  entryComponents: [AddModalComponent, LoginModalComponent, ConfirmModalComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpClientInterceptor,
      multi: true
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    UsersService,
    TypesService,
    AuthService,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
