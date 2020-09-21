/*eslint-env es6*/
const tilesColor = ["cupcake", "cupcake", "burger", "burger", "cookie", "cookie", "mermaid", "mermaid", "milord", "milord", "dinosaur", "dinosaur", "pug", "pug", "unicorn", "unicorn"];

let gameTiles = document.querySelectorAll(".game-tile");
gameTiles = [...gameTiles];

const startTime = new Date().getTime();

let activeTile = "";
const activeTiles = [];

const gamePairs = gameTiles.length / 2;
let gameResult = 0;

const clickTile = function () {
    activeTile = this;

    if (activeTile == activeTiles[0]) {
        return;
    }

    activeTile.classList.remove("hidden");

    if (activeTiles.length === 0) {
        activeTiles[0] = activeTile;
        return;
    } else {
        gameTiles.forEach(tile =>
            tile.removeEventListener("click", clickTile))
        activeTiles[1] = activeTile;
        
        setTimeout(function () {
            if (activeTiles[0].className === activeTiles[1].className) {
                activeTiles.forEach(tile => tile.classList.add("off"));
                gameResult++;
                gameTiles = gameTiles.filter(tile => !tile.classList.contains("off"))
                
                if (gameResult == gamePairs) {

                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    alert(`Udalo sie! Super! Twoj czas to ${gameTime} sekund`);
                    location.reload();
                }
            } else {
                activeTiles.forEach(tile => tile.classList.add("hidden"));
            }
            activeTile = "";
            activeTiles.length = 0;

            gameTiles.forEach(tile => tile.addEventListener("click", clickTile))

        }, 1000)
    }
}


const initialize = function () {
    gameTiles.forEach(tile => {
        const position = Math.floor(Math.random() * tilesColor.length);
        tile.classList.add(tilesColor[position]);
        tilesColor.splice(position, 1);
    })
    setTimeout(function () {
        gameTiles.forEach(tile => {
            tile.classList.add("hidden")
            tile.addEventListener("click", clickTile)
        })
    }, 2000)

}

initialize();
