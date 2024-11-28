# Commands directory CMakeLists.txt
add_library(commands STATIC
    ls.cpp
    cat.cpp
    echo.cpp
    rm.cpp
    execute.cpp
)

target_include_directories(commands PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}) 