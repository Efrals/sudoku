var numberSelected = null;
tileSelected = null;

var errors = 0;

var board = [
  "--5-24-13",
  "--6-31---",
  "--1-895-7",
  "-6--97--5",
  "7--3---9-",
  "--98-5---",
  "5---6--24",
  "-1--5-9--",
  "-43--2---",
];

var solution = [
  "985724613",
  "476531289",
  "231689547",
  "164297835",
  "758316492",
  "329845761",
  "597168324",
  "812453976",
  "643972158",
];

// Inicialização
window.onload = function () {
  setGame();
};

// Criará as divs automaticamente da paleta de dígitos
function setGame() {
  // Dígitos de 1 a 9
  for (let i = 1; i <= 9; i++) {
    // <div id="1" class="number">1</div>
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  // Tabuleiro
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
}

// Seleciona e colore número da paleta de dígitos
function selectNumber() {
  if (numberSelected != null) {
    numberSelected.classList.remove("number-selected");
  }
  numberSelected = this;
  numberSelected.classList.add("number-selected");
}

// Seleciona e colore bloco do tabuleiro
function selectTile() {
  if (numberSelected) {
    if (this.innerText != "") {
      return;
    }
  }
  this.innerText = numberSelected.id;

  /*  Divide os números entre os traços para se obter os números e criar 
      uma matriz de números individuais. Porque atualmente são strings.
      Ex: 0-0 -> [0,0]
      Ex: 2-5 -> [2,5]
  */
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  // Verificar solução bate com o bloco selecionado
  if (solution[r][c] == numberSelected.id) {
    this.innerText = numberSelected.id;
  } else {
    errors++;
    document.getElementById("errors").innerText = `Erros: ${errors}`;
  }
}
