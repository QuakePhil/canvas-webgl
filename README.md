# WebGL Experiments

This project showcases various interactive WebGL modules, including:
- [Primitives](primitives/): Basic geometric rendering
- [Shoot 'Em Up](shmup/): A top-down space shooter demo
- [Procedurally Generated Tiles](tiles/): Dynamic tile-based environments

## Running Locally

### 1. Using the Live Server Extension in VS Code

To launch this project with live reloading in Visual Studio Code:

1. Open the project folder in VS Code.
2. Install the **Live Server** extension from the Extensions Marketplace if you haven’t already.
3. Right-click on `index.html` (or any HTML file you want to preview).
4. Select **"Open with Live Server"**.
5. Your default browser should open at `http://127.0.0.1:5500/` or a similar local address.

This allows you to develop and test as you go.

### 2. Running a Basic Server with Python or Node

If you'd prefer using the terminal, you can try:

#### Python 3

1. Navigate to your project directory in terminal, then run:

```bash
python3 -m http.server
```
2. This starts a server at `http://localhost:8000` but you can adjust the port by appending one:

```bash
python3 -m http.server 8080
```

#### Node.js

1. If you have Node.js installed, install the lightweight server:

```bash
npm install -g http-server
```
2. Then, start the server with:

```bash
http-server
```

By default, it will serve the current directory at `http://localhost:8080`
