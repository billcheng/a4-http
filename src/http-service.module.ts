import { HttpService } from './service/http.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    HttpService
  ]
})
export class HttpServiceModule { }