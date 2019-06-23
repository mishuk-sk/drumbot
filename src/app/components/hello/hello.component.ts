import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmWasmComponent } from '../../em-wasm.component';
import { environment } from '../../../environments/environment';
import { InitializeWasmService } from '../../services/initialize-wasm.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit, AfterViewInit {
  fib: number;
  private module: EmModule;
  private initialized = false;
  constructor(private wasmSrv: InitializeWasmService) {}

  ngAfterViewInit() {
    this.wasmSrv
      .setupWasm('FibonacciModule', 'fibonacci.js', mod =>
        Object.assign(mod, {})
      )
      .subscribe(mod =>
        setTimeout(() => {
          this.fib = mod.ccall('fibonacci', 'number', ['int'], [20]);
        }, 1000)
      );
  }

  getFib(): number {
    return this.module.ccall('fibonacci', 'number', ['int'], [20]);
  }
  ngOnInit() {}
}
