#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define WIN_MULTIPLIER 10
#define GUESS_RANGE 5
#define INITIAL_BALANCE 200
#define MIN_BALANCE 100
#define GUESS_COST 100
#define MAX_ATTEMPTS 3

typedef struct {
    char name[50];
    int balance;
} User;

User users[MAX_USERS];
int userCount = 0;

void addUser(char* name) {
    strcpy(users[userCount].name, name);
    users[userCount].balance = INITIAL_BALANCE;
    userCount++;
}

int findUser(char* name) {
    for (int i = 0; i < userCount; i++) {
        if (strcmp(users[i].name, name) == 0) {
            return i;
        }
    }
    return -1;
}

void playGame(User* user) {
    int guess;
    int secretNumber;
    char choice;
    int attempts = 0;

    srand(time(0));  // Seed for random number generation

    while (attempts < MAX_ATTEMPTS && user->balance >= GUESS_COST) {
        secretNumber = rand() % (GUESS_RANGE + 1);

        printf("Your current account balance: Ksh %d\n", user->balance);
        printf("Guess the secret number (between 0 and %d): ", GUESS_RANGE);
        scanf("%d", &guess);

        user->balance -= GUESS_COST;

        if (guess == secretNumber) {
            printf("Congratulations! You guessed the correct number.\n");
            user->balance += GUESS_COST * WIN_MULTIPLIER;
            break;
        } else {
            printf("Sorry, the secret number was %d. You guessed %d.\n", secretNumber, guess);
        }

        attempts++;
        printf("Your updated account balance: Ksh %d\n", user->balance);

        if (attempts < MAX_ATTEMPTS) {
            printf("Do you want to play again? (y/n): ");
            scanf(" %c", &choice);
            if (choice != 'y' && choice != 'Y') {
                printf("Thank you for playing!\n");
                break;
            }
        }
    }
}

int main() {
    char name[50];
    int choice;

    while (1) {
        printf("1. Add User\n");
        printf("2. Select User\n");
        printf("3. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        if (choice == 1) {
            if (userCount >= MAX_USERS) {
                printf("User limit reached. Cannot add more users.\n");
                continue;
            }
            printf("Enter user name: ");
            scanf("%s", name);
            addUser(name);
            printf("User %s added with initial balance Ksh %d\n", name, INITIAL_BALANCE);
        } else if (choice == 2) {
            printf("Enter user name: ");
            scanf("%s", name);
            int userIndex = findUser(name);
            if (userIndex == -1) {
                printf("User not found:()!\n");
                continue;
            }
            playGame(&users[userIndex]);
        } else if (choice == 3) {
            printf("Exiting the game...\n Goodbye!\n");
            break;
        } else {
            printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}
