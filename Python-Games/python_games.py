import random
import random
import pyautogui





def tic_tac_toe():

    board = [" ", " ", " ",
             " ", " ", " ",
             " ", " ", " "]

    print("\nTIC TAC TOE")
    print("You are X")

    while True:

       print()
       print(board[0], "|", board[1], "|", board[2])
       print("--+---+--")
       print(board[3], "|", board [4], "|", board [5])
       print("--+---+--")
       print(board[6], "|", board[7], "|", board [8])

       move = input("Choose 1-9: ")

       if move.isdigit():

           move = int(move)

           if  1 <= move <= 9:

               move = move - 1 

               if board[move] == " ":

                  board[move] = "x"

                  if check_win(board, "x"):
                     print("You win!")
                     break

                  
                  empty = []

               for i in range(9):
                   
                   if board[i] == " ":
                      empty.append(i)

               if len(empty) == 0:
                   print("Draw!")
                   break

               computer = random.choice(empty)
               board[computer] = "0"

               if check_win(board, "0"):
                    print("computer wins!")
                    break

               else:
                print("That place is taken.")

           else:
            print("choose between 1 and 9.")

       else:
        print("Enter a number.")

def check_win(board, player):

    if board[0] ==  player and board[1] == player and board[2] == player:
       return True

    if board[3] == player and board[4] == player and board[5] == player:
       return True

    if board[6] == player and board[7] == player and board[8] == player:
       return True

    if board[0] == player and board[3] == player and board[6] == player:
       return True

    if board[1] == player and board[4] == player and board[7] == player:
       return True

    if board[2] == player and board[5] == player and board[8] == player:
       return True

    if board[0] == player and board[4] == player and board[8] == player:
       return True

    if board[2] == player and board[4] == player and board[6] == player:
     return True

    return False

 

def number_guessing():

    number = random.randint(1, 100)

    tries = 10

    print("\nI picked a number between 1 and 100.")
    print("You have 10 tries")

    while tries > 0:

       guess = input("Guess: ")

       if guess.isdigit():

          guess = int(guess)

          tries = tries - 1

          if guess == number:

              print("correct!")
              return

          elif guess < number:
               
               print("Too low!")

          else:

              print("Too high!")  

          print("Tries left:", tries)

    else:

          print("Enter a number.")

print("You lost!")
print("The number was:", "number")



def word_guessing():


 file = open("words.txt", "r")

 words = file.readlines()

 file.close()


 file = open("meanings.txt", "r")

 meanings = file.readlines()
 file.close()

 number = random.randint(0, len(words) - 1)

 word = words[number].strip()
 meaning = meanings[number].strip()

 print("\nMeaning:")
 print(meaning)

 print("\nThe word has", len(word), "letters.")

 tries = 10 

 while tries > 0:
  guess = input("Guess: ")

 if guess.lower() ==word.lower():
     print("Correct!")
     return
  
 else:

    tries = tries - 1
  
 print("Wrong!")
 print("Tries left:", tries)

 print("You lost!")
 print("The word was:", word)




while True:

    print("\n================")
    print("     GAME HUB    ")
    print("=================")

    print("1. Tic Tac Toe")
    print("2. Number Guessing")
    print("3. Word Guessing")
    print("4. Exit")

    choice = input("\nChoose a game: ")


    if choice == "1":
     tic_tac_toe()

    elif choice == "2":
      number_guessing()

    elif choice == "3":
     word_guessing()

    elif choice == "4":
      print("Goodbye!")
      break

    else:
     print("Wrong choice!")