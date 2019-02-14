let maze = {};
let grid = [];
let cols, rows, w, count = 0;
let start, end;

let filename = 'data/data-400x400-0.json';
let agent = null;

function preload() {
	maze = loadJSON(filename);
}

function setup() {
	createCanvas(maze.width, maze.height);
	cols = maze.cols;
	rows = maze.rows;
	w = maze.w
	frameRate(5);
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			grid.push(new Cell(i, j));
		}
	}
	agent = new Agent(grid[50]);
}

function draw() {
	background(50);

	for (let i = 0; i < grid.length; i++) {
		grid[i].show();
		grid[i].getWalls();
	}
	// seePath(); 
	agent.show();
	agent.setNewPos();
}

function seePath() {
	if (maze.current_path) {
		if (count < maze.current_path.length) {
			let i = maze.current_path[count];
			grid[i].showCurrent()
			count++;
		}
	}

}

function index(i, j) {
	if (i < 0 || j < 0 || i > (cols - 1) || j > (rows - 1))
		return undefined;

	return i + j * cols;
}

class Agent {
	constructor(grid) {
		this.i = grid.i;
		this.j = grid.j;
		this.grid = grid;
	}

	setNewPos() {
		let walls = this.grid.walls;
		let i = random([0, 1, 2, 3]);
		let stop = false;
		let choosenone = null;
		while (!stop) {
			if (walls[i]) {
				choosenone = i;
				stop = true
			} else {
				i = random([0, 1, 2, 3]);
			}
		}
		let top = index(this.i, this.j - 1);
		let right = index(this.i + 1, this.j);
		let bottom = index(this.i, this.j + 1);
		let left = index(this.i - 1, this.j);
		let options = [top, right, bottom, left];

		agent = new Agent(grid[options[i]]);

	}

	show() {
		let x = this.i * w;
		let y = this.j * w;
		fill(0, 0, 255);
		noStroke();
		rect(x + 1, y + 1, w - 1, w - 1);
	}
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
