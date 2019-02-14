#!/usr/bin/env python3
from random import choice
import os

# setting config values
WIDTH = 400
if 'WIDTH' in os.environ:
    WIDTH = int(os.environ.get('WIDTH'))
    
HEIGHT = 400
if 'HEIGHT' in os.environ:
    HEIGHT = int(os.environ.get('HEIGHT'))

w = 20

# calculate index from i and j and validate 
def index (i, j):
    if i < 0 or j < 0 or i > (cols - 1) or j > (rows - 1):
        return len(grid) + 1

    return i + (j * cols)


# check if index is in list, if not return None
def checkinlist(idx):
    try:
        return grid[idx]
    except IndexError:
        return False


class Cell:
    def __init__(self, i, j):
        self.i = i
        self.j = j
        self.visited = False
        self.walls = [True, True, True, True]
    
    def checkNeighbors(self):
        neigh = []
        
        top     = checkinlist(index(self.i, self.j - 1))
        right   = checkinlist(index(self.i + 1, self.j))
        bottom  = checkinlist(index(self.i, self.j + 1))
        left    = checkinlist(index(self.i - 1, self.j))

        if (top and not top.visited):
            neigh.append(top)

        if (right and not right.visited):
            neigh.append(right)

        if (bottom and not bottom.visited):
            neigh.append(bottom)

        if (left and not left.visited):
            neigh.append(left)

        if len(neigh) > 0:
            return choice(neigh)
        else:
            return False

    def __str__(self):
        #return "i: %d j: %d" % (self.i, self.j)
        return "index: %d" % index(self.i, self.j)

    def show(self):
        return {
            'top': int(self.walls[0]), 
            'right': int(self.walls[1]), 
            'bottom': int(self.walls[2]), 
            'left' : int(self.walls[3]) 
        } 

    def removeWall(self, cell):
        a, b = self, cell
        x = a.i - b.i
        if x == 1:
            a.walls[3] = False
            b.walls[1] = False
        elif x == -1:            
            a.walls[1] = False
            b.walls[3] = False
               
        y = a.j - b.j
 
        if y == 1:
            a.walls[0] = False
            b.walls[2] = False
        elif y == -1:            
            a.walls[2] = False
            b.walls[0] = False

qtd = 10
if 'QTD' in os.environ:
    qtd = int(os.environ['QTD'])

for x in range(qtd):
    current = None

    cols = WIDTH // w
    rows = HEIGHT // w

    grid = []
    stack = []

    # data to export 
    maze = {
        'width': WIDTH,
        'height': HEIGHT,
        'w': w,
        'cols': cols,
        'rows' : rows,
        'data': [],
        'current_path': []
    }  
    for j in range(rows):
        for i in range(cols):
            grid.append(Cell(i, j))

    current = grid[0]
    all_visit = False

    while not all_visit:
        maze['current_path'].append(index(current.i, current.j))
        current.visited = True
        # step 1
        nextN = current.checkNeighbors()
        if nextN:        
            nextN.visited = True
            stack.append(current)
            # step 3
            current.removeWall(nextN)
            # step 4
            current = nextN
        elif len(stack) > 0:
          current = stack.pop()
        visit = 0
        for g in grid:
            if g.visited:
                visit += 1

        #print("Cells visited %d/%d" % (visit, len(grid)))
        all_visit = (visit == len(grid))
           

    for g in grid:
        maze['data'].append(g.show())

    import json 

    filename = "data-%dx%d-%d.json" % (WIDTH, HEIGHT, x)
    with open('data/' + filename, 'w') as fp:
        json.dump(maze, fp)
    
    pos = x + 1
    print("Maze %d finish" % pos)


