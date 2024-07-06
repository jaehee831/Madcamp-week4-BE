#include "SingingGroup.h"
#include "HobbyGroup.h"
#include "User.h"
#include <iostream>

SingingGroup::SingingGroup(int selection) : HobbyGroup(selection)
{
    // Constructor for SingingGroup, inheriting from HobbyGroup
}

void SingingGroup::addUser(const string& userName) {
    // Function to add a user to the singing group
    users.push_back(userName);
}

void SingingGroup::displayMeetUpInfo() {
    // Function to display the meetup information
    cout << "----------------MeetUpInfo--------------" << endl;
    cout << "12.17\t library 1th floor\t <How to sing well>" << endl;
    cout << "12.17\t library 2th floor\t <Way to be a good singer>" << endl;
    cout << "12.18\t library 3th floor\t <Meet your favorite singer!>" << endl;
    cout << endl;
}

void SingingGroup::HobbyCourseList() {
    // Function to display the hobby course information
    cout << "----------------HobbyCourseInfo--------------" << endl;
    cout << "12.19\t 1. <How to draw well>             instructor: David Hockney" << endl;
    cout << "12.19\t 2. <Way to be a good cook>        instructor: Gordon Ramsay" << endl;
    cout << "12.19\t 3. <Meet your favorite singer!>   instructor: Adele" << endl;
    cout << ">>";
}
