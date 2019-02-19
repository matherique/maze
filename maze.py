from random import choice
from cell import Cell

class Maze:        
    grid, stack, path = [], [], []        
    def __init__(self, width, height, w):
        self.width = width
        self.height = height
        self.w = w 
        self.cols = self.width // self.w
        self.rows = self.height // self.w

        self.grid = [Cell(i, j) for j in range(self.rows) for i in range(self.cols)]
        
    def create(self):        
        current = self.grid[0]
        self.path.append(self.index(current.i, current.j))
        
        while 1:
            current.visited = True
            # step 1
            nextN = self.checkNeighbors(current)
            if nextN:
                nextN.visited = True
                # step 2
                self.stack.append(current)
                # step 3
                current.removeWall(nextN)
                # step 4
                current = nextN

            elif len(self.stack) > 0:
                current = self.stack.pop()

            visit = sum([1 for g in self.grid if g.visited])     
            if visit == len(self.grid):
                break
    
    def export(self):
        return {
            'width': self.width, 
            'height': self.height, 
            'w': self.w, 
            'cols': self.cols, 
            'rows': self.rows, 
            'data': [g.export() for g in self.grid], 
            'path': self.path
        }

    def checkNeighbors(self, cell):
        top = self.checkinlist(self.index(cell.i, cell.j - 1))
        right = self.checkinlist(self.index(cell.i + 1, cell.j))
        bottom = self.checkinlist(self.index(cell.i, cell.j + 1))
        left = self.checkinlist(self.index(cell.i - 1, cell.j))
    
        allneigh = [top, right, bottom, left]

        neigh = []

        for n in allneigh:
            if n and not n.visited:
                neigh.append(n)

        if len(neigh) > 0:
            return choice(neigh)
        else:
            return False

    def index(self, i, j):
        try:
            if i < 0 or j < 0 or i > (self.cols - 1) or j > (self.rows - 1):
                return len(self.grid) + 1

            return i + (j * self.rows)
        except Exception:
            return self.cols * self.rows +  1

    def checkinlist(self, idx):
        try:
            return self.grid[idx]
        except IndexError:
            return False

