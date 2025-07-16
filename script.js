const grid = {
  width: 10,
  height: 20,
};

const laidShapes = [
  //   {
  //     coordinates: [
  //       { y: 2, x: 4 },
  //       { y: 2, x: 5 },
  //       { y: 2, x: 6 },
  //       { y: 3, x: 5 },
  //     ],
  //     color: "#F00",
  //   },
  //   {
  //     coordinates: [
  //       { y: 13, x: 9 },
  //       { y: 14, x: 9 },
  //       { y: 15, x: 9 },
  //       { y: 16, x: 9 },
  //     ],
  //     color: "#F00",
  //   },
];
let fallingShape = {
  coordinates: [
    { y: -1, x: 9 },
    { y: -2, x: 9 },
    { y: -3, x: 9 },
    { y: -4, x: 9 },
  ], // Make a generate coordinates method
  color: "#F00",
};

let speed = 0.25;
let tiles = [];
let gameInterval = 0;

const initialize = () => {
  const gameContainer = document.getElementById("game");

  if (!gameContainer) {
    throw new Error("Add game div to the dom. Check HTML");
  }

  buildGrid(gameContainer);
  addListeners();
};

const buildGrid = (container) => {
  for (let i = 0; i < grid.height; i++) {
    for (let k = 0; k < grid.width; k++) {
      const newDiv = document.createElement("div");

      newDiv.classList.add("grid-item");
      newDiv.style.width = `${grid.width}%`;
      container.appendChild(newDiv);
      tiles.push(newDiv);
    }
  }
};

const addListeners = () => {
  window.addEventListener("keydown", handleKeyDown);

  const start = document.getElementById("start");

  if (!start) {
    throw new Error(
      "Make sure a button element with the id of start exists in your html"
    );
  }

  start.addEventListener("click", startGame);
};

const handleKeyDown = (e) => {
  const key = e.key;

  switch (key) {
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowUp":
      rotate();
      break;
    default:
      break;
  }
};

const moveRight = () => {
  if (isCollidingX(1) || isOutOfBoundsX(1)) {
    return;
  }
  const newFallingShape = {
    ...fallingShape,
    coordinates: fallingShape.coordinates.map((c) => ({ ...c, x: c.x + 1 })),
  };

  fallingShape = newFallingShape;
  clearScreen();
  draw();
};

const moveLeft = () => {
  if (isCollidingX(-1) || isOutOfBoundsX(-1)) {
    return;
  }
  const newFallingShape = {
    ...fallingShape,
    coordinates: fallingShape.coordinates.map((c) => ({
      ...c,
      x: c.x - 1,
    })),
  };

  fallingShape = newFallingShape;
  clearScreen();
  draw();
};

const isOutOfBoundsX = (int) => {
  for (let i = 0; i < fallingShape.coordinates.length; i++) {
    const coords = fallingShape.coordinates[i];

    if (coords.x + int < 1 || coords.x + int > grid.width) {
      return true;
    }
  }
  return false;
};

const isBottom = () => {
  for (let i = 0; i < fallingShape.coordinates.length; i++) {
    const coord = fallingShape.coordinates[i];
    if (coord.y >= grid.height) {
      return true;
    }
  }
  return false;
};

const isCollidingX = (int) => {
  let colliding = false;

  for (let i = 0; i < fallingShape.coordinates.length; i++) {
    const coords = fallingShape.coordinates[i];

    for (let k = 0; k < laidShapes.length; k++) {
      const shape = laidShapes[k];

      shape.coordinates.forEach((c) => {
        if (coords.x + int === c.x && coords.y === c.y) {
          colliding = true;
        }
      });
    }
  }

  return colliding;
};

const isCollidingY = () => {
  let colliding = false;

  for (let i = 0; i < fallingShape.coordinates.length; i++) {
    const coords = fallingShape.coordinates[i];

    for (let k = 0; k < laidShapes.length; k++) {
      const shape = laidShapes[k];

      shape.coordinates.forEach((c) => {
        if (Math.abs(c.y - coords.y) < 2 && c.x === coords.x) {
          colliding = true;
        }
      });
    }
  }

  return colliding;
};

const setNewShape = () => {
  laidShapes.push(fallingShape);
  fallingShape = {
    coordinates: [
      { y: -4, x: 9 },
      { y: -3, x: 9 },
      { y: -2, x: 9 },
      { y: -1, x: 9 },
    ], // Make a generate coordinates method
    color: "#FF0000",
  };
  return;
};

const shapeAtTop = () => {
  for (let i = 0; i < fallingShape.coordinates.length; i++) {
    const coords = fallingShape.coordinates[i];
    if (coords.y < 0) {
      return true;
    }
  }

  return false;
};

const killGame = () => {
  clearInterval(gameInterval);
  clearScreen();
  const message = document.getElementById("message");

  message.innerHTML = `<p>Game Over!!!!! Press Start To Play Again</p>
        <button id="start">Start</button>`;

  message.style.display = "block";
};

const moveDown = () => {
  const didFall = isCollidingY();

  if (didFall && shapeAtTop()) {
    killGame();
  }

  if (isBottom() || didFall) {
    setNewShape();
    return;
  }

  const newFallingShape = {
    ...fallingShape,
    coordinates: fallingShape.coordinates.map((c) => ({ ...c, y: c.y + 1 })),
  };

  fallingShape = newFallingShape;
};

const rotate = () => {};

const clearScreen = () => {
  tiles.forEach((t) => {
    t.style.backgroundColor = "#000000";
  });
};

const startGame = () => {
  const gameMessage = document.getElementById("message");

  if (!gameMessage) {
    throw new Error("Check HTML for message element within game div");
  }

  gameMessage.classList.add("hide");

  draw();

  gameInterval = setInterval(() => {
    clearScreen();
    moveDown();
    draw();
  }, speed * 1000);
};

const draw = () => {
  drawLaidTiles();
  drawMovingTile();
};

const drawLaidTiles = () => {
  laidShapes.forEach((s) => {
    paint(s);
  });
};

const drawMovingTile = () => {
  paint(fallingShape);
};

const paint = (shape) => {
  for (let i = 0; i <= grid.height; i++) {
    for (let k = 0; k <= grid.width; k++) {
      const coord = `${i},${k}`;

      const shapeCoords = shape.coordinates;

      shapeCoords.forEach((c) => {
        const shapeCoordsStr = `${c.y},${c.x}`;
        const index = i * grid.width - grid.width + (k - 1);
        if (index > -1) {
          const t = tiles[index];

          if (coord === shapeCoordsStr) {
            t.style.backgroundColor = shape.color;
          }
        }
      });
    }
  }
};

window.addEventListener("load", initialize);
