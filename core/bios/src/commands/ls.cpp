#include "commands.hpp"
#include <emscripten/console.h>
#include <dirent.h>
#include <sys/stat.h>

namespace commands {
    int ls(const std::string& args) {
        emscripten_console_log("ls command executing");
        const char* path = args.empty() ? "/" : args.c_str();
        
        emscripten_console_log("Listing directory:");
        emscripten_console_log(path);
        
        DIR* dir = opendir(path);
        if (!dir) {
            emscripten_console_error("Failed to open directory: ");
            emscripten_console_error(path);
            return -1;
        }

        struct dirent* entry;
        while ((entry = readdir(dir)) != nullptr) {
            std::string full_path = std::string(path);
            if (full_path.back() != '/') {
                full_path += '/';
            }
            full_path += entry->d_name;

            struct stat st;
            if (stat(full_path.c_str(), &st) == 0) {
                std::string entry_type = S_ISDIR(st.st_mode) ? "d" : "-";
                std::string entry_info = entry_type + " " + entry->d_name;
                emscripten_console_log(entry_info.c_str());
            } else {
                emscripten_console_log(entry->d_name);
            }
        }

        closedir(dir);
        return 0;
    }
} 