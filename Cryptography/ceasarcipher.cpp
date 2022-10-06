/*
Ceasar Cipher :
- Mono-alphabetic Cipher : Each letter is separately encryptedd using a key
- Shift Cipher : Each letter is shifted by a fixed amount of places
- Key : The key determines the shift of the letters. Ranges between [0,25]
- Example:
 - Plain text: "hacktoberfest"
 - Key(Shift): 3
 - Cipher text: "kdfnwrehuihvw"

*/
#include <iostream>
#include <string.h>
using namespace std;

int main()
{
    int choice, key;
    cout << "Enter your message" << endl;
    string nst;
    cin >> nst; 

    cout << "Enter key: ";
    cin >> key; // inputs the key of the cipher
    key=key%25;
    cout << "What would you wish to do? \n1. Encryption \n2. Decryption \n";
    cin >> choice;

    char ch;
    if (choice == 1) // Encryption
    {

        for (int i = 0; i<nst.length(); i++)
        {
            ch = nst[i];
            // valid for lowercase alplhabets
            if (ch >= 'a' && ch <= 'z')
            {
                ch = ch + key;
                if (ch > 'z')
                {
                    ch = ch - 'z' + 'a' - 1;
                }
                
                nst[i] = ch;
            }
            // valid for uppercase alphabets
            else if (ch >= 'A' && ch <= 'Z')
            {
                ch = ch + key;
                if (ch > 'Z')
                {
                    ch = ch - 'Z' + 'A' - 1;
                }
                nst[i] = ch;
            }
        }
        cout<<"Your encrypted text is: "<<nst;
    }
    else if (choice == 2)
    { //Decryption
        char ch;
        for (int i = 0; i<nst.length(); i++)
        {
            ch = nst[i];
            // decrypt for lowercase letter
            if (ch >= 'a' && ch <= 'z')
            {
                ch = ch - key;
                if (ch < 'a')
                {
                    ch = ch + 'z' - 'a' + 1;
                }
                nst[i] = ch;
            }
            // decryption for Uppercase letters
            else if (ch >= 'A' && ch <= 'Z')
            {
                ch = ch - key;
                if (ch < 'A')
                {
                    ch = ch + 'Z' - 'A' + 1;
                }
                nst[i] = ch;
            }
        }
        cout << "Decrypted cipher is: " << nst;
    }
}
