#include "commands.hpp"
#include <emscripten/console.h>
#include <fstream>

namespace commands {
    int cat(const std::string& args) {
        if (args.empty()) {
            emscripten_console_error("Usage: cat <filename>");
            return -1;
        }

        std::ifstream file(args, std::ios::binary | std::ios::ate);
        if (!file.is_open()) {
            emscripten_console_error("Failed to open file");
            return -1;
        }

        std::streamsize size = file.tellg();
        file.seekg(0, std::ios::beg);

        std::string content(size, '\0');
        if (!file.read(&content[0], size)) {
            emscripten_console_error("Failed to read file");
            return -1;
        }

        emscripten_console_log(content.c_str());
        return 0;
    }
} 