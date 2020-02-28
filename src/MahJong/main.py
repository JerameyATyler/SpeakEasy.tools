### To play a MJ game with statistics and gas payments
from random import randint, shuffle
from MJ import Game, Player
from MJ.Decision import Human, Freshman, Sophomore, Viewer
from MJ.Utilities import Status
from Teams.Manage import Manage
import json, sys, time

manage = Manage()
largv = len(sys.argv) # handle system parameters sys.argv[1]
flag = True
if largv == 1: para = '1111' # 4 ai
elif largv == 2:
	if sys.argv[1] == "0":  para = '1111' # 4 ai
	elif sys.argv[1] == "1": para ='0111' # 3 ai and one human
	elif sys.argv[1] == "9": para ='9111' # 3 ai and one human
	elif sys.argv[1] == '-m': 
		flag = False
		manage.query()
	elif len(sys.argv[1]) == 4: para = sys.argv[1] # customized
	else: para = '1111'
if flag: # to manage the players or teams
	while manage.data['number'] < (5 - int('0' in para)):
		print('\nInsufficient players found; only %d players exist.\n' % manage.data['number'])
		manage.query()
		manage.reload()
		flag = manage.data['number'] >= (5 - int('0' in para))
if flag: # start a game
	serial = 0
	gameSerial = 1
	startTime = time.time()
	codes = {-1: 0, 0: 0, 1: 0, 2: 0, 3: 0, 12: 0}
	while True:
		game = Game.Game(100, 50, gameSerial, serial)
		## 1. prepare facilities of 4 players
		characters = []
		players = []
		if '0' in para: characters.append(0)
		while len(characters) < 4: # randomly picks 4 characters
			r = randint(1, manage.data['number'] - 1)
			if r not in characters: characters.append(r)
		directions = [0, 1, 2, 3]
		# shuffle(directions) # to be uncommanded
		# r = sum(game.rolling()) % 4 # to be uncommanded
		r = 0
		host = directions[r]
		for i in range(4): directions[i] = (directions[i] + 4 - host) % 4
		
		once = True
		for i in range(4):
			p = manage.data['players'][manage.data['addresses'][characters[i]]]
			if para[i] == '0':
				if once:
					p = manage.data['players'][manage.data['human']]
					once = False
				players.append(Player.Player(directions[i], p['name'], p['wealth'], p['won'], p['address'], Human()))
			elif para[i] == '1': players.append(Player.Player(directions[i], p['name'], p['wealth'], p['won'], p['address'], Freshman()))
			elif para[i] == '2': players.append(Player.Player(directions[i], p['name'], p['wealth'], p['won'], p['address'], Sophomore()))
			elif para[i] == '9': players.append(Player.Player(directions[i], p['name'], p['wealth'], p['won'], p['address'], Viewer()))
		players.sort(key = lambda x: x.index)
		game.players = players
		## 2. start a game
		while game.progress < 16:
			game.refresh()
			while game.status == Status.PLAYING:
				game.catch()
				if game.status == Status.PLAYING: game.patch(True)
			codes[game.winCode] += 1
			if game.winCode != -1: 
				for w in game.winners: 
					p = game.players[w]
					manage.data['players'][p.address]['won'] += 1
				for i in range(4):
					p = game.players[i]
					manage.data['players'][p.address]['wealth'] = p.wealth
			# 2-n. payment
			# if game.records:
			# 	r = game.records[-1]
			# 	with open('./record.json', "w") as f:
			# 		json.dump(r, f)

		## 3. show statistics and begin next game
		duration = time.time() - startTime
		serial = game.serial
		print('\n------------------ statistics ------------------ \n')
		print('%d games in %d seconds, %6.4f seconds in average.\n' % (serial, duration, float(duration/serial)))
		print('      fail \tself win \t      win \t 7 win 1 \t8 flower \t1 loses 3\n' )
		print('%10d \t %7d \t  %7d \t %7d \t %7d \t %8d \n' % (codes[-1], codes[0], codes[1], codes[2], codes[3], codes[12]))
		print('%6.4f %% \t%6.4f %% \t%6.4f %% \t%6.4f %% \t%6.4f %% \t%7.4f %%' % (codes[-1] / serial * 100, codes[0] / serial * 100, codes[1] / serial * 100, codes[2] / serial * 100, codes[3] / serial * 100, codes[12] / serial * 100))
		manage.displayPlayers()
		print([p.decision.code for p in game.players])
		
		print('------------------ finish ------------------ \n')
		gameSerial += 1

		if not gameSerial % 100:
			with open('./Teams/players.json', "w") as f:
				json.dump(manage.data, f)
