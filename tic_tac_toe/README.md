# Tic-Tac-Toe Command-Line Game

A simple command-line Tic-Tac-Toe game implemented in Python, demonstrating modular programming principles.

## Project Structure

The application is organized into the following files:

```
tic_tac_toe/
├── main.py
├── board.py
├── player.py
└── game_rules.py
```

-   **`main.py`**: The main entry point of the game. It orchestrates the game flow, initializes the board and players, manages turns, and checks for win/draw conditions.
-   **`board.py`**: Defines the `Board` class, which manages the Tic-Tac-Toe grid, handles displaying the board, validating moves, and placing marks.
-   **`player.py`**: Defines the `Player` class, which handles player-specific attributes (like their mark 'X' or 'O') and prompts for player input.
-   **`game_rules.py`**: Contains functions that implement the core game logic for checking win conditions (rows, columns, diagonals) and draw conditions.

## How to Run

To run the Tic-Tac-Toe game, follow these steps:

1.  **Save the files**:
    Create a directory named `tic_tac_toe`.
    Save `main.py`, `board.py`, `player.py`, and `game_rules.py` inside this `tic_tac_toe` directory.

    Your directory structure should look like this:
    ```
    your_project_folder/
    └── tic_tac_toe/
        ├── main.py
        ├── board.py
        ├── player.py
        └── game_rules.py
    ```

2.  **Open a terminal or command prompt**:
    Navigate to the `tic_tac_toe` directory using the `cd` command.
    ```bash
    cd your_project_folder/tic_tac_toe
    ```

3.  **Run the main script**:
    Execute the `main.py` file using Python:
    ```bash
    python main.py
    ```

## How to Play

1.  The game will display the empty Tic-Tac-Toe board.
2.  Player 'X' goes first, followed by Player 'O'.
3.  When prompted, enter your move as two numbers separated by a space: `row col`.
    -   Rows and columns are 0-indexed.
    -   `0 0` is the top-left cell.
    -   `0 1` is the top-middle cell.
    -   `2 2` is the bottom-right cell.
4.  The game will check if your move is valid (within bounds and on an empty cell). If not, you'll be prompted to try again.
5.  The game continues until one player gets three of their marks in a row (horizontally, vertically, or diagonally) or the board is full resulting in a draw.
6.  The winner or draw condition will be announced, and the game will end.

Enjoy playing Tic-Tac-Toe!