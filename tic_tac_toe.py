def create_board():
    """
    Initializes and returns a new Tic-Tac-Toe board.
    The board is a list of 9 elements, representing the 9 squares.
    Initially, each square contains its number (1-9) for easy player input.
    """
    return [str(i) for i in range(1, 10)]

def display_board(board):
    """
    Prints the Tic-Tac-Toe board to the console in a 3x3 grid format.
    """
    print("\n