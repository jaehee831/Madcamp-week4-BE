#include <iostream>
#include "DrawingGroup.h"
#include "HobbyGroup.h"
#include "User.h"

DrawingGroup::DrawingGroup(int selection) : HobbyGroup(selection)
{
    // Constructor for DrawingGroup, inheriting from HobbyGroup
}

void DrawingGroup::addUser(const string& userName) {
    // Function to add a user to the drawing group
    users.push_back(userName);
}

void DrawingGroup::displayMeetUpInfo() {
    // Function to display the meetup information
    cout << "----------------MeetUpInfo--------------" << endl;
    cout << "11.17\t library 1th floor\t <How to draw well>" << endl;
    cout << "11.17\t library 2th floor\t <Way to be a good painter>" << endl;
    cout << "11.18\t library 3th floor\t <Meet your favorite painter!>" << endl;
    cout << endl;
}

void DrawingGroup::HobbyCourseList() {
    // Function to display the hobby course information
    cout << "----------------HobbyCourseInfo--------------" << endl;
    cout << "11.19\t 1. <How to draw well>             instructor: David Hockney" << endl;
    cout << "11.19\t 2. <Way to be a good cook>        instructor: Gordon Ramsay" << endl;
    cout << "11.19\t 3. <Meet your favorite singer!>   instructor: Adele" << endl;
    cout << ">>";
}


