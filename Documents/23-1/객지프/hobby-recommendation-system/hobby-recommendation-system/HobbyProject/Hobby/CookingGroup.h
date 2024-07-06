#ifndef COOKINGGROUP_H
#define COOKINGGROUP_H
#include "HobbyGroup.h"

class CookingGroup : public HobbyGroup {
public:

    CookingGroup(int selection);

    void addUser(const string& userName) override;
    void displayMeetUpInfo() override;
    //display Course information
    void HobbyCourseList() override;
};
#endif
