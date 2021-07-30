const containerEl = document.querySelector('.container');

const resetBtn = document.getElementById('resetBtn');

const refreshImg = document.getElementById('refresh');

const whosTurnEl = document.getElementById('whosTurn');


const winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

let counter = 0;

let isThereAWinner = false;

const cellsState = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
};


function winnerChecker(array) {
    for (const iterator of array) {
        if (cellsState[iterator[0]] === cellsState[iterator[1]] && cellsState[iterator[1]] === cellsState[iterator[2]] && cellsState[iterator[0]] !== ''){
            document.getElementById(`${iterator[0]}`).style.color = 'red';
            document.getElementById(`${iterator[1]}`).style.color = 'red';
            document.getElementById(`${iterator[2]}`).style.color = 'red';
            isThereAWinner = true;
            whosTurnEl.textContent = `Mr. ${cellsState[iterator[0]]} has won!`;
            refreshImg.style.display = 'inline';            
            // setTimeout(() => {
            //     document.getElementById(`${iterator[0]}`).textContent = `${cellsState[iterator[0]]}`;
            //     document.getElementById(`${iterator[1]}`).textContent = 'has';
            //     document.getElementById(`${iterator[2]}`).textContent = 'won';
            //     refreshImg.style.display = 'inline';
            // }, 2000);
            break;
        }
        if (counter === 9){
            whosTurnEl.textContent = 'DRAW';
            refreshImg.style.display = 'inline';
        }    
    }
}

function renderer(obj) {
    for (const [key, value] of Object.entries(obj)) {
        document.getElementById(`${key}`).textContent = value;
    }
}

function cellOnClick(evt) {
    const id = evt.target.id;

    if (cellsState[id] === 'X' || cellsState[id] === 'O' || isThereAWinner){
        return;
    }

    if (counter % 2 === 0){
        cellsState[id] = 'X';
        counter += 1;
        whosTurnEl.textContent = "Your turn Mr. O";
        winnerChecker(winCombinations);
        renderer(cellsState);
        return;
    }

    cellsState[id] = 'O';
    counter += 1;
    whosTurnEl.textContent = "Your turn Mr. X";
    winnerChecker(winCombinations);
    renderer(cellsState);
}

resetBtn.onclick = () => {
    for (const key of Object.keys(cellsState)) {
        cellsState[key] = '';
    }

    for (let i = 1; i < 10; i++) {
        document.getElementById(`${i}`).style.color = 'green';        
    }

    counter = 0;
    isThereAWinner = false; 
    refreshImg.style.display = 'none';
    whosTurnEl.textContent = "Your turn Mr. X";
    renderer(cellsState);        
};

for (let i = 1; i < 10; i++) {
    const cellEl = document.createElement('div');
    cellEl.id = `${i}`
    cellEl.classList.add('cell');
    cellEl.style.width = '300px';
    cellEl.style.height = '31%';
    cellEl.style.color = 'green';
    cellEl.style.boxShadow = '0px 0px 20px grey';
    cellEl.style.backgroundColor = '#f7f8fa';
    cellEl.style.margin = '5px';
    cellEl.style.float = 'left';
    cellEl.style.fontSize = '1000%';
    cellEl.style.textAlign = 'center';
    cellEl.style.border = '1px solid grey';
    cellEl.style.borderRadius = '2%';
    cellEl.addEventListener('click', cellOnClick);
    containerEl.appendChild(cellEl);
}
