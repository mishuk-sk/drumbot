import { Component, OnInit } from '@angular/core';
import { WasmService } from '../../services/wasm.service';
import { EmWasmComponent } from '../../em-wasm.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent extends EmWasmComponent implements OnInit {
  fib: number;
  env= environment.wasmPath;
  constructor() {
    super();
    this.setupWasm('FibonacciModule', 'fibonacci.js', mod =>
      Object.assign(mod, {})
    );
    setTimeout(() => {
      this.fib = this.module.ccall('fib', 'number', ['number'], [20]);
    }, 2000);

  }

  ngOnInit() {}
}
