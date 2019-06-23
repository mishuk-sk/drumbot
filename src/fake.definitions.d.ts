declare namespace WebAssembly {
    interface CompileError {
    }

    var CompileError: {
        prototype: CompileError;
        new(): CompileError;
    };

    interface Global {
        value: any;
        valueOf(): any;
    }

    var Global: {
        prototype: Global;
        new(descriptor: GlobalDescriptor, value?: any): Global;
    };

    interface Instance {
        readonly exports: any;
    }

    var Instance: {
        prototype: Instance;
        new(module: Module, importObject?: any): Instance;
    };

    interface LinkError {
    }

    var LinkError: {
        prototype: LinkError;
        new(): LinkError;
    };

    interface Memory {
        readonly buffer: ArrayBuffer;
        grow(delta: number): number;
    }

    var Memory: {
        prototype: Memory;
        new(descriptor: MemoryDescriptor): Memory;
    };

    interface Module {
    }

    var Module: {
        prototype: Module;
        new(bytes: BufferSource): Module;
        customSections(module: Module, sectionName: string): ArrayBuffer[];
        exports(module: Module): ModuleExportDescriptor[];
        imports(module: Module): ModuleImportDescriptor[];
    };

    interface RuntimeError {
    }

    var RuntimeError: {
        prototype: RuntimeError;
        new(): RuntimeError;
    };

    interface Table {
        readonly length: number;
        get(index: number): Function | null;
        grow(delta: number): number;
        set(index: number, value: Function | null): void;
    }

    var Table: {
        prototype: Table;
        new(descriptor: TableDescriptor): Table;
    };

    interface GlobalDescriptor {
        mutable?: boolean;
        value: string;
    }

    interface MemoryDescriptor {
        initial: number;
        maximum?: number;
    }

    interface ModuleExportDescriptor {
        kind: ImportExportKind;
        name: string;
    }

    interface ModuleImportDescriptor {
        kind: ImportExportKind;
        module: string;
        name: string;
    }

    interface TableDescriptor {
        element: TableKind;
        initial: number;
        maximum?: number;
    }

    interface WebAssemblyInstantiatedSource {
        instance: Instance;
        module: Module;
    }

    type ImportExportKind = "function" | "table" | "memory" | "global";
    type TableKind = "anyfunc";
    function compile(bytes: BufferSource): Promise<Module>;
    function instantiate(bytes: BufferSource, importObject?: any): Promise<WebAssemblyInstantiatedSource>;
    function instantiate(moduleObject: Module, importObject?: any): Promise<Instance>;
    function validate(bytes: BufferSource): boolean;
}

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
  FS_createDataFile?(parent: string, name: string, data: string | Uint8Array, canRead?: boolean, canWrite?: boolean, canOwn?: boolean): void;
  FS_createPreloadedFile?(parent: string, name: string, url: string, canRead?: boolean, canWrite?: boolean): void;
  FS_readFile?(url: string, options?: EmReadFileOptions): any;
  FS_unlink?(path: string): void;
}
