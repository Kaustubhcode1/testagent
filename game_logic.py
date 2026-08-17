Content of file 2
```python
"""
Core game logic for Tic Tac Toe.
Contains the TicTacToeGame class to manage game state, moves, and win/draw conditions.
"""

from constants import PLAYER_X, PLAYER_O, EMPTY_CELL, BOARD_SIZE

class TicTacToeGame:
    """
    Manages the state and rules of a Tic Tac Toe game.
    """
    def __init__(self):
        """
        Initializes a new Tic Tac Toe game board and sets the starting player.
        """
        self.board = [[EMPTY_CELL for _ in range(BOARD_SIZE)] for _ in range(BOARD_SIZE)]
        self.current_player = PLAYER_X
        self.game_over = False
        self.winner = None
        self.moves_made = 0

    def make_move(self, row: int, col: int) -> bool:
        """
        Attempts to make a move at the specified row and column.

        Args:
            row (int): The 0-indexed row for the move.
            col (int): The 0-indexed column for the move.

        Returns:
            bool: True if the move was successful, False otherwise (invalid position,
                  cell already taken, or game is over).
        """
        if self.game_over:
            return False

        # Validate move coordinates
        if not (0 <= row < BOARD_SIZE and 0 <= col < BOARD_SIZE):
            return False

        # Check if the cell is empty
        if self.board[row][col] != EMPTY_CELL:
            return False

        # Place the current player's marker
        self.board[row][col] = self.current_player
        self.moves_made += 1

        # Check for win or draw after the move
        if self._check_win(self.current_player):
            self.winner = self.current_player
            self.game_over = True
        elif self._check_draw():
            self.game_over = True
        else:
            # If no win or draw, switch to the next player
            self.switch_player()

        return True

    def _check_win(self, player: str) -> bool:
        """
        Checks if the given player has won the game.

        Args:
            player (str): The player marker ('X' or 'O') to check for a win.

        Returns:
            bool: True if the player has won, False otherwise.
        """
        # Check rows
        for r in range(BOARD_SIZE):
            if all(self.board[r][c] == player for c in range(BOARD_SIZE)):
                return True

        # Check columns
        for c in range(BOARD_SIZE):
            if all(self.board[r][c] == player for r in range(BOARD_SIZE)):
                return True

        # Check main diagonal (top-left to bottom-right)
        if all(self.board[i][i] == player for i in range(BOARD_SIZE)):
            return True

        # Check anti-diagonal (top-right to bottom-left)
        if all(self.board[i][BOARD_SIZE - 1 - i] == player for i in range(BOARD_SIZE)):
            return True

        return False

    def _check_draw(self) -> bool:
        """
        Checks if the game is a draw.

        Returns:
            bool: True if the game is a draw, False otherwise.
        """
        # A draw occurs if all cells are filled and there's no winner.
        return self.moves_made == BOARD_SIZE * BOARD_SIZE and not self.winner

    def switch_player(self):
        """
        Switches the current player from 'X' to 'O' or vice versa.
        """
        self.current_player = PLAYER_O if self.current_player == PLAYER_X else PLAYER_X

    def get_board(self) -> list[list[str]]:
        """
        Returns the current state of the game board.

        Returns:
            list[list[str]]: A 2D list representing the board.
        """
        return [row[:] for row in self.board] # Return a copy to prevent external modification

    def get_current_player(self) -> str:
        """
        Returns the marker of the player whose turn it currently is.

        Returns:
            str: The current player's marker ('X' or 'O').
        """
        return self.current_player

    def is_game_over(self) -> bool:
        """
        Checks if the game has ended (either by win or draw).

        Returns:
            bool: True if the game is over, False otherwise.
        """
        return self.game_over

    def get_winner(self) -> str | None:
        """
        Returns the marker of the winning player, or None if there's no winner yet or it's a draw.

        Returns:
            str | None: The winner's marker ('X' or 'O') or None.
        """
        return self.winner
```