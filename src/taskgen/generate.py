from copy import copy
from typing import Dict, List
import itertools
import os
import re
import sys


Classes = Dict[str, List[str]]


def file_read(path: str) -> List[str]:
	if not os.path.exists(path):
		raise Exception(f"Path '{path}' does not exist.")

	with open(path) as f:
		return [l for l in f.read().splitlines() if l and not l.startswith('#')]

def classes_load(path: str) -> Classes:
	if not os.path.exists(path):
		raise Exception(f"Path '{path}' does not exist.")

	r = {}

	for file in os.listdir(path):
		name = file.rsplit('.', 1)[0]
		file = os.path.join(path, file)

		if not os.path.isfile(file):
			continue

		r[name] = file_read(file)

	return r

def generate_permutations(classes: Classes, task: str) -> List[str]:
	groups = [m for m in re.finditer(r'{(\w+)}', task)]

	if not groups:
		return [task]

	r = []

	for p in itertools.product(*[classes[g.group(1)] for g in groups]):
		t = copy(task)

		for i, c in enumerate(p):
			t = t.replace(groups[i].group(0), c, 1)

		r.append(t)

	return r


if __name__ == '__main__':

	# TODO
	# associate difficulty value with each class member
	# make a function to calculate combined difficulty value for each permutation
	# group tasks by difficulty value in three groups

	classes = classes_load('classes')
	tasks = []

	file = 'tasks.template.txt'

	if sys.argv[1:]:
		file = sys.argv[1]

	for line in file_read(file):
		tasks += generate_permutations(classes, line)

	for line in tasks:
		print(line)