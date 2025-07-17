const tetrominoArr = ["I", "O", "T", "S", "Z", "J", "L"];

const tetrominoMap = new Map([
  [
    "I",
    {
      coordinates: [
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
      ],
      color: "#00FFFF",
      center: 3,
    },
  ],
  [
    "O",
    {
      coordinates: [
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
      ],
      color: "#fffb00ff",
      center: null,
    },
  ],
  [
    "T",
    {
      coordinates: [
        { x: 4, y: 0 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
      ],
      color: "#b700ffff",
      center: 2,
    },
  ],
  [
    "S",
    {
      coordinates: [
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
      ],
      color: "#00FF00",
      center: 2,
    },
  ],
  [
    "Z",
    {
      coordinates: [
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
      ],
      color: "#FF0000",
      center: 2,
    },
  ],
  [
    "J",
    {
      coordinates: [
        { x: 3, y: 0 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
      ],
      color: "#0000FF",
      center: 2,
    },
  ],
  [
    "L",
    {
      coordinates: [
        { x: 5, y: 0 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
      ],
      color: "#ff8800ff",
      center: 2,
    },
  ],
]);

const grid = {
  width: 10,
  height: 20,
};

let score = 0;
let startTime = Date.now();
let laidShapes = [];
let fallingShape = tetrominoMap.get("I");

let speed = 0.25;
let tiles = [];
let gameInterval = 0;

const generateShape = () => {
  const int = Math.min(6, Math.round(Math.random() * 7));
  const letter = tetrominoArr[int];

  const info = tetrominoMap.get(letter);

  return info;
};

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
      newDiv.style.width = `${100 / grid.width}%`;
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
      rotateClockWise();
      break;
    default:
      break;
  }
};

const rotateClockWise = () => {
  const coords = fallingShape.coordinates;
  const center = coords[fallingShape.center];

  if (!center) {
    console.log("No new center");
    return;
  }

  const newCoords = coords.map(({ x, y }) => ({
    x: center.x - (y - center.y),
    y: center.y + (x - center.x),
  }));

  const newFallingShape = {
    ...fallingShape,
    coordinates: newCoords,
  };

  console.log(newFallingShape);

  fallingShape = newFallingShape;

  clearScreen();
  draw();
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
  const newShape = generateShape();

  if (!newShape) {
    throw new Error("What the hell! Where is your new shape!?");
  }

  laidShapes.push(fallingShape);
  checkForFullRows();

  fallingShape = {
    coordinates: newShape.coordinates,
    color: newShape.color,
    center: newShape.center,
  };
};

const checkForFullRows = () => {
  let rowCount = 0;
  let rowsToErase = [];

  for (let i = 0; i <= grid.height; i++) {
    for (let k = 0; k <= grid.width; k++) {
      const coords = `${i},${k}`;
      laidShapes.forEach((s) => {
        s.coordinates.forEach((c) => {
          const shapeCoordsStr = `${c.y},${c.x}`;
          if (coords === shapeCoordsStr) {
            rowCount++;
          }
        });
      });
    }
    if (rowCount === 10) {
      rowsToErase.push(i);
    }
    rowCount = 0;
  }

  const newShapes = laidShapes.map((s) => {
    const coords = s.coordinates;

    return {
      ...s,
      coordinates: coords.filter((c) => !rowsToErase.includes(c.y)),
    };
  });

  const filteredShapes = newShapes.filter((s) => s.coordinates.length > 0);

  const movedShapes = moveShapesDown(filteredShapes);

  laidShapes = movedShapes;

  updateScore(rowsToErase);
  rowsToErase = [];
};

const updateScore = (rows) => {
  let addedScore = 0;
  rows.forEach((row) => {
    addedScore += row * 3;
  });

  score += addedScore;

  const scoreDiv = document.getElementById("score");
  scoreDiv.innerText = `Score: ${score}`;
};

// const moveShapesDown = (shapes) => {
//   let recurse = false;

//   const newestShapes = shapes.map((s) => {
//     let hasShapeUnder = false;

//     s.coordinates.forEach((c) => {
//       if (c.y + 1 >= grid.height) {
//         hasShapeUnder = true;
//       }

//       shapes.forEach((_s) => {
//         if (_s === s) return;
//         _s.coordinates.forEach((_c) => {
//           if (_c.y === c.y + 1 && c.x === _c.x) {
//             hasShapeUnder = true;
//           }
//         });
//       });
//     });

//     if (hasShapeUnder) {
//       return s;
//     } else {
//       recurse = true;
//       return {
//         ...s,
//         coordinates: s.coordinates.map((c) => ({ ...c, y: c.y + 1 })),
//       };
//     }
//   });

//   if (recurse) {
//     return moveShapesDown(newestShapes);
//   }

//   return newestShapes;
// };

const moveShapesDown = (shapes) => {
  let canMove = true;
  let currentShapes = [...shapes];

  while (canMove) {
    canMove = false;

    const proposedShapes = currentShapes.map((s) => {
      let hasObstacle = false;

      for (const c of s.coordinates) {
        // Check for bottom collision
        if (c.y + 1 > grid.height) {
          hasObstacle = true;
          break;
        }

        // Check for collision with other shapes
        for (const other of currentShapes) {
          if (other === s) continue;
          for (const oc of other.coordinates) {
            if (oc.x === c.x && oc.y === c.y + 1) {
              hasObstacle = true;
              break;
            }
          }
          if (hasObstacle) break;
        }
      }

      if (hasObstacle) {
        return s;
      } else {
        canMove = true;
        return {
          ...s,
          coordinates: s.coordinates.map((c) => ({ ...c, y: c.y + 1 })),
        };
      }
    });

    currentShapes = proposedShapes;
  }

  return currentShapes;
};

const shapeAtTop = () => {
  for (let i = 0; i < fallingShape.coordinates.length; i++) {
    const coords = fallingShape.coordinates[i];
    if (coords.y <= 0) {
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
  const didLayDown = isCollidingY();

  if (didLayDown && shapeAtTop()) {
    killGame();
  }

  if (isBottom() || didLayDown) {
    setNewShape();
    return;
  }

  const newFallingShape = {
    ...fallingShape,
    coordinates: fallingShape.coordinates.map((c) => ({ ...c, y: c.y + 1 })),
  };

  fallingShape = newFallingShape;
};

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

  startTime = new Date();
  score = 0;

  draw();

  gameInterval = setInterval(() => {
    clearScreen();
    moveDown();
    draw();
    updateTime();
  }, speed * 1000);
};

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
};

const updateTime = () => {
  const timeDiv = document.getElementById("time");

  const now = Date.now();

  const elapsed = now - startTime;

  timeDiv.innerText = `Time: ${formatTime(elapsed)}`;
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
