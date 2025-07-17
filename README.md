# Vanilla JavaScript Tetris Clone 🎮

A classic falling blocks game built using vanilla JavaScript, HTML, and CSS. This simple Tetris-inspired project features grid-based gameplay, real-time user input, scoring, and shape rotation logic — all with no dependencies!

---

![Badge](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?logo=javascript&logoColor=black)
![Badge](https://img.shields.io/badge/HTML-5-orange?logo=html5)
![Badge](https://img.shields.io/badge/CSS-Grid-blue?logo=css3)

---

## 🎯 Features

- Tetromino shapes: I, O, T, S, Z, J, L
- Rotation with center pivot logic
- Row detection and clearing
- Score tracking
- Time tracking
- Game over detection
- Smooth keyboard controls

---

## 📋 Table of Contents

- [Demo](#-demo)
- [Getting Started](#-getting-started)
- [Controls](#-controls)
- [Gameplay Logic](#-gameplay-logic)
- [Development Notes](#-development-notes)
- [License](#-license)

---

## 🚀 Demo

[Live Game](https://ryanlarge13.github.io/Tetris-JS/)

---

## 🛠️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Tetris-JS.git
   ```

````

2. Open the HTML file in your browser:

   ```bash
   open index.html
   ```

3. Make sure your HTML file includes the following elements:

   ```html
   <div id="game"></div>
   <div id="message"></div>
   <div id="score">Score: 0</div>
   <div id="time">Time: 00:00:00</div>
   <button id="start">Start</button>
   ```

4. Add basic CSS for `.grid-item` and layout (optional but recommended).

---

## 🎮 Controls

| Key            | Action           |
| -------------- | ---------------- |
| ⬅️ Left Arrow  | Move piece left  |
| ➡️ Right Arrow | Move piece right |
| ⬇️ Down Arrow  | Soft drop        |
| ⬆️ Up Arrow    | Rotate clockwise |

---

## 🧠 Gameplay Logic

- **Grid Size**: 10x20 (standard Tetris dimensions)
- **Tetromino Data**: Defined in `tetrominoMap` with color and rotation center
- **Shape Spawning**: Randomly selected from predefined array
- **Collision Detection**: Checks for laid shapes and boundary conditions
- **Row Clearing**: Scans rows and removes filled lines
- **Score Calculation**: Adds `row index * 3` for each cleared row
- **Time Tracking**: Updates every frame
- **Game Over**: Triggered if a shape collides at the top

---

## 📓 Development Notes

- No external libraries or frameworks
- Uses `setInterval` for game loop timing
- Recursive function used to drop laid shapes down after line clears
- Modular function design: `draw`, `moveDown`, `rotateClockWise`, `checkForFullRows`, etc.

### Future Enhancements (Suggestions):

- Add hard drop (spacebar)
- Add hold queue for next shape
- Add sound effects and animations
- Add score multiplier based on combos
- Add localStorage support to save high scores

---

## 📄 License

MIT License. Feel free to fork, modify, and distribute as you'd like.

---

## 👨‍💻 Author

**Ryan Large**
[GitHub](https://github.com/RyanLarge13)

---
````
