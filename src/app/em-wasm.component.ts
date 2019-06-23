import { AfterViewInit } from '@angular/core';
import { loadScript } from './tools';
import { environment } from '../environments/environment';
import { Observable, Subscriber, Subject } from 'rxjs';

export abstract class EmWasmComponent implements AfterViewInit {
  private initializedModule: Subject<EmModule>;
  private moduleId: string;
  private wasmJavaScriptLoader: string;
  private moduleFactory: (mod: EmModule) => EmModule;
  constructor(){
    this.initializedModule = new Subject<EmModule>();
  }
  protected setupWasm(
    moduleId: string,
    wasmJavaScriptLoader: string,
    moduleFactory: (mod: EmModule) => EmModule
  ):Observable<EmModule> {
    this.moduleId = moduleId;
    this.moduleFactory = moduleFactory;
    this.wasmJavaScriptLoader = wasmJavaScriptLoader;
    return this.initializedModule.asObservable();
  }
  ngAfterViewInit(): void {
    loadScript(
      this.moduleId,
      `${environment.wasmPath}/${this.wasmJavaScriptLoader}`
    ).subscribe(() => {
      const baseModule = <EmModule>{
        locateFile: (file: string) => `${environment.wasmPath}/${file}`
      };
      this.initializedModule.next(window[this.moduleId](this.moduleFactory(baseModule)));
      this.initializedModule.complete();
    });
  }
}
