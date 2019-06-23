#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int fibonacciRec(int num) {
  if (num <= 1)
    return 1;

  return fibonacciRec(num - 1) + fibonacciRec(num - 2);
}
