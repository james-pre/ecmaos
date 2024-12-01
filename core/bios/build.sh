#!/bin/bash

echo "Should skip build? $SKIP_BUILD_BIOS"
if [ -n "$SKIP_BUILD_BIOS" ]; then
  exit 0
fi

# Ensure EMSDK is set
if [ -z "$EMSDK" ]; then
  echo "Error: EMSDK environment variable not set"
  echo "Please install and activate emscripten first"
  exit 1
fi

mkdir -p build
cd build

emcmake cmake ..
emmake make

echo "Build complete! Output files in build/dist/"
