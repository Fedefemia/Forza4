var modal = document.getElementById("modal");
let turn = 1;
let player1 = 1;
let matrix = [];
createMatrix(4, 8, "");
let container = document.getElementById('matrix-container');
let player1image;
let player2image;
let bot;
let turnbott;
function createMatrix(rows, cols, defaultValue) {


    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row[j] = defaultValue;
        }
        matrix[i] = row;
    }

    return matrix;
}
container.innerHTML = matrixToTable(matrix);

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    if (sectionId == "gioca") {
        openModal();
    }
    if (sectionId == "home") {
        var player1name = document.getElementById("Player1");
        var player2name = document.getElementById("Player2");
        player1name.innerHTML = "";
        player2name.innerHTML = "";
    }
}

function openModal() {
    createMatrix(4, 8, "");
    modal.style.display = "block";
    aggiornaturno();
}

function clickinggame(numero) {
    turnbott = false;
    checkTile(numero)
    if (bot) {
        turnbott = true;
        turnobot()
        console.log("turnobot")
    }
}
function closeModal(parametros) {
    modal.style.display = "none";
    var player1name = document.getElementById("Player1");
    var player2name = document.getElementById("Player2");
    let random = Math.floor(Math.random() * 3);
    while (random < 1) {
        random = Math.floor(Math.random() * 3);
    }
    turn = random;
    if (player1 == 1) {
        player1image = "photo/gettoneviolatagliato.png"
        player2image = "photo/gettonearanciotagliato.png"
    }
    else {
        player1image = "photo/gettonearanciotagliato.png"
        player2image = "photo/gettoneviolatagliato.png"

    }
    if (parametros) {
        if (player1 == 1) {
            player1name.innerHTML = "Player 1";
            player2name.innerHTML = "Player 2";
        }
        else {
            player1name.innerHTML = "Player 2";
            player2name.innerHTML = "Player 1";
        }
        bot = false;

        setTimeout(gioca1v1, 1000);
    }
    else {
        if (player1 == 1) {
            player1name.innerHTML = "Player";
            player2name.innerHTML = "CPU";
        }
        else {
            player1name.innerHTML = "CPU";
            player2name.innerHTML = "Player";
        }
        bot = true;

        setTimeout(gioca1vcpu, 1000);
    }
}
function toggleGlow(buttonId) {
    if (buttonId == "gettonebuttonb") {
        player1 = 2;
    }
    else {
        player1 = 1;
    }
    const buttons = document.querySelectorAll('.gettonebutton');

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const clickedButton = document.getElementById(buttonId);
    clickedButton.classList.add('active');
}

function gioca1v1() {
    if (turn == 1) {
        //animation
    }
    else {

    }
}
function gioca1vcpu() {
    if (turn == 1) {
    }
    else {
        turnobot();
    }
}
function turnobot() {

    checkTile("bot")
}
function checkTile(tile) {
    if (tile == "bot") {
        let random = Math.floor(Math.random() * 7);
        console.log("random " + random);

        let occupata = true;

        for (var i = 3; i >= 0; i--) {
            if (matrix[i][random] == "") {
                matrix[i][random] = turn;
                occupata = false;
                break;
            }
        }
        console.log(matrix[i][random])
        console.log("occupata " + occupata)
        if (occupata) {
            checkTile("bot");
        }
        else {
            if (turn == 1) {
                turn++;
            }
            else {
                turn = 1;
            }
            aggiornaturno();
        }
    }
    else {

        let occupata = true;

        for (var i = 3; i >= 0; i--) {
            if (matrix[i][tile] == "") {
                matrix[i][tile] = turn;
                occupata = false;
                break;
            }
        }
        console.log(matrix[i][tile])
        console.log("occupata " + occupata)
        if (occupata) {
            riprova(tile);
        }
        else {
            if (turn == 1) {
                turn++;
            }
            else {
                turn = 1;
            }
            aggiornaturno();
        }
    }


}

function aggiornaturno() {
    container.innerHTML = matrixToTable(matrix);
    let winner = checkFourInARow(matrix);
    if (winner !== null) {
        if (player1 == 1) {
            switch (winner) {
                case 1:
                    winner = "CPU"
                    break;
                case 2:
                    winner = "Player"
                    break;
            }
        }
        if (player1 == 2) {
            switch (winner) {
                case 1:
                    winner = "Player"
                    break;
                case 2:
                    winner = "CPU"
                    break;
            }
        }

        setTimeout(Vittoria(winner), 1000);
    }
}

function riprova(tile) {
    console.log("riprova")
    container.innerHTML = matrixToTable(matrix);
    //colonna rossa
    if (turnobott) {
        turnobot();
    }
}

function matrixToTable(matrix) {
    let table = '<table>';

    matrix.forEach(row => {
        table += '<tr>';
        row.forEach(cell => {
            if (cell == 1) {
                table += `<td><img src="${player1image}"></img></td>`;
            }
            else {
                if (cell == 2) {
                    table += `<td><img src="${player2image}"></img></td>`;
                }
                else {
                    table += `<td><img src="photo/gettonevuoto.png"></img></td>`;
                }
            }
        });
        table += '</tr>';
    });

    table += '</table>';
    return table;
}

function checkFourInARow(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const target = 4;

    function checkSequence(sequence) {
        for (let i = 0; i <= sequence.length - target; i++) {
            const segment = sequence.slice(i, i + target);
            if (segment.every(num => num === segment[0] && num !== "")) {
                return segment[0];
            }
        }
        return null;
    }

    //righe
    for (let row = 0; row < rows; row++) {
        const result = checkSequence(matrix[row]);
        if (result !== null) {
            return result;
        }
    }

    //colonne
    for (let col = 0; col < cols; col++) {
        let columnSequence = [];
        for (let row = 0; row < rows; row++) {
            columnSequence.push(matrix[row][col]);
        }
        const result = checkSequence(columnSequence);
        if (result !== null) {
            return result;
        }
    }

    //diagonali-da sinistra alto a destra basso
    for (let row = 0; row <= rows - target; row++) {
        for (let col = 0; col <= cols - target; col++) {
            let diagonal = [];
            for (let i = 0; i < target; i++) {
                diagonal.push(matrix[row + i][col + i]);
            }
            const result = checkSequence(diagonal);
            if (result !== null) {
                return result;
            }
        }
    }

    //diagonali-da destra alto a sinistra basso
    for (let row = 0; row <= rows - target; row++) {
        for (let col = target - 1; col < cols; col++) {
            let diagonal = [];
            for (let i = 0; i < target; i++) {
                diagonal.push(matrix[row + i][col - i]);
            }
            const result = checkSequence(diagonal);
            if (result !== null) {
                return result;
            }
        }
    }
    return null;
}
function Vittoria(winner) {
    alert("player " + winner + " ha vinto")
}