#include "commands.hpp"
#include <emscripten/console.h>
#include <fstream>

namespace commands {
    int echo(const std::string& args) {
        size_t gt_pos = args.find('>');
        if (gt_pos != std::string::npos) {
            std::string content = args.substr(0, gt_pos);
            std::string filename = args.substr(gt_pos + 1);
            
            // Trim whitespace
            content = content.substr(0, content.find_last_not_of(" \t") + 1);
            filename = filename.substr(filename.find_first_not_of(" \t"));
            
            std::ofstream file(filename);
            if (!file.is_open()) {
                emscripten_console_error("Failed to open file for writing");
                return -1;
            }
            
            file << content;
            return 0;
        } else {
            emscripten_console_log(args.c_str());
            return 0;
        }
    }
} 