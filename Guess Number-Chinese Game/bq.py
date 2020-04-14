#!/usr/bin/env python
import os
import sys
import datetime

outputFileName = (datetime.datetime.now()).strftime("%a-%m-%d-%Y-%I-%M-%S") + '-bq-scores.txt'
maxPoints = 25
maxScore = 100

scores = {}

def print_scores(scores):
    playerLine = ""
    for player in scores.keys():
        playerLine = playerLine + player + "\t"
    print(playerLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(scores[player]) + "\t"
    print(scoreLine)
    print("\n")

if len(sys.argv) > 1:
    outputFileName = sys.argv[1]
    if not os.path.exists(outputFileName):
        print("input score file does not exist")
        sys.exit(0)
    with open(outputFileName) as file:
        first_line = None
        for line in file:
            if first_line == None:
                first_line = line
                players = first_line.strip().split(",")
                for player in players:
                    scores[player] = 0
                continue
            turnScores = line.strip().split(",")
            for i, player in enumerate(scores.keys()):
                scores[player] = scores[player] + int(turnScores[i])
    print_scores(scores)

else:
    print('\nEnter unique player names, enter "q" to quit')

    while True:
        print('\n')
        player = input('player name: ')
        if player == 'q':
            break
        if player in scores:
            print('player already exists, enter unique player name')
            continue
        scores[player] = 0


print("")
print("")

def write_scores(fileName, turnScores):
    write_mode = 'w+'
    if os.path.exists(fileName):
        write_mode = 'a'
    with open(outputFileName, write_mode) as file:
        header = ""
        players = turnScores.keys()
        if write_mode != 'a':
            for player in players:
                header = header + player + ","
            header = header[:-1] + "\n"
            file.write(header)
        scoreLine = ""
        for player in players:
            scoreLine = scoreLine + str(turnScores[player]) + ","
        scoreLine = scoreLine[:-1] + "\n"
        file.write(scoreLine)


while True:
    print("\n")
    turnScores = {}
    scoreSum = 0
    for player in scores.keys():
        score = int(input(player + ' score for this turn:  '))
        if score > 0:
            scoreSum = scoreSum + score
        turnScores[player] = score
    if scoreSum != maxPoints:
        print("score does not add up to 25, please re-enter the scores for this turn")
        continue
    else:
        for player in turnScores.keys():
            scores[player] = scores[player] + turnScores[player]
        write_scores(outputFileName, turnScores)
        print_scores(scores)
        for player in scores.keys():
            if scores[player] >= maxScore:
                print("Game over! " + player + " crossed 100")
                sys.exit(0)

