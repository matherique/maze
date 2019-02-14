
let maze = {};
let grid = [];
let cols, rows, w, count = 0;

function preload() {
	maze = loadJSON('data/data-1000x2000-2.json');
}

function setup() {
	createCanvas(maze.width, maze.height);
	cols = maze.cols;
	rows = maze.rows;
	frameRate(5)
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			grid.push(new Cell(i, j));
		}
	}
	maze.data;
	w = maze.w
}

function draw() {
	background(50);

	for (let i = 0; i < grid.length; i++) {
		grid[i].show();
		grid[i].getWalls();
	}
	if (maze.current_path) {
		if (count < maze.current_path.length) {
			let i = maze.current_path[count];
			grid[i].showCurrent()
			count++;
		}
	}
}

function index(i, j) {
	return i + j * cols
}

class Cell {
	constructor(i, j) {
		this.i = i;
		this.j = j;
		this.walls = [true, true, true, true];
	}

	getWalls() {
		let idx = index(this.i, this.j);
		this.walls[0] = !!maze.data[idx].top
		this.walls[1] = !!maze.data[idx].right
		this.walls[2] = !!maze.data[idx].bottom
		this.walls[3] = !!maze.data[idx].left
	}

	show() {
		let x = this.i * maze.w;
		let y = this.j * maze.w;

		stroke(255);

		if (this.walls[0]) {
			line(x, y, x + w, y)
		}

		if (this.walls[1]) {
			line(x + w, y, x + w, y + w)
		}

		if (this.walls[2]) {
			line(x + w, y + w, x, y + w)
		}

		if (this.walls[3]) {
			line(x, y + w, x, y)
		}
	}

	showCurrent() {
		let x = this.i * maze.w;
		let y = this.j * maze.w;
		fill(255, 0, 0);
		noStroke();
		rect(x, y, maze.w, maze.w);
	}
}