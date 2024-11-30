#include "commands.hpp"
#include <emscripten/console.h>

namespace commands {
    int rm(const std::string& args) {
        if (args.empty()) {
            emscripten_console_error("Usage: rm <filename>");
            return -1;
        }

        if (remove(args.c_str()) == 0) {
            return 0;
        } else {
            emscripten_console_error("Failed to delete file");
            return -1;
        }
    }
} 