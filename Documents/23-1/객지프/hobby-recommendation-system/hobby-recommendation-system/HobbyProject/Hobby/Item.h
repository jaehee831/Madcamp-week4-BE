#ifndef ITEM_H
#define ITEM_H

#include <vector>
#include <string>

using namespace std;

class Item
{
private:
    //itemList vector
    vector<string> itemList;

public:
    Item();
    ~Item();
    void addItem(const string& item);
    void removeItem(const string& item);
    void showItemList() const;
    bool isValidItem(const string& item) const;
    void displayItemMarketGuide(int hobbyChoice);
};
#endif