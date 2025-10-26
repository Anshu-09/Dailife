Daily Task Widget (Transparent Desktop Widget)

How to run (Windows / macOS / Linux):

1. Make sure Node.js is installed.
2. Open terminal in this project folder.
3. Run:
   npm install
   npm start

What it does:
- Opens a transparent always-on-top widget window that shows today's tasks.
- Add tasks using the input and ➕ button or press Enter.
- Click a task to mark complete; double-click to delete.
- Tasks are saved locally in tasks.json so the app works offline.

Notes:
- This version uses nodeIntegration for simplicity so the renderer can read/write tasks.json.
- To package into an installer later, add electron-builder and packaging configuration.
