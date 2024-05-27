const grid = document.querySelector('.grid');
const counter = document.getElementById('counter');
const palleteButton = document.getElementById('palleteButton');
const instructions = document.getElementById('instructions')

let selectedColors = []
let palleteShowing = false

function generate() {
    if (!palleteShowing) {
        grid.innerHTML = ""

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                const r = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const rgb = `(${r}, ${g}, ${b})`;
    
                const cell = document.createElement('div');
                cell.classList.add('cell');
                grid.appendChild(cell);
    
                const color = document.createElement('div');
                color.style.backgroundColor = `rgb${rgb}`;
                color.classList.add('color');
                cell.appendChild(color);
    
                const title = document.createElement('h3');
                title.innerHTML = `rgb${rgb}`;
                title.classList.add('cellTitle');
                cell.appendChild(title);
    
                cell.addEventListener("click", () => select(cell));
                cell.addEventListener("contextmenu", () => deselect(cell))
            }
        }
    }
}

function viewPallete() {
    grid.innerHTML = ""
    if (palleteShowing) {
        palleteShowing = !palleteShowing
        generate()

        palleteButton.innerHTML = 'View Pallete'
        instructions.innerHTML = 'Left click a color to select, right click to deselect.'
    } else {
        palleteShowing = !palleteShowing
        for (let i = 0; i < selectedColors.length; i++) {
            const rgb = selectedColors[i];
    
            const cell = document.createElement('div');
            cell.classList.add('cell');
            grid.appendChild(cell);
    
            const color = document.createElement('div');
            color.style.backgroundColor = rgb;
            color.classList.add('color');
            cell.appendChild(color);
    
            const title = document.createElement('h3');
            title.innerHTML = rgb;
            title.classList.add('cellTitle');
            cell.appendChild(title);

            cell.addEventListener("click", () => deselect(cell));
        }

        palleteButton.innerHTML = 'Close Pallete'
        instructions.innerHTML = 'Left click a color to deselect.'
    }
}

function select(cell) {
    const color = cell.children[0].style.backgroundColor;
    for (let i = 0; i < selectedColors.length; i++) {
        if (selectedColors[i] == color || selectedColors.length >= 5) {
            return
        }
    }
    
    selectedColors[selectedColors.length] = color;
    cell.children[1].innerHTML = 'Selected';

    if (selectedColors.length == 5) {counter.style.color = 'red'} else {counter.style.color = 'black'}
    counter.innerHTML = `Colors selected: ${selectedColors.length}`
    console.log(selectedColors)
    
}

function deselect(cell) {
    const color = cell.children[0].style.backgroundColor;
    let selected = 10
    for (let i = 0; i < selectedColors.length; i++) {
        if (color == selectedColors[i]) {
            selected = i
        }
    }

    if (selected != 10) {
        selectedColors.splice(selected, selected + 1)
        cell.children[1].innerHTML = color
        counter.innerHTML = `Colors selected: ${selectedColors.length}`
        counter.style.color = 'black'
        console.log(selectedColors)
    }

    if (palleteShowing) {
        palleteShowing = false
        viewPallete()
    }
}

generate();