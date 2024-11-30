#pragma once
#include <string>

namespace commands {
    // Command function type definition
    typedef int (*CommandFunction)(const std::string& args);

    // Command functions
    int ls(const std::string& args);
    int cat(const std::string& args);
    int echo(const std::string& args);
    int rm(const std::string& args);

    // Command registration and execution
    int execute_command(const std::string& command);
} 