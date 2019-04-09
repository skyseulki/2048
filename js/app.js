
/*----- constants -----*/ 
const $startScreen = $('#startscreen');

class Game {
    constructor () {
        this.gameOver = false;
    }
};


// instatiating new Game
let newGame = {} 




/*----- app's state (variables) -----*/ 

// creating 2D array
let array = new Array(4).fill(0).map(column => new Array(4).fill(0))
let gameCopy =  array.map(function(arr) {
    return arr.slice();
});
let gridRow = $('.grid-row')
let gridCell = $('.grid-row').children
console.log(gridRow)
console.log(array)




/*----- event listeners -----*/ 

// $('#instruction-btn').mouseout(function() {
//     console.log('mouse out');
//     $('.instructions2').addClass('add-keyframe');
//     // $('.instructions2').removeClass('add-keyframe')
// })


$(window).on('load', (event) => {
    console.log('PLAY button clicked');
    event.preventDefault();
        render();
        placeInRandomTiles(2);
})

$(window).on('keydown',(event) => {
    if (event.keyCode === 37) {
        clickLeft();
        placeInRandomTiles(1);
        // console.log('left')
    } else if (event.keyCode === 38) {
        shiftUp();
        placeInRandomTiles(1);
        // console.log('up')
    } else if (event.keyCode === 39) {
        clickRight();
        placeInRandomTiles(1);
        // console.log("right")
    } else if (event.keyCode === 40) {
        shiftDown();
        placeInRandomTiles(1);
        // console.log("down")
    }
})


// $('<div>Game Over</div>').css({
//     position: 'absolute',
//     width: '400px',
//     height: '400px',
//     top: 0,
//     left: 0,
//     opacity: 0.4,
// }).appendTo($(".game-container").css('position', 'relative'));

/*----- functions -----*/
const checkFull = () => {
    let count = 0
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] !== 0) {
                count++
            } 
        }
    }
    if (count === 16) {
        return true;
        } else {
        return false
        }
        
}


// Stop even though tile is '2048' &&
// no more zero &&
// cant sum function
const gameOver = () => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === "2048") {
                console.log('You won. Stop');
            } else if (checkFull()) {
                if (array[i][j] === array[i-1][j] ||
                    array[i][j] === array[i+1][j] ||
                    array[i][j] === array[i][j+1] ||
                    array[i][j] === array[i][j-1]) {
                        // return
                        console.log("game over; no space")
                } else
                return gameOver()
            }
        }
    }
}


const colorRender = (num) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let className = gridRow[i].children[j].classList.value
            let classNameArray = className.split(" ")
            // console.log(classNameArray)
            if (classNameArray.length === 2){
                classNameArray.pop()
                className = classNameArray.join("")
                gridRow[i].children[j].classList.value = className
            }
            if (gridRow[i].children[j].innerText === "2"){
                gridRow[i].children[j].classList.add("two")
            } else if (gridRow[i].children[j].innerText === "4"){
                gridRow[i].children[j].classList.add("four")
            } else if (gridRow[i].children[j].innerText === "8"){
                gridRow[i].children[j].classList.add("eight")
            } else if (gridRow[i].children[j].innerText === "16"){
                gridRow[i].children[j].classList.add("sixteen")
            } else if (gridRow[i].children[j].innerText === "32"){
                gridRow[i].children[j].classList.add("thirtytwo")
            } else if (gridRow[i].children[j].innerText === "64"){
                gridRow[i].children[j].classList.add("sixtyfour")
            } else if (gridRow[i].children[j].innerText === "128"){
                gridRow[i].children[j].classList.add("onetwoeight")
            } else if (gridRow[i].children[j].innerText === "256"){
                gridRow[i].children[j].classList.add("twofivesix")
            } else if (gridRow[i].children[j].innerText === "512"){
                gridRow[i].children[j].classList.add("fiveonetwo")
            } else if (gridRow[i].children[j].innerText === "1024"){
                gridRow[i].children[j].classList.add("tentwentyfour")
            } else if (gridRow[i].children[j].innerText === "2048"){
                gridRow[i].children[j].classList.add("twentyfourtyeight")
            }
        }
    }
}


const render = () => {
    for (let i = 0; i < array.length; i++) { 
        for (let j = 0; j < array[i].length; j++) {
            gridRow[i].children[j].innerText = array[i][j] ? array[i][j] : ''
            colorRender(array[i][j])
        }
    }
}


// make function 'randomTile'
// loop through the array 
// generate random tile using math.random - for row
// math.random - for column
// assign that value to the innerHTML property of the element
const placeInRandomTiles = (numberOfTiles) => {
    // let canPlaceInRandomTiles = true;
    for (let i = 0; i < numberOfTiles; i++) {
        let column = Math.floor(Math.random() * array.length)
        let row = Math.floor(Math.random() * array.length)
        if (array[column][row] === 0) {
            array[column][row] = 2 
        } else if (array[column][row] !== 0 && !checkFull()){
            return placeInRandomTiles(1);
        }else if (array[column][row] !== 0 && checkFull()) {
            return
        } else{
            return
        }            
    } render();
}
// placeInRandomTiles();


// stop page to scroll while pressing keycode during game
window.addEventListener('keydown', (e)=>{
    e.preventDefault()
})


// make turn variable where it tracks how many turns the user did and
// after couple turns, it spits out a '4'


const clickRight = () => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === 0) {
                array[i].splice([j], 1)
                array[i].unshift(0)
            } else if (array[i][j] === array[i][j - 1]) {
                array[i][j] = array[i][j] + array[i][j - 1]
                array[i][j - 1] = array[i][j - 2] ? array[i][j - 1] : 0
            }
        }
    } 
    render();
}
// clickRight();


const clickLeft = () => {
    for (let i = 0; i < array.length; i++) {
        for (let j = array[i].length - 1; j >= 0; j--) {
            if (array[i][j] === 0) {
                array[i].splice([j], 1)
                array[i].push(0)
            } else if (array[i][j] === array[i][j + 1]) {
                array[i][j] = array[i][j] + array[i][j + 1]
                array[i][j + 1] = array[i][j + 2] ? array[i][j + 1] : 0
            }
        }
    } render();
}
// clickLeft();


const clickUp = () => {
    for (let i = 0; i < array.length-1; i++) {
        for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] === 0){
                    array[i][j] = array[i + 1][j]
                    array[i + 1][j] = 0
                } else if (array[i][j] === array[i + 1][j]) {
                    array[i][j] = array[i][j] + array[i + 1][j]
                    array[i + 1][j] = array[i + 2][j]  ? array[i + 1][j]  : 0
                }
            }
    } render();
}
// clickUp();

// looping 'clickUp();' three times 
const shiftUp = ()=>{
    for(let i=0; i <3;i++){
        clickUp();
    }
}


const clickDown = () =>{
    for (let i = array.length-1; i >= 1; i--) {
        for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] === 0){
                    array[i][j] = array[i - 1][j]
                    array[i - 1][j] = 0
                } else if (array[i][j] === array[i - 1][j]) {
                    array[i][j] = array[i][j] + array[i - 1][j]
                    array[i - 1][j] = array[i - 2][j] ? array[i - 1][j]  : 0
                }
            }
    } render();
}

// looping 'clickDown();' three times
const shiftDown = () => {
    for (let i = 0; i < 3; i++){
        clickDown();
    }
}

