class Cell:
    def __init__(self):
        self.visited = False
        self.walls = [True, True, True, True]

    def __str__(self):
        return "Cell"


grid = []

for _ in range(10):
    grid.append(Cell())


def checkinlist(index):
    try:
        return grid[index]
    except IndexError:
        return False

top = checkinlist(1)


right = checkinlist(10)




