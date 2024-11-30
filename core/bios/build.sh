#!/bin/bash

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
