#!/bin/bash

# Ensure EMSDK is set
if [ -z "$EMSDK" ]; then
    echo "Error: EMSDK environment variable not set"
    echo "Please install and activate emscripten first"
    exit 1
fi

# Create build directory
mkdir -p build
cd build

# Configure and build
emcmake cmake ..
emmake make

echo "Build complete! Output files in build/dist/" 