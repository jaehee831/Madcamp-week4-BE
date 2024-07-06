#ifndef USER_H
#define USER_H

#include <unordered_map>
#include <string>

using namespace std;

class User {
private:
    string name;//user name
    unordered_map<string, int> itemMap;
public:
    User();
    ~User();
    void setName(const string& userName);
    //print name function
    void printName() const;
    //add item function
    void addItem(const string& item, int count = 1);
    //remove item function
    void removeItem(const string& item, int count = 1);
    //show user's items function
    void showItems() const;
    //check the user has a item
    bool hasItem(const string& item) const;
    //check how many items the user has
    int getItemCount(const string& item) const;
};
#endif