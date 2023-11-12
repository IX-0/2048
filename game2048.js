var highscore = 0
var prevGameState

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

        switch (blockAt(x,y).value) {
            case 2:
                blockAt(x,y).style.backgroundColor = "rgb(238,228,218)"
                break;
            case 4:
                blockAt(x,y).style.backgroundColor = "rgb(237,224,200)"    
                break;
            case 8:
                blockAt(x,y).style.backgroundColor = "rgb(242,177,121)"
                break;
            case 16:
                blockAt(x,y).style.backgroundColor = "rgb(245,149,99)"
                break;
            case 32:
                blockAt(x,y).style.backgroundColor = "rgb(246, 124, 95)"
                break;
            case 64:
                blockAt(x,y).style.backgroundColor = "rgb(246, 94, 59)"    
                break;
            case 128:
                blockAt(x,y).style.backgroundColor = "rgb(237, 207, 114)"
                break;
            case 256:
                blockAt(x,y).style.backgroundColor = "rgb(237, 204, 97)"
                break;
            case 512:
                blockAt(x,y).style.backgroundColor = "rgb(237, 200, 80)"
                break;
            case 1024:
                blockAt(x,y).style.backgroundColor = "rgb(237, 197, 63)"
                break;
            case 2048:
                blockAt(x,y).style.backgroundColor = "rgb(237, 194, 46)"
                break;
            default:
                blockAt(x,y).style.backgroundColor = "black"
        }

    }
}

function powerOf2(num) {
    for (j = 0; num % 2 == 0; j++){
        num = num/2
    }
    return j
}

function evalScore(gameState) {
    total = 0
    for (i = 0 ; i < 16 ; i++) {
        if (gameState[i] != "") {
            total += gameState[i]*(powerOf2(gameState[i])-1)
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
    blockAt(x,y).value = ""
    blockAt(x,y).style.backgroundColor = ""
}

function blockAt(x,y) {
    return document.getElementById(convertCoords(x,y))
}

function moveBlock(x1,y1,x2,y2) {
    block1 = blockAt(x1,y1)
    block2 = blockAt(x2,y2)

    block2.style.backgroundColor = block1.style.backgroundColor
    block2.value = block1.value
    block2.innerHTML = block1.innerHTML

    delBlock(x1,y1)
}

// falta if innerHTML != ""
function move(dir) {

    var state = gameState()

    switch (dir) {
        case "up": {

            for (i=1;i<=4;i++){
                for (j=1;j<=4;j++){
                    
                    if (blockAt(i,j).innerHTML = "") {

                        var inc = 0
                        while (i-inc > 0){
                            if (i-inc-1 > 0 && blockAt(i-inc-1,j).innerHTML == "") {
                                inc++
                                continue
                            }
                            else if (i-inc-1 > 0 && blockAt(i-inc-1,j).innerHTML == blockAt(i,j).innerHTML){
                                inc++
                                break
                            }
                            else {
                                break
                            }
    
                        }
    
                        if (inc != 0) {
    
                            if (blockAt(i-inc,j).innerHTML == ""){
                                moveBlock(i,j,i-inc,j)
                            }
                            else if (blockAt(i-inc,j).innerHTML == blockAt(i,j).innerHTML){
                                newBlock(parseInt(blockAt(i,j).value)*2,i-inc,j)
    
                                delBlock(i,j)
                            }
                        }  
                    }
                }
            }
            break;
        }

        case "down":{

            for (i=4;i>=1;i--) {
                for (j=4;j>=1;j--) {

                    if (blockAt(i,j).innerHTML != ""){
            
                        var inc = 0
                        while (i+inc < 5){
                            if (i+inc+1 < 5 && blockAt(i+inc+1,j).innerHTML == "") {
                                inc++
                            }
                            else if (i+inc+1 < 5 && blockAt(i+inc+1,j).innerHTML == blockAt(i,j).innerHTML){
                                inc++
                                break
                            }
                            else {
                                break
                            }
                        }
            
                        if (inc != 0) {
            
                            if (blockAt(i+inc,j).innerHTML == ""){
                                moveBlock(i,j,i+inc,j)
                            }
                            else if (blockAt(i+inc,j).innerHTML == blockAt(i,j).innerHTML){
                                newBlock(parseInt(blockAt(i,j).value)*2,i+inc,j)
                                delBlock(i,j)
                            }
                        }  
                    }
                }
            }
            break;
        }

        case "right":{
            for (j=4;j>=1;j--) {
                for (i=4;i>=1;i--) {
                    if (blockAt(i,j).innerHTML != ""){
            
                        var inc = 0
                        while (j+inc < 5){
                            if (j+inc+1 < 5 && blockAt(i,j+inc+1).innerHTML == "") {
                                inc++
                            }
                            else if (j+inc+1 < 5 && blockAt(i,j+inc+1).innerHTML == blockAt(i,j).innerHTML){
                                inc++
                                break
                            }
                            else {
                                break
                            }
                        }
            
                        if (inc != 0) {
            
                            if (blockAt(i,j+inc).innerHTML == ""){
                                moveBlock(i,j,i,j+inc)
                            }
                            else if (blockAt(i,j+inc).innerHTML == blockAt(i,j).innerHTML){
                                newBlock(parseInt(blockAt(i,j).value)*2,i,j+inc)
                                delBlock(i,j)
                            }
                        }  
                    }
                }
            }
            break;
        }

        case "left":{
            for (j=1;j<=4;j++) {
                for (i=1;i<=4;i++) {

                    if (blockAt(i,j).innerHTML != ""){
            
                        var inc = 0
                        while (j-inc > 0){
                            if (j-inc-1 > 0 && blockAt(i,j-inc-1).innerHTML == "") {
                                inc++
                            }
                            else if (j-inc-1 > 0 && blockAt(i,j-inc-1).innerHTML == blockAt(i,j).innerHTML){
                                inc++
                                break
                            }
                            else {
                                break
                            }
                        }
            
                        if (inc != 0) {
            
                            if (blockAt(i,j-inc).innerHTML == ""){
                                moveBlock(i,j,i,j-inc)
                            }
                            else if (blockAt(i,j-inc).innerHTML == blockAt(i,j).innerHTML){
                                newBlock(parseInt(blockAt(i,j).value)*2,i,j-inc)
                                delBlock(i,j)
                            }
                        }  
                    }
                }
            }
            break;
        }
    }

    if (state.toString() != gameState().toString()){
        newBlock()
    }

}

function gameState(){
    var gameBoard = []
    for (i=1;i<=4;i++){
        for (j=1;j<=4;j++){
            if (blockAt(i,j).value == undefined) {
                gameBoard.push("")
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
            if (gameState[index] != "") 
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

    clearGame()
    newBlock()
    updateScore()
}

function evalEnd() {
    var state = gameState()
    
    move("up")
    move("down")
    move("left")
    move("right")

    if (state.toString() == gameState().toString()) {
        return true
    }
    else {
        loadGame(state)
        return false
    }
}

function endGame() {
    document.getElementById("endGameScreen").style.display = "block"
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowLeft":{
            prevGameState = gameState()
            move("left")
            if (evalEnd()) {
            endGame()
            }
            updateScore()
            break;
        }
        case "ArrowDown":{
            prevGameState = gameState()
            move("down")
            if (evalEnd()) {
            endGame()
            }
            updateScore()
            break;
        }
        case "ArrowRight":{
            prevGameState = gameState()
            move("right")
            if (evalEnd()) {
            endGame()
            }
            updateScore()
            break;
        }
        case "ArrowUp":{
            prevGameState = gameState()
            move("up")
            if (evalEnd()) {
            endGame()
            }
            updateScore()
            break;
        }
        case "r":{
            newGame()
            break;
        }
        case "Backspace": {
            loadGame(prevGameState)
            updateScore()
            break;
        }
    }
  }, false);

//   O zé disse para fazer melhor