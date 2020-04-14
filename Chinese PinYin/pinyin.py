#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.insert(0,"lib")
from parser import ChineseParser
import random

nb = 20
score = 0

cp = ChineseParser("data/dico.iq")
gameData = cp.splitPinYin()

print("Translate these "+str(nb)+" HanZi to PinYin:")
for i in range(nb):
	# Select an element
	rd = random.choice(gameData)
	gameData.pop(gameData.index(rd))

	inp = raw_input("\t"+rd[1]+":")
	if (inp.lower() == rd[0].lower()):
		print("\tCorrect \033[32m✓\033[0m")
		score += 1
	else:
		print("\t"+rd[0]+" \033[31m✗\033[0m")
