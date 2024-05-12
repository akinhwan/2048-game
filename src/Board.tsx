import { useState, useEffect } from "react";

export default function Board() {
  const [tiles, setTiles] = useState(Array(16).fill(0));

  //   0, 1, 2, 3
  //   4, 5, 6, 7
  //   8, 9, 10, 11
  //   12, 13, 14, 15

  const introduceNewTile = () => {
    const newTiles = [...tiles];
    const emptyTiles = newTiles.reduce((acc, tile, i) => {
      if (tile === 0) {
        acc.push(i);
      }
      return acc;
    }, []);

    const ri = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    newTiles[ri] = 2;
    setTiles(newTiles);

    if (emptyTiles.length === 1) {
      setTimeout(() => {
        alert("Game Over");
      }, 500);
      return;
    }
  };

  const moveTiles = (direction) => {
    const newTiles = [...tiles];
    let hasChanged = false;

    const collapseLine = (line) => {
      const newLine = Array(4).fill(0);
      let index =
        direction === "ArrowRight" || direction === "ArrowDown" ? 3 : 0;

      for (let i = 0; i < 4; i++) {
        if (line[i] !== 0) {
          if (newLine[index] === 0) {
            newLine[index] = line[i];
          } else if (newLine[index] === line[i]) {
            newLine[index] *= 2;
            index =
              direction === "ArrowRight" || direction === "ArrowDown"
                ? index - 1
                : index + 1;
          } else {
            index =
              direction === "ArrowRight" || direction === "ArrowDown"
                ? index - 1
                : index + 1;
            newLine[index] = line[i];
          }
        }
      }

      return newLine;
    };

    for (let i = 0; i < 4; i++) {
      let line;

      switch (direction) {
        case "ArrowUp":
          line = [
            newTiles[i],
            newTiles[i + 4],
            newTiles[i + 8],
            newTiles[i + 12],
          ];
          break;
        case "ArrowDown":
          line = [
            newTiles[i + 12],
            newTiles[i + 8],
            newTiles[i + 4],
            newTiles[i],
          ];
          break;
        case "ArrowLeft":
          line = newTiles.slice(i * 4, i * 4 + 4);
          break;
        case "ArrowRight":
          line = newTiles.slice(i * 4, i * 4 + 4).reverse();
          break;
        default:
          break;
      }

      const newLine = collapseLine(line);

      for (let j = 0; j < 4; j++) {
        switch (direction) {
          case "ArrowUp":
            newTiles[j * 4 + i] = newLine[j];
            break;
          case "ArrowDown":
            newTiles[(3 - j) * 4 + i] = newLine[j];
            break;
          case "ArrowLeft":
            newTiles[i * 4 + j] = newLine[j];
            break;
          case "ArrowRight":
            newTiles[i * 4 + (3 - j)] = newLine[j];
            break;
          default:
            break;
        }

        if (newTiles[j * 4 + i] !== line[j]) {
          hasChanged = true;
        }
      }
    }

    if (hasChanged) {
      setTiles(newTiles);
      introduceNewTile();
    }
  };

  const handleKey = (e) => {
    switch (e.key) {
      case "ArrowUp":
        console.log("up");
        introduceNewTile();
        break;
      case "ArrowDown":
        console.log("down");
        moveTiles(-4, 12, 16);
        introduceNewTile();
        break;
      case "ArrowLeft":
        console.log("left");
        moveTiles(1, 0, 16);
        introduceNewTile();
        break;
      case "ArrowRight":
        console.log("right");
        moveTiles(-1, 15, -1);
        introduceNewTile();
        break;
      default:
        break;
    }
    moveTiles(e.key);
  };

  const randomIndex = () => Math.floor(Math.random() * tiles.length);

  const initialize2Tiles = () => {
    const newTiles = [...tiles];

    let ri1, ri2;

    do {
      ri1 = randomIndex();
      ri2 = randomIndex();
    } while (ri1 === ri2);

    newTiles[ri1] = 2;
    newTiles[ri2] = 2;
    setTiles(newTiles);
  };

  useEffect(() => {
    initialize2Tiles();

    // set focus on board
    document.querySelector(".board").focus();
  }, []);

  return (
    <div className="board" onKeyDown={handleKey} tabIndex="0">
      {tiles.map((tile, i) => {
        return (
          <div key={i} className={`tile ${tile !== 0 ? "active" : ""}`}>
            {tile !== 0 ? tile : null}
            {/* {tile} */}
          </div>
        );
      })}
    </div>
  );
}
