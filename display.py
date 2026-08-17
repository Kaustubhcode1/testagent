Content of file 3
```python
"""
Functions for displaying the Tic Tac Toe board and messages to the console.
Handles user input for moves.
"""

from constants import EMPTY_CELL, BOARD_SIZE

def display_board(board: list[list[str]]):
    """
    Prints the current state of the Tic Tac Toe board to the console.

    Args:
        board (list[list[str]]): The 2D list representing the game board.