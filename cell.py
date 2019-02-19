class Cell:
    def __init__(self, i, j):
        self.i = i
        self.j = j
        self.visited = False
        self.walls = [True, True, True, True]

    def export(self):
        return {
            'top': int(self.walls[0]),
            'right': int(self.walls[1]),
            'bottom': int(self.walls[2]),
            'left': int(self.walls[3]),
        }

    def removeWall(self, cell):
        a, b = self, cell
        if a.i - b.i == 1:
            a.walls[3] = False
            b.walls[1] = False
        elif a.i - b.i == -1:
            a.walls[1] = False
            b.walls[3] = False

        if a.j - b.j == 1:
            a.walls[0] = False
            b.walls[2] = False
        elif a.j - b.j == -1:
            a.walls[2] = False
            b.walls[0] = False

