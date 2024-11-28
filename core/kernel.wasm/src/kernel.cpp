#include <emscripten.h>
#include <string>
#include <emscripten/console.h>
#include "commands/commands.hpp"
#include <fstream>
#include <ios>
#include <sys/types.h>
#include <sys/stat.h>
#include <dirent.h>
#include <cstring>

void init_console_handlers() {
    EM_ASM(
        var oldLog = console.log;
        var oldError = console.error;
        
        console.log = function(text) {
            globalThis.log(text, 'info');
            oldLog.apply(console, arguments);
        };
        
        console.error = function(text) {
            globalThis.log(text, 'error');
            oldError.apply(console, arguments);
        };
    );
}

extern "C" {
    enum class KernelState {
        BOOTING,
        RUNNING,
        PANIC,
        SHUTDOWN
    };

    // Initialize kernel and return state
    EMSCRIPTEN_KEEPALIVE
    int init() {
        init_console_handlers();
        emscripten_console_log("Kernel initializing...");
        emscripten_console_warn("This is an experimental WASM kernel");
        return static_cast<int>(KernelState::RUNNING);
    }

    // Get kernel version
    EMSCRIPTEN_KEEPALIVE
    const char* get_version() {
        emscripten_console_log("Version requested");
        static const char version[] = "0.1.0-wasm";
        return version;
    }

    // Execute a command in the WASM kernel
    EMSCRIPTEN_KEEPALIVE
    int execute(const char* command) {
        if (command && *command) {  // Check if command is valid and not empty
            // emscripten_console_log(command);
            std::string cmd(command);  // Create a proper C++ string
            return commands::execute_command(cmd);
        }
        emscripten_console_error("Empty or invalid command");
        return -1;
    }

    // Write file to emscripten virtual filesystem
    EMSCRIPTEN_KEEPALIVE
    int write_file(const char* path, const char* content) {
        try {
            std::ofstream file(path, std::ios::binary);
            if (!file.is_open()) {
                emscripten_console_error("Failed to open file for writing");
                return -1;
            }
            
            file.write(content, strlen(content));
            file.close();
            
            emscripten_console_log("File written successfully");
            return 0;
        } catch (const std::exception& e) {
            emscripten_console_error(e.what());
            return -1;
        }
    }

    // Read file from emscripten virtual filesystem
    EMSCRIPTEN_KEEPALIVE
    char* read_file(const char* path) {
        try {
            std::ifstream file(path, std::ios::binary | std::ios::ate);
            if (!file.is_open()) {
                emscripten_console_error("Failed to open file for reading");
                return nullptr;
            }

            auto size = file.tellg();
            file.seekg(0, std::ios::beg);

            // Allocate memory that will be freed by JavaScript
            char* buffer = (char*)malloc(static_cast<size_t>(size) + 1);
            if (!buffer) {
                emscripten_console_error("Failed to allocate memory");
                return nullptr;
            }

            if (!file.read(buffer, size)) {
                free(buffer);
                emscripten_console_error("Failed to read file");
                return nullptr;
            }

            buffer[size] = '\0';
            return buffer;
        } catch (const std::exception& e) {
            emscripten_console_error(e.what());
            return nullptr;
        }
    }

    // Check if file exists
    EMSCRIPTEN_KEEPALIVE
    int file_exists(const char* path) {
        struct stat st;
        return stat(path, &st) == 0 ? 1 : 0;
    }

    // Delete file
    EMSCRIPTEN_KEEPALIVE
    int delete_file(const char* path) {
        if (remove(path) == 0) {
            emscripten_console_log("File deleted successfully");
            return 0;
        } else {
            emscripten_console_error("Failed to delete file");
            return -1;
        }
    }

    // List files in a directory
    EMSCRIPTEN_KEEPALIVE
    char* list_directory(const char* path) {
        DIR* dir = opendir(path);
        if (!dir) {
            emscripten_console_error("Failed to open directory");
            return nullptr;
        }

        std::string result;
        struct dirent* entry;
        
        while ((entry = readdir(dir)) != nullptr) {
            result += entry->d_name;
            result += "\n";
        }

        closedir(dir);

        // Allocate and copy result string
        char* buffer = (char*)malloc(result.size() + 1);
        if (!buffer) {
            emscripten_console_error("Failed to allocate memory for directory listing");
            return nullptr;
        }
        
        strcpy(buffer, result.c_str());
        return buffer;
    }
} 