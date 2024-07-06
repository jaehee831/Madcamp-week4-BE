#include <iostream>
#include "User.h"

    // Constructor
    User::User() {
    }

    // Destructor
    User::~User() {
    }

    void User::setName(const string& userName) {
        name = userName;
    }
    //print name function
    void User::printName() const {
        cout << "Your name is enrolled successfully, " << name << "." << endl;
    }
    //add item function
    void User::addItem(const string& item, int count) {
        itemMap[item] += count;
    }
    //remove item function
    void User::removeItem(const string& item, int count) {
        if (hasItem(item)) {
            itemMap[item] -= count;
            if (itemMap[item] <= 0) {
                itemMap.erase(item);  //Remove the item if the count is less than or equal to 0
            } //erase함수(std::map에서 제공)
        }
    }
    //show user's items function
    void User::showItems() const {
        cout << "User's items: ";
        for (const auto& pair : itemMap) { //pair객체
            cout << pair.first << "(" << pair.second << ") ";
        }
        cout << endl;
    }

    //check the user has a item
    bool User::hasItem(const string& item) const {
        //find함수(std::map에서 제공) : map에서 키 검색
        //키 존재 안하면 end() 반환 
        return itemMap.find(item) != itemMap.end();
    } 

    //check how many items the user has
    int User::getItemCount(const string& item) const {
        if (hasItem(item)) { //있는지 먼저 확인 
            return itemMap.at(item); //std::map에서 키(아이템 개수)에 해당하는 값을 반환
        }
        return 0; //false인 경우 
    }
