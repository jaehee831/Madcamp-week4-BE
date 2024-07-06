#include "Item.h" 
#include "User.h"
#include "HobbyGroup.h"
#include <fstream> //file i/o(ifstream, ofstream, fstream)
#include <iostream>

using namespace std;

//HobbyGroup Class
HobbyGroup::HobbyGroup() {
    // Default constructor
}

HobbyGroup::HobbyGroup(int select) {
    // Parameterized constructor
    selectionOpt = select;
}

HobbyGroup::~HobbyGroup() {
    // Destructor
}

void HobbyGroup::loadUsersFromFile(const string& fileName) {
    ifstream file(fileName); //To read user information from a file
    if (file.is_open()) {
        string line;
        //Reading data line by line from file, appending each line to the users vector
        while (getline(file, line)) {
            users.push_back(line);
        }
        file.close();
    }
}

void HobbyGroup::saveUsersToFile(const string& fileName) const {
    ofstream file(fileName); //open file, write data to file
    if (file.is_open()) {
        for (const auto& user : users) {
            file << user << endl; 
            //Access each element of the users vector and print the information to a file
        }
        file.close();
        cout << "User data saved to file." << endl;
    }
    else {
        cout << "Failed to open the file. Exiting the program." << endl;
    }
}

void HobbyGroup::displayUsersFromFile() const {
    // Display users in the hobby group
    cout << "Users in the hobby group:" << endl;
    for (const auto& user : users) {
        cout << user << endl;
    }
}

// Display MeetUp information
void HobbyGroup::displayMeetUpInfo() {
    cout << "----------------MeetUpInfo--------------" << endl;
    cout << "06.17\t library 1th floor\t <How to draw well>" << endl;
    cout << "06.17\t library 2th floor\t <Way to be a good cook>" << endl;
    cout << "06.18\t library 3th floor\t <Meet your favorite singer!>" << endl;
    cout << endl;
}

// Display Course information
void HobbyGroup::HobbyCourseList() {
    cout << "----------------HobbyCourseInfo--------------" << endl;
    cout << "06.19\t 1. <How to draw well>             instructor: David Hockney" << endl;
    cout << "06.19\t 2. <Way to be a good cook>        instructor: Gordon Ramsay" << endl;
    cout << "06.19\t 3. <Meet your favorite singer!>   instructor: Adele" << endl;
    cout << ">>";
}

// HobbyCourse Menu
void HobbyGroup::HobbyCourse() {
    int number;

    cout << "Which course do you want to join?" << endl;
    cout << ">>";
    cin >> number;

    switch (number) {
    case 1:
        cout << "1";
        break;
    case 2:
        cout << "2";
        break;
    case 3:
        cout << "3";
        break;
    }
    cout << "You are registered in class " << number << "." << endl;
}

// Mentorship Menu
void HobbyGroup::Mentorship() const {
    int choose;
    cout << "Choose your position.\n" << "1.Mentee\n2.Mentor\n>>" << endl;
    cin >> choose;
    switch (choose) {
    case 1:
        cout << "Thanks for participation. We will notice your mentor tomorrow." << endl;
        break;
    case 2:
        cout << "Thanks for participation. We will notice your mentee tomorrow." << endl;
        break;
    }
}

void HobbyGroup::displayMentorshipInfo() const {
    cout << "----------------MentorshipInfo--------------" << endl;
    cout << "06.25\t Cooking Mentorship Session" << endl;
    cout << "06.26\t Singing Mentorship Session" << endl;
    cout << "06.28\t Drawing Mentorship Session" << endl;
}

void HobbyGroup::eventCalendar() {
    // Show meetup, hobbyCourse, and mentorship schedule
    cout << "--------------Event Calendar---------------" << endl;
    displayMeetUpInfo();
    cout << "---------------------------------" << endl;
    HobbyCourseList();
    cout << "---------------------------------" << endl;
    displayMentorshipInfo();
    cout << endl;
}

// Show the hobby group menu to users
void HobbyGroup::groupMenu() {
    while (true) {
        int sel;
        cout << "----------------GroupMenu--------------" << endl;
        cout << "1. Item Market" << endl;
        cout << "2. Meet Up" << endl;
        cout << "3. Register a Hobby Course" << endl;
        cout << "4. Participate in Mentorship" << endl;
        cout << "5. Check Event Calendar" << endl;
        cout << "6. Exit" << endl;
        cout << ">>";

        std::cin.clear(); // initialize input buffer 입력버퍼 정상상태로 복원 
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); 
        // Clear input buffer
        // ignore character max값, 무시할 문자를 만나기 전까지의 입력을 처리(개행)

        cin >> sel;

        Item item;
        User user; //item에서 필요

        switch (sel) {
        case 1: {
            cout << "You selected Item Market." << endl;
            cout << endl;
            item.displayItemMarketGuide(selectionOpt);
            break;
        }
        case 2: {
            cout << "You selected Meet Up." << endl;
            cout << endl;
            displayMeetUpInfo();
            break;
        }
        case 3: {
            cout << "You selected Hobby Course." << endl;
            cout << endl;
            HobbyCourseList();
            HobbyCourse();
            break;
        }
        case 4: {
            cout << "You selected Mentorship." << endl;
            cout << endl;
            Mentorship();
            break;
        }
        case 5: {
            cout << "You selected Event Calendar." << endl;
            cout << endl;
            eventCalendar();
            break;
        }
        case 6: {
            cout << "Thank you for using our program. Exiting the program." << endl;
            return;
        }
        default: {
            cout << "Invalid selection. Please try again." << endl;
            break;
        }
        }
    }
}
