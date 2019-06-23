interface EmReadFileOptions {
  encoding?: 'utf8' | 'binary';
  flags?: string;
}

interface CcallOptions {
  async?: boolean;
}

interface EmModule {
  arguments?: string[];
  print?(what: string): void;
  printErr?(what: string): void;
  locateFile?(file: string): string;
  ccall?(funcName: string, returnType: string, argumentTypes: string[], arguments: any[], options?: CcallOptions): any;
  preRun?: Function[];
  postRun?: Function[];
  canvas?: HTMLCanvasElement;
  onRuntimeInitialized?(): void;

  FS_createDataFile?(parent: string, name: string, data: string | Uint8Array, canRead?: boolean, canWrite?: boolean, canOwn?: boolean): void;
  FS_createPreloadedFile?(parent: string, name: string, url: string, canRead?: boolean, canWrite?: boolean): void;
  FS_readFile?(url: string, options?: EmReadFileOptions): any;
  FS_unlink?(path: string): void;
}
