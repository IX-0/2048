var highscore = 0
var prevGameStates = []


function convertCoords(x,y){
    return x.toString() + y.toString()
}

function newBlock(value=2,x=0,y=0) {
    
    if (x == 0 && y == 0) {
        var x = Math.floor(Math.random()*4 + 1) 
        var y = Math.floor(Math.random()*4 + 1) 
        
        if (blockAt(x,y).innerHTML == "") {
            blockAt(x,y).innerHTML = '<p class="block">'+ value +'</p>'
            blockAt(x,y).value = value
            blockAt(x,y).style.backgroundColor = "rgb(238,228,218)"
            return
        }
        
        newBlock()
    }

    else {
        blockAt(x,y).innerHTML = '<p class="block">'+ value +'</p>'
        blockAt(x,y).value = value

        switch (value) {
            case 2: blockAt(x,y).style.backgroundColor = "rgb(238,228,218)"; 
                break;
            case 4: blockAt(x,y).style.backgroundColor = "rgb(242,177,121)"; 
                break;
            case 8: blockAt(x,y).style.backgroundColor = "rgb(245,149,99)"; 
                break;
            case 16: blockAt(x,y).style.backgroundColor = "rgb(246, 124, 95)"; 
                break;
            case 32: blockAt(x,y).style.backgroundColor = "rgb(246, 94, 59)"; 
                break;
            case 64: blockAt(x,y).style.backgroundColor = "rgb(237, 207, 114)"; 
                break;
            case 128: blockAt(x,y).style.backgroundColor = "rgb(237, 204, 97)"; 
                break;
            case 256: blockAt(x,y).style.backgroundColor = "rgb(237, 200, 80)"; 
                break;
            case 512: blockAt(x,y).style.backgroundColor = "rgb(237, 200, 80)"; 
                break;
            case 1024: blockAt(x,y).style.backgroundColor = "rgb(237, 197, 63)"; 
                break;
            case 2048: blockAt(x,y).style.backgroundColor =  "rgb(237, 194, 46)"; 
                break;
            default: blockAt(x,y).style.backgroundColor = 'black'; 
                break;
        }
    }
}

function powerOf2(num) {
    for (j = 0; num % 2 == 0; j++){
        num = num/2
    }
    return j
}

function evalScore(state) {
    total = 0
    for (i = 0 ; i < 16 ; i++) {
        if (state[i] != "") {
            total += state[i]*(powerOf2(state[i])-1)
        }
    }
    return total
}

function updateScore() {
    if (highscore <= evalScore(gameState())) {
        highscore = evalScore(gameState())
    }

    document.getElementById("score2").innerHTML = `Score: ${evalScore(gameState())}`
    document.getElementById("score").innerHTML = `Score: ${evalScore(gameState())}`
    document.getElementById("highscore2").innerHTML = `Highscore: ${highscore}`
    document.getElementById("highscore").innerHTML = `Highscore: ${highscore}`
}

function delBlock(x,y) {
    blockAt(x,y).innerHTML = ""
    blockAt(x,y).value = 0
    blockAt(x,y).style.backgroundColor = ""
}

function blockAt(x,y) {
    return document.getElementById(convertCoords(x,y))
}

function gameState(){
    var gameBoard = []
    for (i=1;i<=4;i++){
        for (j=1;j<=4;j++){
            if (blockAt(i,j).value == 0) {
                gameBoard.push(0)
            }
            else{
                gameBoard.push(blockAt(i,j).value)  
            }
        }
    }

    return gameBoard
}

function loadGame(gameState) {
    clearGame()

    var index = 0
    for (i=1;i<=4;i++){
        for (j=1;j<=4;j++){ 
            if (gameState[index] != 0)
                newBlock(gameState[index],i,j)
            index++
        }
    }

    updateScore()
}   

function clearGame() {
    for (i=1;i<=4;i++){
        for (j=1;j<=4;j++){
            delBlock(i,j)
        }
    }
}

function newGame() {
    
    document.getElementById("endGameScreen").style.display = "none"
    prevGameStates = []

    clearGame()
    newBlock()
    updateScore()
}

function evalEnd(state) {
    dirs = ['u','d','r','l']

    var retVal = true

    dirs.forEach(dir => {
        if (state.toString() != moveAlg(state , dir).toString()) { 
            retVal = false
        }
    })

    return retVal
}

function lineShiftAlg(line) {

    /*
    Returns a line with its elements ahifted to the right 
    having in mind the rules of the game
    */

    line = line.map( value => {
        return value.toString() 
    })

    for (i = 2 ; i >= 0 ; i--) {

        if (line[i] != "0") {
            
            for (inc = 0 ; inc <= 3 ; inc++ ) {
                
                if (line[i+inc+1] == "0") {
                    if (i+inc+1 == 3) {
                        line[i+inc+1] = line[i] 
                        line[i] = "0"
                        break    
                    }
                }

                else if (line[i+inc+1] == line[i]) {
                    line[i+inc+1] = parseInt(line[i+inc+1])*2 + "!"
                    line[i] = "0"
                    break
                }

                else if (line[i+inc+1] != line[i] || line[i+inc+1].endsWith("!")) {
                    if (inc != 0) {
                        line[i+inc] = line[i] 
                        line[i] = "0"
                    }
                    break
                }
                
            }
        }

    }

    line = line.map( value => {
        return parseInt(value.replace("!",""))
    })

    return line
}

function moveAlg(state,dir) {

    var lines = []
    for (i=0 ; i<4 ; i++) {
        switch (dir) {
            case 'd':
                var line = [state[i] , state[4+i] , state[8+i] , state[12+i]]
                lines.push(line)
                break;

            case 'u':
                var line = [state[12+i] , state[8+i] , state[4+i] , state[i]]
                lines.push(line)
                break;

            case 'r':
                var line = [state[0+4*i] , state[1+4*i] , state[2+4*i] , state[3+4*i]]
                lines.push(line)
                break;

            case 'l':
                var line = [state[3+4*i] , state[2+4*i] , state[1+4*i] , state[0+4*i]]
                lines.push(line)
                break;
        }
        
    }

    lines = lines.map(value => {
        return lineShiftAlg(value)
    })

    var newState = []
    for (k=0 ; k<4 ; k++) {
        switch (dir) {
            case 'd':
                newState.push(lines[0][k] , lines[1][k] , lines[2][k] , lines[3][k])
                break;

            case 'u':
                newState.push(lines[0][3-k] , lines[1][3-k] , lines[2][3-k] , lines[3][3-k])
                break;

            case 'r':
                newState.push(lines[k][0] , lines[k][1] , lines[k][2] , lines[k][3])
                break;

            case 'l':
                newState.push(lines[k][3] , lines[k][2] , lines[k][1] , lines[k][0])
                break;
        }
        
    }

    return newState
}

function move(dir) {
    state = gameState()
    newState = moveAlg(state, dir)

    if (state.toString() != newState.toString()) {
        prevGameStates.push(state)
        loadGame(newState)
        newBlock()
        updateScore()

    }

    if (evalEnd(newState)) {
        document.getElementById("endGameScreen").style.display = "block"
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowLeft":{
            move('l')
            break;
        }
        case "ArrowDown":{
            move('d')
            break;
        }
        case "ArrowRight":{
            move('r')
            break;
        }
        case "ArrowUp":{
            move('u')
            break;
        }
        case "r":{
            newGame()
            break;
        }
        case "Backspace": {
            prevGameStates.pop()
            loadGame(prevGameStates[prevGameStates.length-1])
            break;
        }
    }
}, false);

document.addEventListener('touchstart', e => {
    e.preventDefault()
    x1 = e.touches[0].screenX
    y1 = e.touches[0].screenY

}, false)

document.addEventListener('touchend', e => {
    e.preventDefault()

    x2 = e.changedTouches[0].screenX
    y2 = e.changedTouches[0].screenY

    dx = x2-x1
    dy = y2-y1

    if (dx == 0 && dy == 0) {
        return
    }

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
            move('l')
        }
        else {
            move('r')
        }
    }
    else {
        if (dy < 0) {
            move('u')
        }
        else {
            move('d')
        }
    }

    // e.touches.remove(0)
}, false)