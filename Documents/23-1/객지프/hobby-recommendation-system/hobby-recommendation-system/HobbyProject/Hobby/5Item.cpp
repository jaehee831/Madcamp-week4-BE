#include <iostream>
#include "Item.h"
#include "User.h"

Item::Item() {
    // Constructor
}

Item::~Item() {
    // Destructor
}

// Add item in itemList vector
void Item::addItem(const string& item) {
    itemList.push_back(item); // itemList 벡터 
}

// Remove item from itemList vector
void Item::removeItem(const string& item) {
    itemList.erase(remove(itemList.begin(), itemList.end(), item), itemList.end());
    //The std::remove algorithm removes elements matching item from the itemList vector.
    //The remove function returns the first position of the moved elements.
    //itemList 벡터에서 item과 일치하는 원소를 찾아서 벡터의 끝으로 이동-1st
    //std::remove 알고리즘 함수에게 벡터의 종료 위치(end position)를 알려주는 역할-2nd
    //erase 함수를 사용하여 제거된 원소들을 실제로 벡터에서 제거
}

// Show itemList
void Item::showItemList() const {
    cout << "Available items: ";
    for (const auto& item : itemList) {
        cout << item << " ";
    }
    cout << endl;
}

// Check if the input item is in itemList
bool Item::isValidItem(const string& item) const {
    return find(itemList.begin(), itemList.end(), item) != itemList.end();
    //Compare whether there is an item at the beginning ~ end of the itemList   
    // 반환된 반복자를 itemList.end()와 비교-같지 않다면 item이 존재하는 것->True반환 
}

// Item Market Guide function
void Item::displayItemMarketGuide(int hobbyChoice) {
    User user; // Create User object
    Item item; // Create Item object

    switch (hobbyChoice) {
    case 1:
        item.addItem("Pans");
        item.addItem("Stove");
        item.addItem("Cookingoil");
        break;
    case 2:
        item.addItem("Sketchbook");
        item.addItem("Sketchpencils");
        item.addItem("Eraser");
        break;
    case 3:
        item.addItem("Microphone");
        item.addItem("Speakers");
        item.addItem("Songbook");
        break;
    }

    cout << "Welcome to Item Market!" << endl;

    while (true) {
        // Show menu
        cout << "1. Show item list" << endl;
        cout << "2. Buy item" << endl;
        cout << "3. Sell item" << endl;
        cout << "4. Show user's items" << endl;
        cout << "5. Exit" << endl;
        cout << "Enter your choice: ";

        int choice;

        // Clear input buffer
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

        cin >> choice;

        cout << endl;

        if (choice == 1) {
            item.showItemList(); // Show item list
        }
        else if (choice == 2) {
            string itemName;
            cout << "Enter the item name to buy: ";
            cin >> itemName;

            if (item.isValidItem(itemName)) { //when user buy items
                int itemCount;
                cout << "Enter the number of items to buy: ";
                cin >> itemCount;

                user.addItem(itemName, itemCount); // Add item to user's inventory
                cout << "Item purchased successfully." << endl;
            }
            else {
                cout << "Invalid item name. Please enter the full option name." << endl; //isValidItem=false
            }
        }
        else if (choice == 3) { //when user sell items
            string itemName;
            cout << "Enter the item name to sell: ";
            cin >> itemName;

            if (item.isValidItem(itemName)) {
                int itemCount;
                cout << "Enter the number of items to sell: ";
                cin >> itemCount;

                if (user.hasItem(itemName) && user.getItemCount(itemName) >= itemCount) {
                    user.removeItem(itemName, itemCount); // Remove item from user's inventory
                    cout << "Item sold successfully." << endl;
                }
                else {
                    cout << "You don't have enough items to sell." << endl;
                }
            }
            else {
                cout << "Invalid item name." << endl;
            }
        }
        else if (choice == 4) {
            user.showItems(); // Show user's items
        }
        else if (choice == 5) {
            break; // Exit the loop
        }
        else {
            cout << "Invalid choice. Please try again." << endl;
        }

        cout << endl;
    }

    cout << "Thank you for visiting!" << endl;
}
