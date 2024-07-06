#include <iostream>
#include "CookingGroup.h"
#include "HobbyGroup.h"
#include "User.h"

CookingGroup::CookingGroup(int selection) : HobbyGroup(selection)
{
    // Constructor for CookingGroup, inheriting from HobbyGroup
}

void CookingGroup::addUser(const string& userName) {
    // Function to add a user to the cooking group
    users.push_back(userName);
}

void CookingGroup::displayMeetUpInfo() {
    // Function to display the meetup information
    cout << "----------------MeetUpInfo--------------" << endl;
    cout << "10.17\t library 1th floor\t <How to cook well>" << endl;
    cout << "10.17\t library 2th floor\t <Way to be a good cook>" << endl;
    cout << "10.18\t library 3th floor\t <Meet your favorite cook!>" << endl;
    cout << endl;
}

void CookingGroup::HobbyCourseList() {
    // Function to display the hobby course information
    cout << "----------------HobbyCourseInfo--------------" << endl;
    cout << "10.19\t 1. <How to draw well>             instructor: David Hockney" << endl;
    cout << "10.19\t 2. <Way to be a good cook>        instructor: Gordon Ramsay" << endl;
    cout << "10.19\t 3. <Meet your favorite singer!>   instructor: Adele" << endl;
    cout << ">>";
}

