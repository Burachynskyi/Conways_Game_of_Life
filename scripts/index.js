let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let body = document.body

let cellSide = 15

let liveColor = 'green'
let noneColor = 'black'
let cellborderColor = 'grey'

let cellArray = []

let innerTimer = null

const RATE = 1
const DROP_CHANCE = 0.08

//======================================================================
launch()
//======================================================================

function launch(){
    canvas.width = body.clientWidth
    canvas.height = body.clientHeight

    ctx.lineWidth = 1
    ctx.strokeStyle = cellborderColor

    initArray()

    live()

    innerTimer = setInterval(live, 1000 / RATE)
}

function live(){
    for(let i = 0; i < cellArray.length; i++){
        for(let y = 0; y < cellArray[i].length; y++){
            let countLive = 0

            //ліва
            if(y > 0 && cellArray[i][y - 1].liveState){
                countLive += 1
            }

            //права
            if(y < cellArray[i].length - 1 && cellArray[i][y + 1].liveState){
                countLive += 1
            }

            //верхня
            if(i > 0 && cellArray[i - 1][y].liveState){
                countLive += 1
            }

            //нижня
            if(i < cellArray.length - 1 && cellArray[i + 1][y].liveState){
                countLive += 1
            }

            //ліва-верхня
            if(y > 0 && i > 0 && cellArray[i - 1][y - 1].liveState){
                countLive += 1
            }

            //права-верхня
            if(y < cellArray[i].length - 1 && i > 0 && cellArray[i - 1][y + 1].liveState){
                countLive += 1
            }

            //ліва-нижня
            if(y > 0 && i < cellArray.length - 1 && cellArray[i + 1][y - 1].liveState){
                countLive += 1
            }

            //права-нижня
            if(y < cellArray[i].length - 1 && i < cellArray.length - 1 && cellArray[i + 1][y + 1].liveState){
                countLive += 1
            }

            if(cellArray[i][y].liveState){
                if(countLive != 2 && countLive != 3){
                    cellArray[i][y].liveState = false
                }
            }else if(countLive == 3){
                cellArray[i][y].liveState = true
            }

            ctx.strokeRect(cellArray[i][y].left, cellArray[i][y].top, cellSide, cellSide)
            ctx.fillStyle = cellArray[i][y].liveState ? liveColor : noneColor
            ctx.fillRect(cellArray[i][y].left, cellArray[i][y].top, cellSide, cellSide)
        }
    }

}   

function initArray(){
    for(let i = 0; i < canvas.clientHeight / cellSide; i++){
        let arr = []

        for(let y = 0; y < canvas.clientWidth / cellSide; y++){
            let obj = {
                left: y * cellSide,
                top: i * cellSide,
                liveState: Math.random() < DROP_CHANCE ? true : false
            }

            arr.push(obj)
        }

        cellArray.push(arr)
    }
}

