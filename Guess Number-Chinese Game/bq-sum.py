#!/usr/bin/env python
import os
import sys
import operator
import datetime
from pathlib import Path
from statistics import mean, median, mode

scores = {}
player_scores = {}
first_place = {}
last_place = {}
second_place = {}
num_games = {}

def read_scores(fileName):
    global scores
    global first_place
    global last_place
    global num_games
    game_scores = {}
    with open(fileName) as file:
        first_line = None
        players = None
        for line in file:
            if first_line == None:
                first_line = line
                players = first_line.strip().split(",")
                for player in players:
                    if player not in scores.keys():
                        scores[player] = 0
                    if player not in player_scores.keys():
                        player_scores[player] = []
                    if player not in first_place.keys():
                        first_place[player] = 0
                    if player not in last_place.keys():
                        last_place[player] = 0
                    if player not in second_place.keys():
                        second_place[player] = 0
                    if player not in game_scores.keys():
                        game_scores[player] = 0
                    if player not in num_games.keys():
                        num_games[player] = 1
                    else:
                        num_games[player] = num_games[player] + 1
                continue
            turnScores = line.strip().split(",")
            for i, player in enumerate(players):
                scores[player] = scores[player] + int(turnScores[i])
                player_scores[player].append(int(turnScores[i]))
                game_scores[player] = game_scores[player] + int(turnScores[i])
        first_to_last = sorted(game_scores.items(), key=operator.itemgetter(1)) 
        first_place[first_to_last[0][0]] = first_place[first_to_last[0][0]] + 1
        second_place[first_to_last[1][0]] = second_place[first_to_last[1][0]] + 1
        first_to_last.reverse()
        last_place[first_to_last[0][0]] = last_place[first_to_last[0][0]] + 1


def print_scores(scores):
    playerLine = ""
    for player in scores.keys():
        playerLine = playerLine + player + 3*"\t"
    print("players: " + 3*"\t" + playerLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(sum(player_scores[player])) + 3*"\t"
    print("scores: " + 3*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(round(mean(player_scores[player]),3)) + 3*"\t"
    print("mean: " + 4*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(mode(player_scores[player])) + 3*"\t"
    print("mode: " + 4*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(median(player_scores[player])) + 3*"\t"
    print("median: " + 3*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(max(player_scores[player])) + 3*"\t"
    print("max: " + 4*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(sum(i < 0 for i in player_scores[player])) + 3*"\t"
    print("minus: " + 4*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(len(player_scores[player])) + 3*"\t"
    print("turns: " + 4*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(sum(i > 12 for i in player_scores[player])) + 3*"\t"
    print("queen: " + 4*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(round(sum(i > 12 for i in player_scores[player])/len(player_scores[player]),3)) + 3*"\t"
    print("q/game: " + 3*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(first_place[player]) + 3*"\t"
    print("first: " + 4*"\t" + scoreLine)
    scoreLine = ""
    for player in second_place.keys():
        scoreLine = scoreLine + str(second_place[player]) + 3*"\t"
    print("second: " + 3*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(last_place[player]) + 3*"\t"
    print("last: " + 4*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(num_games[player]) + 3*"\t"
    print("games: " + 4*"\t" + scoreLine)
    scoreLine = ""
    for player in scores.keys():
        scoreLine = scoreLine + str(round(scores[player]/num_games[player],3)) + 3*"\t"
    print("sc/ga: " + 4*"\t" + scoreLine)
    print("\n")


for file_path in Path('scores').glob('*bq-scores*.txt'):
    read_scores(file_path)

print_scores(scores)