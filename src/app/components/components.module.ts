import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloComponent } from './hello/hello.component';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [HelloComponent],
  imports: [
    CommonModule,
    ServicesModule
  ]
})
export class ComponentsModule { }
