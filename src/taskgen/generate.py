from collections import defaultdict
from copy import copy
from typing import Dict, Generator, List, Tuple
import itertools
import os
import re
import sys

Line = Tuple[str, float]
Classes = Dict[str, List[Line]]


def file_read(path: str) -> Generator[Line, None, None]:
	if not os.path.exists(path):
		raise Exception(f"Path '{path}' does not exist.")

	with open(path) as f:
		for line in f.read().splitlines():
			line = line.strip()

			if not line:
				continue

			if line.startswith('#'):
				continue

			text = line
			score = 0.0

			if re.match(r'^.+:[\d\.]+$', line):
				parts = line.rsplit(':', 1)
				text = parts[0]

				if len(parts) > 1:
					score = float(parts[1])

			yield (text, score)

def classes_read(path: str) -> Classes:
	if not os.path.exists(path):
		raise Exception(f"Path '{path}' does not exist.")

	r = defaultdict(list)

	for file in os.listdir(path):
		name = file.rsplit('.', 1)[0]
		file = os.path.join(path, file)

		if not os.path.isfile(file):
			continue

		r[name] = [*file_read(file)]

	return r

def generate_permutations(classes: Classes, line: Line) -> List[Line]:
	task, score = line
	groups = [m for m in re.finditer(r'{([\w ]+)(:([\d\.]+))?}', task)]

	if not groups:
		return [line]

	r = []

	for p in itertools.product(*[classes[g.group(1)] for g in groups]):

		t = copy(task)
		s = score

		for i, (pt, ps) in enumerate(p):
			t = t.replace(groups[i].group(0), pt, 1)
			w = float(groups[i].groups(1.0)[2])
			s += w * ps

		r.append((t, s))

	return r

if __name__ == '__main__':
	PATH = os.path.dirname(os.path.abspath(__file__))
	classes = classes_read(os.path.join(PATH, 'classes'))
	file = os.path.join(PATH, 'tasks.template.txt')

	if sys.argv[1:]:
		file = sys.argv[1]

	tasks = []

	for line in file_read(file):
		tasks += generate_permutations(classes, line)

	for task, score in sorted(tasks, key=lambda x: x[1]):
		print(f'{task}:{score:.2f}')