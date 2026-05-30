# Keystroke Reflex Engine

## Overview

Keystroke Reflex Engine is an interactive browser-based reflex testing game built using React and Vite.

The application displays random characters taken from a predefined word set.  
The player must press the matching keyboard key within 3 seconds.

The game tracks:

- Correct inputs
- Wrong inputs
- Missed inputs
- Final score

---

# Features

- Random character generation
- 3-second timer for each round
- Live score updates
- Case-insensitive input matching
- First key press detection only
- Final results summary
- Replay functionality
- Responsive UI
- Edge case handling

---

# Tech Stack

- React
- Vite
- JavaScript
- Vanilla CSS

---

# Project Structure

```txt
keystroke-reflex-engine/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

---

# Installation & Setup

## 1. Extract the ZIP file

Unzip the project folder.

---

## 2. Open terminal inside the project folder

Example:

```bash
cd keystroke-reflex-engine
```

---

## 3. Install dependencies

```bash
npm install
```

---

## 4. Run the development server

```bash
npm run dev
```

---

## 5. Open the application

Open the browser and visit:

```txt
http://localhost:5173
```

---

# Game Rules

- A random character is displayed.
- The player has 3 seconds to press the correct key.
- Only the first key press is counted.
- Input comparison is case-insensitive.

### Scoring

| Action                 | Points |
| ---------------------- | ------ |
| Correct key press      | +1     |
| Wrong key press        | -1     |
| No key press (timeout) | -1     |

---

# Edge Cases Handled

- Rapid repeated key presses
- Held keyboard keys
- Non-character keys
- Empty custom word set
- Single-character words

---

# Browser Compatibility

Tested on:

- Chrome 120+

---

# Author

Developed by Gunasekar M
