cmake_minimum_required(VERSION 3.13.4)
project(kernel-wasm)

# Enable WebAssembly build
set(CMAKE_TOOLCHAIN_FILE $ENV{EMSDK}/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake)

# Set compiler flags for WebAssembly
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s WASM=1 -s EXPORTED_RUNTIME_METHODS=['ccall','cwrap','FS'] -s EXPORTED_FUNCTIONS=['_malloc','_free'] -s MODULARIZE=1 -s EXPORT_ES6=1 -s EXPORT_NAME=createKernel")

# Add source files
add_executable(kernel
    src/kernel.cpp
)

# Set output directory
set_target_properties(kernel PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/dist"
)

# Add commands directory
add_subdirectory(src/commands)

# Link against commands library
target_link_libraries(kernel PRIVATE commands)
 