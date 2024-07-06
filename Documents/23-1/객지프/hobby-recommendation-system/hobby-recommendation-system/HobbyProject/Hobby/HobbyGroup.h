#ifndef HOBBYGROUP_H
#define HOBBYGROUP_H

#include <vector>
#include <string>

using namespace std;

class HobbyGroup {
protected:

    //CookingGroup, DrawingGroup, and SingingGroup use this vector
    vector<string> users;
    int selectionOpt;

public:
    HobbyGroup();
    HobbyGroup(int select);
    ~HobbyGroup();

    //virtual function to implement addUser functionality
    virtual void addUser(const string& userName) = 0 ;

    //save user information in file
    void saveUsersToFile(const string& fileName) const;

    void loadUsersFromFile(const string& fileName);

    void displayUsersFromFile() const;

    //display MeetUp information
    virtual void displayMeetUpInfo();

    //display Course information
    virtual void HobbyCourseList();

    //HobbyCourse Menu
    void HobbyCourse();

    //Mentorship Menu
    void Mentorship() const;

    void displayMentorshipInfo() const;

    void eventCalendar();

    //show the hobby group menu to users
    void groupMenu();
};
#endif
