let maze = {};
let grid = [];
let cols, rows, w, count = 0;
let start, end;
let data;

let filename = 'data/data-0.json';
let agent = [];

function preload() {
	maze = loadJSON(filename);
}

function setup() {
	createCanvas(maze.width, maze.height);
	cols = maze.cols;
	rows = maze.rows;
	w = maze.w
	data = maze.data
	// frameRate(10);

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			grid.push(new Cell(i, j));
		}
	}
	for (let i = 0; i < 10; i++) {
		let cores = color(random(255), random(255), random(255))
		agent.push(new Agent(grid[0], cores));
	}
}

function draw() {
	background(50);

	for (let i = 0; i < grid.length; i++) {
		grid[i].show();
		grid[i].getWalls();
	}
	for (let i = 0; i < agent.length; i++) {
		agent[i].setNewPos(i);
		agent[i].show();
	}

	seePath();
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
	constructor(grid, cls = null) {
		this.i = grid.i;
		this.j = grid.j;
		this.grid = grid;
		this.cls = cls
	}

	setNewPos(i) {
		let walls = this.grid.walls;
		let rand = () => random([0, 1, 2, 3]);
		let convertedwalls = walls.map(w => (w) ? undefined : true);
		let idx = rand();
		let x = 0;
		while (true) {
			if (convertedwalls[idx]) {
				break;
			} else {
				idx = rand();
			}
			x++;
		}

		if (false) {
			console.log("tentativa", x)
			console.log("res:", convertedwalls[idx]);
			console.log("index", idx);
			console.log("grid: ", this.grid);
			console.log("===============================");
		}

		let gridpos = null
		if (idx == 0)
			gridpos = index(this.i, this.j - 1);
		if (idx == 1)
			gridpos = index(this.i + 1, this.j);
		if (idx == 2)
			gridpos = index(this.i, this.j + 1);
		if (idx == 3)
			gridpos = index(this.i - 1, this.j);


		if (gridpos !== null)
			agent[i] = new Agent(grid[gridpos], this.cls);


		if (gridpos == grid.length - 1) {
			agent[i] = new Agent(grid[gridpos], this.cls);
			console.log(this)
			noLoop();
		}

	}

	show() {
		let x = this.i * w;
		let y = this.j * w;
		fill(this.cls);
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
		this.walls[0] = !!data[idx].top
		this.walls[1] = !!data[idx].right
		this.walls[2] = !!data[idx].bottom
		this.walls[3] = !!data[idx].left
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
		fill(255, 255, 255);
		noStroke();
		rect(x, y, maze.w, maze.w);
	}
}
