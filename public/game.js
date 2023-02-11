function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function init(){
    const container = document.querySelector(".container");
    const numOfPeases = 30;
    const resultImage = document.createElement("img");
    resultImage.className="result-image";
    resultImage.src="pics/1.jpg"
    container.appendChild(resultImage);
    await delay(1000);
    const W = resultImage.clientWidth;
    const H = resultImage.offsetHeight;
    console.log(W, H);
    resultImage.style.display="none";
    var numRow, numCol;
    for (let i = Math.round(Math.sqrt(numOfPeases)); (i > 0) && (i < numOfPeases); i += 2*(1/2 - +(W > H))) {
        //console.log(i)
        if (numOfPeases % i != 0 ) continue;
        if (numOfPeases % (numOfPeases / i) != 0 ) continue;
        numRow = i;
        numCol = numOfPeases / i;
        break;
        
    }

    ///// TEMP ///////////
    numCol = 5
    numRow = 6

    pieces = []
    pieceW = W / numCol;
    pieceH = H / numRow;
    percentW = 100. / numCol;
    percentH = 100. / numRow;
    console.log(percentW, percentH);
    

    for (let j = 0; j < numRow; j++) {
        for (let i = 0; i < numCol; i++) {
            let piece = {
                "right": i+1 < numCol ? i+1 : -1,
                "top": j-1,
                "left": i-1,
                "bottom": j+1 < numRow ? j+1 : -1
            }
            pieces.push(piece);
            var pieceImage = document.createElement("div");
            pieceImage.className="piece-image";
            pieceImage.id = i+j;
            pieceImage.style.backgroundImage = "url('pics/1.jpg')";
            pieceImage.style.backgroundSize = `${W}px ${H}px`;
            pieceImage.style.backgroundPosition = `-${pieceW*(i)}px -${pieceH*(j)}px`;
            //pieceImage.style.backgroundPosition = `-${percentW*(i)}% -${percentH*(j)}%`;
            console.log(pieceImage.style.backgroundPosition);
            pieceImage.style.width = `${pieceW}px`;
            pieceImage.style.height = `${pieceH}px`;
            pieceImage.style.position = "absolute";
			pieceImage.style.left = `${pieceW*i}px`;
			pieceImage.style.top = `${100+pieceH*j}px`;
            
            pieceImage.addEventListener("mousedown", mDown);
            pieceImage.addEventListener("mouseup", mUp);
            pieceImage.addEventListener("mousemove", mMove);
            container.appendChild(pieceImage);
        }
    }
    //console.log(pieces)
    
    console.log(numCol, numRow)
}

var mouseDown = false;
var mousePosition;
var offset = [0,0];
init();

function mDown(e) {
	if (mouseDown) return;
    mouseDown = true;
    e.target.style.zIndex="555";
    offset = [
        e.target.offsetLeft - e.clientX,
        e.target.offsetTop - e.clientY
    ];
}
function mUp(e) {
    mouseDown = false;
    e.target.style.zIndex="5";
}
function mMove (e) {
	e.preventDefault();
    if (mouseDown) {
        mousePosition = {
            x : e.clientX,
            y : e.clientY
        };
        e.target.style.left = (mousePosition.x + offset[0]) + 'px';
        e.target.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
    //console.log(e.target.style.left, e.target.style.top)
}
