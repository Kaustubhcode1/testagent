"""
A simple console-based Tic-Tac-Toe game.
Players take turns marking spaces on a 3x3 grid.
The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins.
If all 9 squares are filled and no player has three marks in a row, the game is a draw.
"""

import random

def display_board(board):
    """
    Prints the Tic-Tac-Toe board to the console.
    The board is represented as a list of 9 strings, where each string is 'X', 'O', or ' '.
    Positions are 1-9, corresponding to the list indices 0-8.
    """
    print('\n' * 100) # Clear the console (or try to)
    print('   |   |