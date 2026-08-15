```markdown
# Tic Tac Toe Game (Command Line)

A simple, interactive Tic Tac Toe game implemented in Python, playable directly from your terminal.

## How to Play

1.  **Save the code**: Ensure you have saved the provided Python code as `tic_tac_toe_game.py`.
2.  **Run from terminal**: Open your terminal or command prompt, navigate to the directory where you saved `tic_tac_toe_game.py`, and execute the script using Python:
    ```bash
    python tic_tac_toe_game.py
    ```
3.  **Follow the prompts**:
    *   The game board will be displayed, showing empty cells.
    *   Player 'X' goes first, followed by Player 'O'.
    *   When prompted, enter your move as `row,col` (e.g., `1,1` for the top-left corner, `2,3` for the middle-right cell). Rows and columns are numbered from 1 to 3.
    *   The game will update the board after each valid move and announce the winner or if the game ends in a draw.

## Game Rules

*   The game is played on a 3x3 grid.
*   Player 'X' always starts first.
*   Players take turns placing their marker ('X' or 'O') into an empty square.
*   The objective is to get three of your markers in a row, either horizontally, vertically, or diagonally. The first player to achieve this wins the game.
*   If all nine squares are filled and neither player has achieved three markers in a row, the game is declared a draw.

## Example Gameplay

```
Welcome to Command-Line Tic Tac Toe!
Players will take turns entering their desired row and column (e.g., 1,1 for top-left).
Rows and columns are numbered 1 to 3.


   |   |
---|---|---
   |   |
---|---|---
   |   |


Player X, enter your move (row, col, e.g., 1,2): 1,1


 X |   |
---|---|---
   |   |
---|---|---
   |   |


Player O, enter your move (row, col, e.g., 1,2): 2,2


 X |   |
---|---|---
   | O |
---|---|---
   |   |


Player X, enter your move (row, col, e.g., 1,2): 1,2


 X | X |
---|---|---
   | O |
---|---|---
   |   |


Player O, enter your move (row, col, e.g., 1,2): 3,2


 X | X |
---|---|---
   | O |
---|---|---
   | O |


Player X, enter your move (row, col, e.g., 1,2): 1,3


 X | X | X
---|---|---
   | O |
---|---|---
   | O |


🎉 Congratulations! Player X wins! 🎉

Game Over. Thanks for playing!
```

## Code Structure

The game logic is encapsulated within a single Python file (`tic_tac_toe_game.py`) with the following key functions:

*   `create_board()`: Initializes an empty 3x3 game board.
*   `display_board(board)`: Prints the current state of the board in a user-friendly format.
*   `get_player_move(current_player, board)`: Prompts the current player for their move, validates the input, and ensures the chosen cell is empty.
*   `place_marker(board, row, col, marker)`: Updates the board with the player's marker at the specified coordinates.
*   `check_win(board, marker)`: Determines if the given `marker` has achieved a winning condition (three in a row, column, or diagonal).
*   `check_draw(board)`: Checks if the game has resulted in a draw (all cells filled without a winner).
*   `play_game()`: The main function that orchestrates the entire game flow, managing turns, displaying the board, and checking for game-ending conditions.

---