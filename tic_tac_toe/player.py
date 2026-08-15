"""
player.py
Defines the Player class, handling player-specific attributes and input.
"""

class Player:
    """
    Represents a player in the Tic-Tac-Toe game.
    """
    def __init__(self, mark):
        """
        Initializes a Player with their assigned game mark ('X' or 'O').

        Args:
            mark (str): The player's mark, either 'X' or 'O'.
        
        Raises:
            ValueError: If the provided mark is not 'X' or 'O'.
        """
        if mark not in ['X', 'O']:
            raise ValueError("Player mark must be 'X' or 'O'")
        self.mark = mark

    def get_move(self):
        """
        Prompts the player for their desired move (row and column) and
        validates the input format. It loops until valid input is received.

        Returns:
            tuple[int, int]: A tuple (row, col) representing the player's chosen move.
        """
        while True:
            try:
                # Prompt for input, e.g., "0 1" for row 0, col 1
                move_str = input(f"Player {self.mark}, enter your move (row col, e.g., 0 1): ")
                
                # Split the input string into two parts
                row_str, col_str = move_str.split()
                
                # Convert parts to integers
                row, col = int(row_str), int(col_str)
                
                return row, col
            except ValueError:
                # Catches errors if conversion to int fails or split doesn't yield two parts
                print("Invalid input format. Please enter two numbers separated by a space (e.g., 0 1).")
            except IndexError:
                # Catches errors if the input string is empty or has too few parts
                print("Invalid input. Please enter both row and column.")