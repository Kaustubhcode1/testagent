"""
game_rules.py
Contains the core logic for checking win and draw conditions in Tic-Tac-Toe.
These functions operate on the raw board state (list of lists).
"""

def check_win(board_state, player_mark):
    """
    Checks if the given player has won the game based on the current board state.
    A player wins if they have three of their marks in a row, column, or diagonal.

    Args:
        board_state (list[list[str]]): The current 3x3 board state.
        player_mark (str): The mark of the player to check ('X' or 'O').

    Returns:
        bool: True if the player has won, False otherwise.
    """
    # Check rows
    for row in board_state:
        if all(cell == player_mark for cell in row):
            return True

    # Check columns
    for col in range(3):
        if all(board_state[row][col] == player_mark for row in range(3)):
            return True

    # Check main diagonal (top-left to bottom-right)
    if all(board_state[i][i] == player_mark for i in range(3)):
        return True

    # Check anti-diagonal (top-right to bottom-left)
    if all(board_state[i][2 - i] == player_mark for i in range(3)):
        return True

    return False

def check_draw(board_state):
    """
    Checks if the game is a draw.
    A game is a draw if the board is full and neither player has won.

    Args:
        board_state (list[list[str]]): The current 3x3 board state.

    Returns:
        bool: True if the game is a draw, False otherwise.
    """
    # First, check if there's already a winner. A draw cannot occur if someone has won.
    if check_win(board_state, 'X') or check_win(board_state, 'O'):
        return False

    # Then, check if the board is full. If any empty space exists, it's not a draw yet.
    for row in board_state:
        if ' ' in row:
            return False  # Board is not full
    
    # If no winner and the board is full, it's a draw
    return True