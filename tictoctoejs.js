document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".status");
    const restartButton = document.querySelector(".restart");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function handleCellClick(e) {
      const cell = e.target;
      const cellIndex = cell.getAttribute("data-index");
  
      if (gameBoard[cellIndex] !== "" || checkWinner()) {
        return;
      }
  
      updateCell(cell, cellIndex);
      if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        return;
      }
  
      if (isBoardFull()) {
        statusText.textContent = "It's a Draw!";
        return;
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  
    function updateCell(cell, index) {
      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add("taken");
    }
  
    function checkWinner() {
      return winningCombinations.some((combination) => {
        return combination.every((index) => gameBoard[index] === currentPlayer);
      });
    }
  
    function isBoardFull() {
      return gameBoard.every((cell) => cell !== "");
    }
  
    function restartGame() {
      currentPlayer = "X";
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken");
      });
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
  
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  });
  