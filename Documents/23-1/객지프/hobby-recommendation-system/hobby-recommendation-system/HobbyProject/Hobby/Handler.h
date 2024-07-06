#ifndef HANDLER_H
#define HANDLER_H

#include <iostream>
#include <string>
#include "User.h"
#include "HobbyGroup.h"
#include "CookingGroup.h"
#include "DrawingGroup.h"
#include "SingingGroup.h"

using namespace std;

class Handler {
private:
    int selectedOption;
    string fileName;
    string userName;

public:

    // Constructor
    Handler();

    // Destructor
    // Clean up any resources or perform any necessary cleanup tasks
    ~Handler();

    void showMenu();
    void selectOption();
    void askUsers();
};
#endif
