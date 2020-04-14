#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

class DictError(ValueError):
	pass

class ChineseParser():
	def __init__(self,fileName):
		self.data = self._parse_(fileName)

	def _parse_(self,fileName):
		with open(fileName, "r") as gFile:
			content = gFile.readlines()
			arr = []
			for ln in content:
				arr.append(ln.split("-"))
			for i in range(len(arr)):
				for j in range(3):
					arr[i][j] = arr[i][j].strip().split(" ")
		return arr

	def splitPinYin(self):
		arr = []		
		for d in self.data:
			if (len(d[1]) != len(d[2])):
				raise DictError("["+d[0]+"@"+str(data.index(d)+1)+"] A PinYin isn't translated")
			for x,y in zip(d[1],d[2]):
				arr.append([x,y])
		return arr
