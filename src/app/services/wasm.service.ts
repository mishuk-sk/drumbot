import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WasmService {
  module: any;

  wasmReady = new BehaviorSubject<boolean>(false);
  wasmInstance: WebAssembly.Instance;
  constructor(private http: HttpClient) {
    this.http
      .get('assets/text.json', { responseType: 'arraybuffer' })
      .subscribe(res =>
        console.log(String.fromCharCode.apply(null, new Uint8Array(res)))
      );
    this.instantiateWasm(environment.wasmPath + '/output.wasm').subscribe(
      result => {
        this.wasmInstance = result.instance;
        console.log(result);
        console.log(result.instance.exports.fibonacci(10));
        this.wasmReady.next(true);
      }
    );
  }

  private instantiateWasm(
    url: string
  ): Observable<WebAssembly.WebAssemblyInstantiatedSource> {
    // fetch the wasm file
    const imports = {
      env: {
        memory: new WebAssembly.Memory({ initial: 256, maximum: 256 })
      }
    };
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
      mergeMap(bytes => {
        const instance = WebAssembly.instantiate(bytes, imports);
        instance.then(int=>console.log(int));
        return instance;
      })
    );
    /*
    // convert it into a binary array
    const buffer = await wasmFile.arrayBuffer();
    const binary = new Uint8Array(buffer);

    // create module arguments
    // including the wasm-file
    const moduleArgs = {
      wasmBinary: binary,
      onRuntimeInitialized: () => {
        this.wasmReady.next(true);
      }
    };

    // instantiate the module
    this.module = Module(moduleArgs);*/
  }

  public fibonacci(input: number): Observable<number> {
    return this.wasmReady.pipe(filter(value => value === true)).pipe(
      map(() => {
        return this.wasmInstance.exports._fibonacci(input);
      })
    );
  }
}
