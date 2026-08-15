"""
main.py
This is the main entry point for the Tic-Tac-Toe game.
It orchestrates the game flow, managing turns, checking game state,
and interacting with the user.
"""

from board import Board
from player import Player
from game_rules import check_win, check_draw

class TicTacToeGame:
    """
    Manages the overall flow and state of a Tic-Tac-Toe game.
    """
    def __init__(self):
        """
        Initializes the Tic-Tac-Toe game with a new board and two players.
        Sets the initial current player to 'X' and the game state to not over.
        """
        self.board = Board()
        self.player_x = Player('X')
        self.player_o = Player('O')
        self.current_player = self.player_x  # Player X starts
        self.game_over = False

    def _switch_player(self):
        """
        Switches the current player from 'X' to 'O' or vice-versa.
        """
        self.current_player = self.player_o if self.current_player == self.player_x else self.player_x

    def play(self):
        """
        Runs the main game loop.
        It handles player turns, validates moves, updates the board,
        and checks for win or draw conditions after each move.
        """
        print("Welcome to Command-Line Tic-Tac-Toe!")
        print("Players will enter their moves as 'row col' (e.g., '0 0' for top-left, '2 2' for bottom-right).")

        while not self.game_over:
            self.board.display()  # Show the current board state
            print(f"It's Player {self.current_player.mark}'s turn.")

            # Get move input from the current player
            row, col = self.current_player.get_move()

            # Validate the move using the board's logic
            if self.board.is_valid_move(row, col):
                self.board.make_move(row, col, self.current_player.mark) # Apply the valid move

                # Get the raw board state for rule checking
                board_state = self.board.get_board_state()

                # Check for a win condition
                if check_win(board_state, self.current_player.mark):
                    self.board.display() # Display final board
                    print(f"Congratulations! Player {self.current_player.mark} wins!")
                    self.game_over = True
                # Check for a draw condition (only if no one has won)
                elif check_draw(board_state):
                    self.board.display() # Display final board
                    print("It's a draw! No more moves possible and no winner.")
                    self.game_over = True
                else:
                    # If no win or draw, switch to the next player
                    self._switch_player()
            else:
                # If the move was invalid, the current player tries again.
                # The `is_valid_move` method already prints an error message.
                pass 

        print("
Game Over. Thanks for playing!")

if __name__ == "__main__":
    # This block ensures the game starts when main.py is executed directly
    game = TicTacToeGame()
    game.play()