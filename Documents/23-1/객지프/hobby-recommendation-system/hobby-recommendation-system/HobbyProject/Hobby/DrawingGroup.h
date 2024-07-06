#ifndef DRAWINGGROUP_H
#define DRAWINGGROUP_H
#include "HobbyGroup.h"

class DrawingGroup : public HobbyGroup {
public:
    DrawingGroup(int selection);

    void addUser(const string& userName) override;

    void displayMeetUpInfo() override;

    //display Course information
    void HobbyCourseList() override;
};
#endif

