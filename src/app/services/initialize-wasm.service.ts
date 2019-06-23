import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { loadScript } from '../tools';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitializeWasmService {
  constructor() {}
  public setupWasm(
    moduleId: string,
    wasmJavaScriptLoader: string,
    moduleFactory: (mod: EmModule) => EmModule
  ) {
    const moduleObs = new Subject<EmModule>();
    loadScript(
      moduleId,
      `${environment.wasmPath}/${wasmJavaScriptLoader}`
    ).subscribe(() => {
      const baseModule = <EmModule>{
        locateFile: (file: string) => `${environment.wasmPath}/${file}`
      };

      moduleObs.next(window[moduleId](moduleFactory(baseModule)));
    });
    return moduleObs.asObservable();
  }
}
