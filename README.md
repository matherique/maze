Maze generator
=====
Maze generator using depth-first search algorithm 
[wiki](https://en.wikipedia.org/wiki/Maze_generation_algorithm)

Usage
-----
 
__Default maze:__
```
./maze.py
```
_*need add chmod +x in maze.py_

__Setting Width and Height:__
```
WIDTH=1000 HEIGHT=1000 ./maze.py
```
_*default width and height is 400_

__Setting how many maze data do you need:__
```
QTD=10 ./maze.py
```
_*default qtd is 10_
	
__Setting size of cell:__
```
W=30 ./maze.py
```
_*default qtd is 20_

__Save track path to generate it:__
```
# TRACK_PATH=0 => False
# TRACK_PATH=1 => True
TRACK_PATH=0 ./maze.py
```
_*default qtd is TRUE_           