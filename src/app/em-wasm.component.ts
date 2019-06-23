import { AfterViewInit } from '@angular/core';
import { loadScript } from './tools';
import { environment } from '../environments/environment';

export abstract class EmWasmComponent implements AfterViewInit {
  protected module: EmModule;
  private moduleId: string;
  private wasmJavaScriptLoader: string;
  private moduleFactory: (mod: EmModule) => EmModule;
  protected setupWasm(
    moduleId: string,
    wasmJavaScriptLoader: string,
    moduleFactory: (mod: EmModule) => EmModule
  ) {
    this.moduleId = moduleId;
    this.moduleFactory = moduleFactory;
    this.wasmJavaScriptLoader = wasmJavaScriptLoader;
  }
  ngAfterViewInit(): void {
    loadScript(
      this.moduleId,
      `${environment.wasmPath}/${this.wasmJavaScriptLoader}`
    ).subscribe(() => {
      const baseModule = <EmModule>{
        locateFile: (file: string) => `${environment.wasmPath}/${file}`
      };
      const w = window[this.moduleId];
      console.log(w);
      this.module = w.new(this.moduleFactory(baseModule));
    });
  }
}
