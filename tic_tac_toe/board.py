"""
board.py
Manages the Tic-Tac-Toe game board's state and display.
"""

class Board:
    """
    Represents the Tic-Tac-Toe game board.
    """
    def __init__(self):
        """
        Initializes a 3x3 Tic-Tac-Toe board with empty spaces.
        The board is represented as a list of lists.
        """
        self.board = [[' ' for _ in range(3)] for _ in range(3)]

    def display(self):
        """
        Prints the current state of the board to the console in a user-friendly format.
        """
        print("
--- TIC-TAC-TOE ---")
        for i, row in enumerate(self.board):
            # Print each row with marks separated by '|'
            print(" | ".join(row))
            # Print a separator line between rows, but not after the last row
            if i < 2:
                print("---------")
        print("-------------------
")

    def is_valid_move(self, row, col):
        """
        Checks if a proposed move is valid.
        A move is valid if:
        1. The row and column are within the board's bounds (0-2).
        2. The chosen cell is currently empty.

        Args:
            row (int): The row index for the move.
            col (int): The column index for the move.

        Returns:
            bool: True if the move is valid, False otherwise.
        """
        # Check if row and column are within valid range [0, 2]
        if not (0 <= row < 3 and 0 <= col < 3):
            print("Invalid move: Row and column must be between 0 and 2.")
            return False
        # Check if the chosen cell is empty
        if self.board[row][col] != ' ':
            print("Invalid move: That cell is already taken. Please choose an empty cell.")
            return False
        return True

    def make_move(self, row, col, player_mark):
        """
        Places the player's mark on the board at the specified row and column.
        Assumes the move has already been validated.

        Args:
            row (int): The row index for the move.
            col (int): The column index for the move.
            player_mark (str): The mark of the player making the move ('X' or 'O').
        """
        self.board[row][col] = player_mark

    def is_full(self):
        """
        Checks if the board is completely full (no empty cells remaining).

        Returns:
            bool: True if the board is full, False otherwise.
        """
        for row in self.board:
            if ' ' in row:
                return False  # Found an empty cell, so the board is not full
        return True  # No empty cells found, board is full

    def get_board_state(self):
        """
        Returns the raw 2D list representing the current board state.
        This is useful for passing the board state to game rule functions
        without exposing the entire Board object.

        Returns:
            list[list[str]]: The current 3x3 board state.
        """
        return self.board