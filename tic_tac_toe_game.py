def create_board():
    """
    Initializes and returns a 3x3 Tic Tac Toe board.
    Each cell is represented by a space ' ' initially.
    """
    return [[' ' for _ in range(3)] for _ in range(3)]

def display_board(board):
    """
    Prints the current state of the Tic Tac Toe board to the console.
    It formats the board to be easily readable.
    """
    print("\n")
    for row in range(3):
        # Print the markers in the current row
        print(f" {board[row][0]} | {board[row][1]} | {board[row][2]}")
        # Print a separator line between rows, but not after the last row
        if row < 2:
            print("---|---|---")
    print("\n")

def get_player_move(current_player, board):
    """
    Gets a valid move (row, col) from the current player.
    
    Args:
        current_player (str): The marker of the current player ('X' or 'O').
        board (list of list of str): The current state of the game board.

    Returns:
        tuple: A tuple (row, col) representing the 0-indexed position
               where the player wants to place their marker.
    """
    while True:
        try:
            move = input(f"Player {current_player}, enter your move (row, col, e.g., 1,2): ")
            row, col = map(int, move.split(','))

            # Adjust to 0-indexed for internal board representation
            row -= 1
            col -= 1

            # Validate if the move is within board bounds (0-2 for 3x3)
            if 0 <= row < 3 and 0 <= col < 3:
                # Validate if the chosen cell is empty
                if board[row][col] == ' ':
                    return row, col
                else:
                    print("That cell is already taken! Please choose an empty cell.")
            else:
                print("Invalid move! Row and column must be between 1 and 3. Try again.")
        except ValueError:
            print("Invalid input format. Please enter row,col (e.g., 1,2).")
        except Exception as e:
            print(f"An unexpected error occurred: {e}. Please try again.")

def place_marker(board, row, col, marker):
    """
    Places the player's marker on the board at the specified row and column.

    Args:
        board (list of list of str): The game board.
        row (int): The 0-indexed row for the marker.
        col (int): The 0-indexed column for the marker.
        marker (str): The marker to place ('X' or 'O').
    """
    board[row][col] = marker

def check_win(board, marker):
    """
    Checks if the given marker has won the game by checking all rows, columns,
    and both diagonals.

    Args:
        board (list of list of str): The current state of the game board.
        marker (str): The marker to check for a win ('X' or 'O').

    Returns:
        bool: True if the marker has won, False otherwise.
    """
    # Check rows
    for r in range(3):
        if all(board[r][c] == marker for c in range(3)):
            return True
    
    # Check columns
    for c in range(3):
        if all(board[r][c] == marker for r in range(3)):
            return True
    
    # Check main diagonal (top-left to bottom-right)
    if all(board[i][i] == marker for i in range(3)):
        return True
    
    # Check anti-diagonal (top-right to bottom-left)
    if all(board[i][2-i] == marker for i in range(3)):
        return True
        
    return False

def check_draw(board):
    """
    Checks if the game is a draw. A draw occurs if all cells are filled
    and no player has won.

    Args:
        board (list of list of str): The current state of the game board.

    Returns:
        bool: True if the game is a draw, False otherwise.
    """
    for row in range(3):
        for col in range(3):
            if board[row][col] == ' ':
                return False # An empty cell exists, so it's not a draw yet
    return True # All cells filled and no winner (checked by play_game loop) means a draw

def play_game():
    """
    Main function to run the Tic Tac Toe game.
    It manages the game loop, player turns, move validation, and win/draw conditions.
    """
    board = create_board()
    current_player = 'X' # Player 'X' always starts
    game_over = False

    print("Welcome to Command-Line Tic Tac Toe!")
    print("Players will take turns entering their desired row and column (e.g., 1,1 for top-left).")
    print("Rows and columns are numbered 1 to 3.")

    while not game_over:
        display_board(board)
        row, col = get_player_move(current_player, board)
        place_marker(board, row, col, current_player)

        if check_win(board, current_player):
            display_board(board)
            print(f"🎉 Congratulations! Player {current_player} wins! 🎉")
            game_over = True
        elif check_draw(board):
            display_board(board)
            print("It's a draw! No more moves possible.")
            game_over = True
        else:
            # Switch to the other player for the next turn
            current_player = 'O' if current_player == 'X' else 'X'

    print("\nGame Over. Thanks for playing!")

if __name__ == "__main__":
    play_game()