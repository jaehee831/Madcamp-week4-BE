#ifndef SINGINGRGROUP_H
#define SINGINGRGROUP_H
#include "HobbyGroup.h"

using namespace std;

class SingingGroup : public HobbyGroup {
public:
    SingingGroup(int selection);

    void addUser(const string& userName) override;

    void displayMeetUpInfo() override;

    //display Course information
    void HobbyCourseList() override;
};
#endif

