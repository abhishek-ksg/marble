import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRouteModule } from './app-route.module';
import { AppComponent } from './app.component';
import { ProdusctsModule } from './products/products.module';
import { EmployeeFormModule } from './employeeForm/employee-form.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { CustomerModule } from './customerSignUp/customer.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ProdusctsModule,
    EmployeeFormModule,
    CustomerModule,
    AppRouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
