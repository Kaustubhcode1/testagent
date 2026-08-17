Content of file 4
```python
"""
Main entry point for the Tic Tac Toe console application.
Orchestrates game flow, user interaction, and calls game logic and display functions.
"""

from game_logic import TicTacToeGame
from display import display_board, display_message, get_player_input
from constants import BOARD_SIZE

def main():
    """
    Runs the main Tic Tac Toe game loop.
    Initializes the game, handles player turns, input, and displays game status.
    """
    game = TicTacToeGame()
    display_message("Welcome to Tic Tac Toe!")
    display_message("Players take turns marking a cell. First to get 3 in a row, column, or diagonal wins!")

    while not game.is_game_over():
        display_board(game.get_board())
        current_player = game.get_current_player()
        display_message(f"Player {current_player}'s turn.")

        try:
            # Get row input (1-indexed from user, convert to 0-indexed)
            row_input = get_player_input(f"Enter row (1-{BOARD_SIZE}): ")
            row = int(row_input) - 1

            # Get column input (1-indexed from user, convert to 0-indexed)
            col_input = get_player_input(f"Enter column (1-{BOARD_SIZE}): ")
            col = int(col_input) - 1

            # Validate input range before making a move
            if not (0 <= row < BOARD_SIZE and 0 <= col < BOARD_SIZE):
                display_message(f"Invalid row or column. Please enter numbers between 1 and {BOARD_SIZE}.")
                continue # Ask for input again

            # Attempt to make the move
            if not game.make_move(row, col):
                display_message("Invalid move. That cell is already taken. Try again.")

        except ValueError:
            display_message("Invalid input. Please enter numbers for row and column.")
        except Exception as e:
            display_message(f"An unexpected error occurred: {e}")

    # Game is over, display final board and result
    display_board(game.get_board())
    winner = game.get_winner()

    if winner:
        display_message(f"Game Over! Player {winner} wins!")
    else:
        display_message("Game Over! It's a draw!")

    display_message("Thanks for playing!")

if __name__ == "__main__":
    main()
"""
file_blocks = files_content.strip().split('