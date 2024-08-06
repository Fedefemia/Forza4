var modal = document.getElementById("modal");
let player1 = 1;
let matrix = [];
createMatrix(4, 8, "");
let container = document.getElementById('matrix-container');
let player1image;
let player2image;
let bot;
let turnbott;
let playing;
let turn = 1;
updateByLoses();

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
        console.log("home")
        updateByKD();
    }
}

function openModal() {
    document.getElementById("player1nome").value = "";
    document.getElementById("player2nome").value = "";
    createMatrix(4, 8, "");
    modal.style.display = "block";
    aggiornaturno();
}


function clickinggame(numero) {
    if (playing) {
        turnbott = false;
        checkTile(numero)

        if (bot) {
            turnbott = true;
            disableButtons(true);
            turnobot()
            console.log("turnobot")
        }
    }
}
function closeModal(event, parametros) {
    playing = true;
    event.preventDefault();
    modal.style.display = "none";
    var player1name = document.getElementById("Player1");
    var player2name = document.getElementById("Player2");
    let player1input = document.getElementById("player1nome").value || "Player 1";
    let player2input = document.getElementById("player2nome").value || "Player 2";

    if (player1 == 1) {
        player1image = "photo/gettoneviolatagliato.png";
        player2image = "photo/gettonearanciotagliato.png";
    } else {
        player1image = "photo/gettonearanciotagliato.png";
        player2image = "photo/gettoneviolatagliato.png";
    }

    disableButtons(true);
    setTimeout(() => disableButtons(false), 150);

    if (parametros) {
        if (player1 == 1) {
            player1name.innerHTML = player1input;
            player2name.innerHTML = player2input;
        } else {
            player1name.innerHTML = player2input;
            player2name.innerHTML = player1input;
        }
        bot = false;
        gioca1v1();
    } else {
        if (player1 == 1) {
            player1name.innerHTML = player1input;
            player2name.innerHTML = "CPU";
        } else {
            player1name.innerHTML = "CPU";
            player2name.innerHTML = player1input;
        }
        bot = true;
        gioca1vcpu();
    }
    aggiornaturno();
}

function disableButtons(disable) {
    const buttons = document.querySelectorAll('.invisible-button');
    buttons.forEach(button => {
        if (disable) {
            button.classList.add('disabled');
            button.disabled = true;
        } else {
            button.classList.remove('disabled');
            button.disabled = false;
        }
    });
}


function toggleGlow(event, buttonId) {
    event.preventDefault();

    if (buttonId == "gettonebuttonb") {
        player1 = 2;
    } else {
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
    disableButtons(true);
    setTimeout(() => {
        botTurnLogic();
        disableButtons(false);
    }, 1000);
}

function botTurnLogic() {
    if (playing) {
        checkTile("bot");
    }
}

function checkTile(tile) {
    if (tile == "bot") {

        let random = Math.floor(Math.random() * 8);
        console.log("random " + random);

        let occupata = true;

        for (var i = 3; i >= 0; i--) {
            if (matrix[i][random] == "") {
                matrix[i][random] = turn;
                occupata = false;
                console.log(matrix[i][random]);
                break;
            }
        }
        if (occupata) {
            console.log("occupataz " + occupata);
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
        let player1name = document.getElementById("player1nome").value || "Player 1";
        let player2name = document.getElementById("player2nome").value || "Player 2";
        let winnerName, loserName;
        if (winner === 1) {
            winnerName = player1name;
            loserName = bot ? "CPU" : player2name;
        } else {
            winnerName = bot ? "CPU" : player2name;
            loserName = player1name;
        }
        setTimeout(() => Vittoria(winnerName, loserName), 1000);
    }
    updateHoverClass();
}


function updateHoverClass() {
    const buttons = document.querySelectorAll('.invisible-button');
    buttons.forEach(button => {
        button.classList.remove('player1-hover', 'player2-hover');
        if (player1 == 1) {
            if (turn === 1) {
                button.classList.add('player1-hover');
            } else {
                button.classList.add('player2-hover');
            }
        }
        else {


            if (turn === 1) {
                button.classList.add('player2-hover');
            } else {
                button.classList.add('player1-hover');
            }
        }
    });
}



function riprova(tile) {
    console.log("riprova")
    container.innerHTML = matrixToTable(matrix);
    //colonna rossa
    if (turnobott) {
        disableButtons(true);
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
function Vittoria(winnerName, loserName) {
    playing = false;
    disableButtons(true);
    console.log("The winner is " + winnerName + " and the loser is " + loserName);
    showSection('home')
    updateUserStats(winnerName, true);
    updateUserStats(loserName, false);
}

function updateUserStats(username, isWin) {
    if (username == "CPU") {
        return;
    }

    const userStats = JSON.parse(localStorage.getItem('userStats')) || {};

    if (!userStats[username]) {
        userStats[username] = { name: username, wins: 0, loses: 0 };
    }

    if (isWin) {
        userStats[username].wins += 1;
    } else {
        userStats[username].loses += 1;
    }

    localStorage.setItem('userStats', JSON.stringify(userStats));
}

function updateByWins() {
    const userStats = JSON.parse(localStorage.getItem('userStats')) || {};
    const output = document.getElementById('classifica');
    output.innerHTML = '';
    output.innerHTML += `<tr><td id="classificatd">Nome: </td><td id="classificatd">Vittorie</td><td id="classificatd">Sconfitte</td><td id="classificatd">Vittorie/Sconfitte</td></tr>\n`;
    const entries = [];
    for (const username in userStats) {
        if (userStats.hasOwnProperty(username)) {
            entries.push([username, userStats[username]]);
        }
    }
    for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
            if (entries[j][1].wins > entries[i][1].wins) {
                const temp = entries[i];
                entries[i] = entries[j];
                entries[j] = temp;
            }
        }
    }

    let kd
    for (const [username, stats] of entries) {
        if (stats.loses == 0) {
            kd = stats.wins
        }
        else {
            kd = stats.wins / stats.loses
        }
        output.innerHTML += `<tr><td id="classificatd">${stats.name} </td><td id="classificatd">${stats.wins} </td><td id="classificatd">${stats.loses}</td><td id="classificatd">${kd}</td></tr>\n`;

    }
}

function updateByLoses() {
    const userStats = JSON.parse(localStorage.getItem('userStats')) || {};
    const output = document.getElementById('classifica');
    output.innerHTML = '';
    output.innerHTML += `<tr><td id="classificatd">Nome: </td><td id="classificatd">Vittorie</td><td id="classificatd">Sconfitte</td><td id="classificatd">Vittorie/Sconfitte</td></tr>\n`;
    const entries = [];
    for (const username in userStats) {
        if (userStats.hasOwnProperty(username)) {
            entries.push([username, userStats[username]]);
        }
    }
    for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
            if (entries[j][1].loses > entries[i][1].loses) {
                const temp = entries[i];
                entries[i] = entries[j];
                entries[j] = temp;
            }
        }
    }

    let kd
    for (const [username, stats] of entries) {
        if (stats.loses == 0) {
            kd = stats.wins
        }
        else {
            kd = stats.wins / stats.loses
        }
        output.innerHTML += `<tr><td id="classificatd">${stats.name} </td><td id="classificatd">${stats.wins} </td><td id="classificatd">${stats.loses}</td><td id="classificatd">${kd}</td></tr>\n`;

    }
}

function updateByKD() {
    const userStats = JSON.parse(localStorage.getItem('userStats')) || {};
    const output = document.getElementById('classifica');
    output.innerHTML = '';
    output.innerHTML += `<tr><td id="classificatd">Nome: </td><td id="classificatd">Vittorie</td><td id="classificatd">Sconfitte</td><td id="classificatd">Vittorie/Sconfitte</td></tr>\n`;
    const entries = [];
    let kd
    for (const username in userStats) {
        if (userStats.hasOwnProperty(username)) {
            entries.push([username, userStats[username]]);
        }
    }
    for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
            let jkd
            let ikd
            if (entries[j][1].loses == 0) {
                jkd = entries[j][1].wins
            }
            else {
                jkd = (entries[j][1].wins) / (entries[j][1].loses)
            }
            if (entries[i][1].loses == 0) {
                ikd = entries[i][1].wins
            }
            else {
                ikd = (entries[i][1].wins) / (entries[i][1].loses)
            }
            if (jkd > ikd) {
                const temp = entries[i];
                entries[i] = entries[j];
                entries[j] = temp;
            }
        }
    }

    for (const [username, stats] of entries) {
        if (stats.loses == 0) {
            kd = stats.wins
        }
        else {
            kd = stats.wins / stats.loses
        }
        output.innerHTML += `<tr><td id="classificatd">${stats.name} </td><td id="classificatd">${stats.wins} </td><td id="classificatd">${stats.loses}</td><td id="classificatd">${kd}</td></tr>\n`;

    }
}
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});