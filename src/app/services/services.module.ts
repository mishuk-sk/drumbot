import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WasmService } from './wasm.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    WasmService
  ]
})
export class ServicesModule { }
