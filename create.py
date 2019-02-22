#!/usr/bin/env python3
import json
import os
from maze import Maze

# setting constants
WIDTH = int(os.environ.get('WIDTH')) if 'WIDTH' in os.environ else 400
HEIGHT = int(os.environ.get('HEIGHT')) if 'HEIGHT' in os.environ else 400
QTD = int(os.environ.get('QTD')) if 'QTD' in os.environ else 1
W = int(os.environ.get('W')) if 'W' in os.environ else 20

for x in range(QTD):
    m = Maze(WIDTH, HEIGHT, W)
    m.create()
    data = m.export()

    filename = "data-%d.json" % x
    with open('data/' + filename, 'w') as fp:
        json.dump(data, fp)
