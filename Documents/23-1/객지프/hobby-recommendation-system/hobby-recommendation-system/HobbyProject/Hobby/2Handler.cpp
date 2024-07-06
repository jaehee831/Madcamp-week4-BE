#include "Handler.h"
#include <unordered_map> //based on hash table, link key and value
#include <iostream>

    // Constructor
    Handler::Handler() {
        selectedOption = 0; //strengthen safety, 예상치 못한 동작이 발생하는 것을 방지
    }

    // Destructor
    // Clean up any resources or perform any necessary cleanup tasks
    Handler::~Handler() {
    }

    void Handler::showMenu() {
        // select hobby 
        cout << "Select your hobby: " << endl;

        unordered_map<int, string> hobbyOptions = {
            //using hobbyOptions(unordered_map container)
            //offer fast search speed
            {1, "Cooking"}, 
            {2, "Drawing"},
            {3, "Singing"}
        };

        for (const auto& option : hobbyOptions) {
            //const: for safety, immutability
            //형식 추론을 통해 컨테이너의 요소를 참조 형식으로 읽기 전용으로 접근
            cout << option.first << ". " << option.second << endl;
        }

        // insert hobby 
        cout << ">> ";
        cin >> selectedOption;

    }

    void Handler::selectOption() {
        switch (selectedOption) {
        case 1:
            fileName = "cookNames.txt"; //assign each .txt file to variable
            break;
        case 2:
            fileName = "drawNames.txt";
            break;
        case 3:
            fileName = "singNames.txt";
            break;
        default:
            throw runtime_error("Invalid option. Exiting the program."); //exception handling
            
        }
    }

    void Handler::askUsers() {
        // ask users to enter their name 
        cout << "Enter your name: ";
        cin >> userName;

        // create an object of User class
        User user;
        user.setName(userName);
        user.printName();

        unique_ptr<HobbyGroup> hg;  // smart ptr
        //unq ptr frees memory when program exits
        //prevent memory leak  
        switch (selectedOption) {
        case 1:
            hg = make_unique<CookingGroup>(selectedOption); //make_unique function 
            break;
            //Pass the selectedOption value to the constructor of the CookingGroup class
            //Dynamically create CookingGroup object
            //The make_unique function returns a unique_ptr pointing to that object.
            //hg is dynamically allocated
        case 2:
            hg = make_unique<DrawingGroup>(selectedOption);
            break;
        case 3:
            hg = make_unique<SingingGroup>(selectedOption); 
            break;
        default:
            throw runtime_error("Invalid option. Exiting the program.");
        }

        //refer to HobbyGroup class
        hg->loadUsersFromFile(fileName);
        hg->addUser(userName);
        hg->saveUsersToFile(fileName);
        hg->displayUsersFromFile();
        hg->groupMenu();

        // No need to explicitly delete the smart pointer
        // Memory deallocation will be handled automatically
        //smart ptr
    }
