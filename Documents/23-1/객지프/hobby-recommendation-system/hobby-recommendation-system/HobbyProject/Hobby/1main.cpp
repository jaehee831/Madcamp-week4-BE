#include "User.h"
#include "Item.h"
#include "HobbyGroup.h"
#include "CookingGroup.h"
#include "DrawingGroup.h"
#include "SingingGroup.h"
#include "Handler.h"
#include <string> 

int main() {
    cout << "Welcome to the Hobby Management System!" << endl;

    try {
        Handler handler;
        handler.showMenu();
        handler.selectOption();
        handler.askUsers();
    }
    catch (const exception& e) { //예외객체 e
        cerr << "Error: " << e.what() << endl; //예외처리
    }
    // to prevent abnormal termination of the running program and to maintain the normal state

    return 0;
}