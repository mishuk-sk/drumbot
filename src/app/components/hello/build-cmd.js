exports.cmd = 'emcc -Os src/app/components/hello/fibonacci.c -o src/assets/wasm/fibonacci.js -s EXTRA_EXPORTED_RUNTIME_METHODS="[\'ccall\']" -s MODULARIZE=1 -s EXPORT_NAME="FibonacciModule"';
