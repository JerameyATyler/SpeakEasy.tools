import pygame
from datetime import datetime


pygame.init()
# parameter initialization
window_width = 850  # window width
window_height = 775  # window height
play_loc_x = 50  # loaction of the play window
play_loc_y = 50  # location of the play window
play_width = 600  # width of the play window
play_height = 675  # height of the play window
img_size = 33  # half the the image size
block_size = play_width // 8  # size of each block
# pieces images
pieces = [[pygame.image.load('./pieces/G_R.png'), pygame.image.load('./pieces/A_R.png'),
           pygame.image.load('./pieces/E_R.png'), pygame.image.load('./pieces/H_R.png'),
           pygame.image.load('./pieces/C_R.png'), pygame.image.load('./pieces/Ca_R.png'),
           pygame.image.load('./pieces/S_R.png')],
          [pygame.image.load('./pieces/G_B.png'), pygame.image.load('./pieces/A_B.png'),
           pygame.image.load('./pieces/E_B.png'), pygame.image.load('./pieces/H_B.png'),
           pygame.image.load('./pieces/C_B.png'), pygame.image.load('./pieces/Ca_B.png'),
           pygame.image.load('./pieces/S_B.png')]]
# 90 blocks in the play window
blocks = []
for i in range(10):
    for j in range(9):
        blocks.append(pygame.Rect(play_loc_y + j * block_size - 33, play_loc_y + i * block_size - 33, 66, 66))
# two types of locations the general and advisor can be
loc_1 = [(play_loc_x + 4 * block_size, play_loc_y),
         (play_loc_x + 3 * block_size, play_loc_y + block_size),
         (play_loc_x + 5 * block_size, play_loc_y + block_size),
         (play_loc_x + 4 * block_size, play_loc_y + 2 * block_size),
         (play_loc_x + 4 * block_size, play_loc_y + play_height),
         (play_loc_x + 3 * block_size, play_loc_y + play_height - block_size),
         (play_loc_x + 5 * block_size, play_loc_y + play_height - block_size),
         (play_loc_x + 4 * block_size, play_loc_y + play_height - 2 * block_size)]
loc_2 = [(play_loc_x + 3 * block_size, play_loc_y),
         (play_loc_x + 5 * block_size, play_loc_y),
         (play_loc_x + 4 * block_size, play_loc_y + block_size),
         (play_loc_x + 3 * block_size, play_loc_y + 2 * block_size),
         (play_loc_x + 5 * block_size, play_loc_y + 2 * block_size),
         (play_loc_x + 3 * block_size, play_loc_y + play_height),
         (play_loc_x + 5 * block_size, play_loc_y + play_height),
         (play_loc_x + 4 * block_size, play_loc_y + play_height - block_size),
         (play_loc_x + 3 * block_size, play_loc_y + play_height - 2 * block_size),
         (play_loc_x + 5 * block_size, play_loc_y + play_height - 2 * block_size)]
# relationship between number and the name of actual piece
relation = {0: 'General', 1: 'Avisor', 2: 'Elephant', 3: 'Horse', 4: 'Chariot', 5: 'Cannon', 6: 'Soldier'}


# class Player(object):
#     """This is a class used to define a player"""
#     def __init__(self, color):
#         self.color = color  # identify the player is red or black


class Piece(object):
    """This is a class used to define a piece"""
    def __init__(self, x, y, piece):
        self.x = x  # x location
        self.y = y  # y location
        self.piece = piece  # which kind of the piece


def init_pieces(color):
    """This function is to initialize the pieces"""
    piece = {}  # a dictionary to store the pieces
    offsite = 1 if color == 'black' else 0  # offiste used to distiguish red and black when locating them
    # General
    g = Piece(play_loc_x + 4 * block_size - img_size, play_loc_y + play_height - offsite * play_height - img_size, 0)
    # Advisor
    a_1 = Piece(play_loc_x + 3 * block_size - img_size, play_loc_y + play_height - offsite * play_height - img_size, 1)
    a_2 = Piece(play_loc_x + 5 * block_size - img_size, play_loc_y + play_height - offsite * play_height - img_size, 1)
    # Elephant
    e_1 = Piece(play_loc_x + 2 * block_size - img_size, play_loc_y + play_height - offsite * play_height - img_size, 2)
    e_2 = Piece(play_loc_x + 6 * block_size - img_size, play_loc_y + play_height - offsite * play_height - img_size, 2)
    # Horse
    h_1 = Piece(play_loc_x + 1 * block_size - img_size, play_loc_y + play_height - offsite * play_height - img_size, 3)
    h_2 = Piece(play_loc_x + 7 * block_size - img_size, play_loc_y + play_height - offsite * play_height - img_size, 3)
    # Chariot
    c_1 = Piece(play_loc_x - img_size, play_loc_y + play_height - offsite * play_height - img_size, 4)
    c_2 = Piece(play_loc_x + 8 * block_size - img_size, play_loc_y + play_height - offsite * play_height - img_size, 4)
    # Cannon
    ca_1 = Piece(play_loc_x + 1 * block_size - img_size,
                 play_loc_y + 7 * block_size - offsite * (5 * block_size) - img_size, 5)
    ca_2 = Piece(play_loc_x + 7 * block_size - img_size,
                 play_loc_y + 7 * block_size - offsite * (5 * block_size) - img_size,  5)
    # Soldier
    s_1 = Piece(play_loc_x - img_size, play_loc_y + 6 * block_size - offsite * (3 * block_size) - img_size, 6)
    s_2 = Piece(play_loc_x + 2 * block_size - img_size,
                play_loc_y + 6 * block_size - offsite * (3 * block_size) - img_size, 6)
    s_3 = Piece(play_loc_x + 4 * block_size - img_size,
                play_loc_y + 6 * block_size - offsite * (3 * block_size) - img_size, 6)
    s_4 = Piece(play_loc_x + 6 * block_size - img_size,
                play_loc_y + 6 * block_size - offsite * (3 * block_size) - img_size, 6)
    s_5 = Piece(play_loc_x + 8 * block_size - img_size,
                play_loc_y + 6 * block_size - offsite * (3 * block_size) - img_size, 6)
    # uodate the dictionary
    piece.update({(g.x, g.y): g, (a_1.x, a_1.y): a_1, (a_2.x, a_2.y): a_2, (e_1.x, e_1.y): e_1, (e_2.x, e_2.y): e_2,
                  (h_1.x, h_1.y): h_1, (h_2.x, h_2.y): h_2, (c_1.x, c_1.y): c_1, (c_2.x, c_2.y): c_2,
                  (ca_1.x, ca_1.y): ca_1, (ca_2.x, ca_2.y): ca_2, (s_1.x, s_1.y): s_1, (s_2.x, s_2.y): s_2,
                  (s_3.x, s_3.y): s_3, (s_4.x, s_4.y): s_4, (s_5.x, s_5.y): s_5})
    return piece


def update(x, y, friend, enemy, candidate, turn):
    """This function is to update the location of pieces when you move or kill"""
    cur_piece = friend[candidate]
    if (x, y) in friend.keys():  # change candidate
        candidate = (x, y)
        return candidate, turn
    if valid_move(cur_piece, (x, y), turn, friend, enemy):
        if (x, y) in enemy.keys():  # kill an enemy
            if enemy[(x, y)].piece == 0:
                return (turn, turn), 0
            killed = enemy.pop((x, y))  # delete the enemy
            moved = friend[(candidate[0], candidate[1])]  # the piece to be moved
            moved.x = x  # uodate x location
            moved.y = y  # update y location
            friend.pop((candidate[0], candidate[1]))  # delete the old location
            update_log(cur_piece, turn, candidate, (x + 33, y + 33), 0, killed)
            friend[(x, y)] = moved  # add the new new location
            candidate = None  # remove the candidate
            turn = -turn  # switch turn
        else:  # move
            moved = friend[(candidate[0], candidate[1])]  # the piece to be moved
            moved.x = x  # update the x location
            moved.y = y  # update the y location
            friend.pop((candidate[0], candidate[1]))  # delete the old location
            friend[(x, y)] = moved  # add the new location
            update_log(cur_piece, turn, candidate, (x + 33, y + 33), 1, None)
            candidate = None  # remove the candidate
            turn = -turn  # switch turn
    return candidate, turn


def valid_move(piece, next_loc, turn, friend, enemy):
    """This function is to check if a move is valid"""
    if piece.piece == 0 or piece.piece == 1:  # check for general and advisor
        return valid_move_gen_adv(piece, next_loc, turn, friend)
    elif piece.piece == 2:  # check for elephant
        return valid_move_elephant(piece, next_loc, turn, friend, enemy)
    elif piece.piece == 3:  # check for horse
        return valid_move_horse(piece, next_loc, friend, enemy)
    elif piece.piece == 4:  # check for chariot
        return valid_move_chariot(piece, next_loc, friend, enemy)
    elif piece.piece == 5:  # check for cannon
        return valid_move_cannon(piece, next_loc, friend, enemy)
    else:  # check for soilders
        return valid_move_soilder(piece, next_loc, turn)


def valid_move_cannon(piece, next_loc, friend, enemy):
    """This function is to check if a move for cannon is valid"""
    # valid for kill
    if (next_loc[0] == piece.x or next_loc[1] == piece.y) and next_loc in enemy.keys():  # choose a enemy
        if next_loc[0] == piece.x:  # vertically
            head = next_loc[1]
            tail = piece.y
            cnt = 0
            if head > tail:
                head, tail = tail, head
            # see how many pieces between the two target pieces
            for y in range(head + block_size, tail, block_size):
                if (piece.x, y) in friend.keys() or (piece.x, y) in enemy.keys():
                    cnt += 1
            if cnt != 1:  # if there is no or more than one, it is invalid
                return False
        if next_loc[1] == piece.y:  # horizontally
            head = next_loc[0]
            tail = piece.x
            cnt = 0
            if head > tail:
                head, tail = tail, head
            # see how many pieces between the two target pieces
            for x in range(head + block_size, tail, block_size):
                if (x, piece.y) in friend.keys() or (x, piece.y) in enemy.keys():
                    cnt += 1
            if cnt != 1:  # if there is no or more than one, it is invalid
                return False
        return True
    # valid for move
    else:
        return valid_move_chariot(piece, next_loc, friend, enemy)  # the move rule is the same as chariot


def valid_move_chariot(piece, next_loc, friend, enemy):
    """This function is to check if a move for chariot is valid"""
    if next_loc[0] - piece.x == 0:  # move vertically
        # boundaries for the movement of the pieces
        low = (piece.x, play_loc_y + play_height)
        up = (piece.x, play_loc_y)
        potential = [piece.x, piece.y]
        # check lower bound
        while potential[1] <= play_loc_y + play_height:
            potential[1] += block_size
            if (potential[0], potential[1]) in friend.keys():  # if there is a freind in the way
                low = (potential[0], potential[1] - block_size)
                break
            if (potential[0], potential[1]) in enemy.keys():  # if there is an enemy in the way
                low = potential
                break
        potential = [piece.x, piece.y]
        # check the up bound
        while play_loc_y <= potential[1]:
            potential[1] -= block_size
            if (potential[0], potential[1]) in friend.keys():  # if there is a freind in the way
                up = (potential[0], potential[1] + block_size)
                break
            if (potential[0], potential[1]) in enemy.keys():  # if there is an enemy in the way
                up = potential
                break
        return up[1] <= next_loc[1] <= low[1]
    elif next_loc[1] - piece.y == 0:  # move horizontally
        # boundaries for the movement of the pieces
        right = (play_loc_x + play_width, piece.y)
        left = (play_loc_x, piece.y)
        potential = [piece.x + img_size, piece.y + img_size]
        # check the right bound
        while potential[0] < play_loc_x + play_width:
            potential[0] += block_size
            if (potential[0], potential[1]) in friend.keys():  # if there is a freind in the way
                right = (potential[0] - block_size, potential[1])
                break
            if (potential[0], potential[1]) in enemy.keys():  # if there is an enemy in the way
                right = potential
                break
        potential = [piece.x + img_size, piece.y + img_size]
        # check the left bounf
        while play_loc_x < potential[0]:
            potential[0] -= block_size
            if (potential[0], potential[1]) in friend.keys():  # if there is a freind in the way
                left = (potential[0] + block_size, potential[1])
                break
            if (potential[0], potential[1]) in enemy.keys():  # if there is an enemy in the way
                left = potential
                break
        return left[1] <= next_loc[1] <= right[1]
    else:
        return False


def valid_move_horse(piece, next_loc, friend, enemy):
    """This function is to check if a move for horse is valid"""
    # possible locations for the next move
    valid_loc = [(piece.x - block_size, piece.y - 2 * block_size), (piece.x + block_size, piece.y - 2 * block_size),
                 (piece.x - block_size, piece.y + 2 * block_size), (piece.x + block_size, piece.y + 2 * block_size),
                 (piece.x - 2 * block_size, piece.y - block_size), (piece.x + 2 * block_size, piece.y - block_size),
                 (piece.x - 2 * block_size, piece.y + block_size), (piece.x + 2 * block_size, piece.y + block_size)]
    # locations that will block the move
    cannotbe_loc = [(piece.x + block_size, piece.y), (piece.x - block_size, piece.y),
                    (piece.x, piece.y + block_size), (piece.x, piece.y - block_size)]
    if next_loc in valid_loc and next_loc not in friend.keys():
        dis_x = next_loc[0] - piece.x
        dis_y = next_loc[1] - piece.y
        if dis_x == 2 * block_size and cannotbe_loc[0] not in friend.keys() and cannotbe_loc[0] not in enemy.keys():
            return True
        elif dis_x == - 2 * block_size and cannotbe_loc[1] not in friend.keys() and cannotbe_loc[1] not in enemy.keys():
            return True
        elif dis_y == 2 * block_size and cannotbe_loc[2] not in friend.keys() and cannotbe_loc[2] not in enemy.keys():
            return True
        elif dis_y == - 2 * block_size and cannotbe_loc[3] not in friend.keys() and cannotbe_loc[3] not in enemy.keys():
            return True
        else:
            return False
    return False


def valid_move_soilder(piece, next_loc, turn):
    """This function is to check if the move for soilder is valid"""
    if turn == 1:  # for red player
        if piece.y >= play_loc_y + 5 * block_size:  # not cross the half line
            return next_loc == (piece.x, piece.y - block_size)  # can only move forward
        else:
            # forward and left and right but not backward
            valid_loc = [(piece.x, piece.y - block_size), (piece.x - block_size, piece.y),
                         (piece.x + block_size, piece.y)]
            return next_loc in valid_loc
    else:  # for black player
        if piece.y <= play_loc_y + 4 * block_size:  # not cross the half line
            return next_loc == (piece.x, piece.y + block_size)  # can only move forward
        else:
            # forward and left and right but bot backward
            valid_loc = [(piece.x, piece.y + block_size), (piece.x - block_size, piece.y),
                         (piece.x + block_size, piece.y)]
            return next_loc in valid_loc


def valid_move_elephant(piece, next_loc, turn, friend, enemy):
    """This function is to check if a move for elephant is valid"""
    dis_x = next_loc[0] - piece.x  # distance x of move
    dis_y = next_loc[1] - piece.y  # distance y of move
    if abs(dis_x) == 2 * block_size and abs(dis_y) == 2 * block_size and \
            (piece.x + dis_x // 2, piece.y + dis_y // 2) not in friend.keys() and \
            (piece.x + dis_x // 2, piece.y + dis_y // 2) not in enemy.keys():
        if turn == 1:  # red player's turn
            return next_loc[1] >= play_loc_y + 4 * block_size  # check if cross the half-line
        else:  # black player's turn
            return next_loc[1] <= play_loc_y + 4 * block_size  # check if cross the half-line
    return False


def valid_move_gen_adv(piece, next_loc, turn, friend):
    """This function is to check if a move for general or advisor is valid"""
    dis_x = abs(next_loc[0] - piece.x)
    dis_y = abs(next_loc[1] - piece.y)
    if (next_loc[0] + 33 < play_loc_x + 3 * block_size or next_loc[0] + 33 > play_loc_x + 5 * block_size) or \
            (turn == 0 and next_loc[1] + 33 > play_loc_y + 2 * block_size) or \
            (turn == 1 and play_loc_y + play_height - 2 * block_size > next_loc[1] + 33):
        return False  # return False if the chosen location is outside the square location
    if (piece.x + 33, piece.y + 33) in loc_1:  # where the piece can move in four directions
        if ((dis_y == block_size and dis_x == 0) or (dis_x == block_size and dis_y == 0)) and \
                next_loc not in friend.keys():
            return True
    elif (piece.x + 33, piece.y + 33) in loc_2:  # where the piece can move in eight directions
        if dis_y < 2 * block_size and dis_x < 2 * block_size and next_loc not in friend.keys():
            return True
    return False


def draw_loss(window, lost):
    """This function is to check if a player is lost"""
    lostfont = pygame.font.SysFont("comicsans", 100, True, False)  # lost display font
    restartfont = pygame.font.SysFont("comicsans", 50, True, False)  # lost display font
    lostplayer1 = lostfont.render('Player2 Win!', 1, (0, 90, 0))  # player1 lost and its color
    lostplayer2 = lostfont.render('Player1 Win!', 1, (0, 90, 0))  # player2 lost and its color
    restart = restartfont.render('Press Any Key to Exit!', 1, (0, 90, 0))
    if lost == 1:
        window.blit(lostplayer2, ((window_width - lostplayer2.get_width())//2 - 30,
                                  (window_height - lostplayer1.get_height()) // 2))
        window.blit(restart, ((window_width - lostplayer2.get_width()) // 2 - 30,
                              (window_height + lostplayer1.get_height()) // 2))
    elif lost == -1:
        window.blit(lostplayer1, ((window_width - lostplayer1.get_width())//2 - 30,
                                  (window_height - lostplayer2.get_height()) // 2))
        window.blit(restart, ((window_width - lostplayer2.get_width()) // 2 - 30,
                              (window_height + lostplayer1.get_height()) // 2))


def update_log(piece, turn, cur_loc, next_loc, korm, enemy):
    """This function is to write the time and every move and the result of every game into the log file"""
    kind = relation[piece.piece]
    side = 'Red' if turn == 1 else 'Black'
    begin = ((cur_loc[0] - play_loc_x + 33) // block_size + 1, (cur_loc[1] - play_loc_y + 33) // block_size + 1)
    to = ((next_loc[0] - play_loc_x + 33) // block_size + 1, (next_loc[1] - play_loc_y + 33) // block_size + 1)
    with open('moves_archive.txt', 'a') as file:
        file.write('{0} {1}: from ({2},{3}) to ({4},{5})'.format(side, kind, begin[0], begin[1], to[0], to[1]))
        if korm == 0:
            enemy_kind = relation[enemy.piece]
            file.write('. Killed Enemy\'s {0}\n'.format(enemy_kind))
        else:
            file.write('\n')


def count_time():
    """This function is to count the time left for a play to make a move"""
    # TODO
    pass


def delay():
    """This function is to wait for exit when the game ends"""
    while True:
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:  # press any key to exit
                return


def draw_grid(window, turn):
    """This window is to draw the grid of the board"""
    x = play_loc_x
    y = play_loc_y
    # draw the outlines of the board
    pygame.draw.line(window, (0, 0, 0), (x, y), (x, y + play_height), 4)
    pygame.draw.line(window, (0, 0, 0), (x, y), (x + play_width, y), 4)
    pygame.draw.line(window, (0, 0, 0), (x, y + play_height), (x + play_width, y + play_height), 4)
    pygame.draw.line(window, (0, 0, 0), (x + play_width, y), (x + play_width, y + play_height), 4)
    # draw the vertical line inside the board
    for c in range(1, 9):
        pygame.draw.line(window, (0, 0, 0), (x + c * block_size, y), (x + c * block_size, y + 4 * block_size))
        pygame.draw.line(window, (0, 0, 0), (x + c * block_size, y + 5 * block_size),
                                            (x + c * block_size, play_loc_y + play_height))
    # draw the horizontal line inside the board
    for c in range(1, 9):
        pygame.draw.line(window, (0, 0, 0), (x, y + c * block_size), (x + play_width, y + c * block_size))
    # draw the slash inside the board
    pygame.draw.line(window, (0, 0, 0), (x + 3 * block_size, y), (x + 5 * block_size, y + 2 * block_size))
    pygame.draw.line(window, (0, 0, 0), (x + 5 * block_size, y), (x + 3 * block_size, y + 2 * block_size))
    pygame.draw.line(window, (0, 0, 0), (x + 3 * block_size, y + 7 * block_size),
                                        (x + 5 * block_size, y + 9 * block_size))
    pygame.draw.line(window, (0, 0, 0), (x + 5 * block_size, y + 7 * block_size),
                                        (x + 3 * block_size, y + 9 * block_size))
    # draw the words inside the board
    pygame.font.init()
    playerfont = pygame.font.SysFont("comicsans", 35, True, False)  # player font
    player1 = playerfont.render('Player1', 1, (255, 0, 0))  # player1 and its color
    player2 = playerfont.render('Player2', 1, (0, 0, 0))  # player2 and its color
    turnfont = pygame.font.SysFont("comicsans", 20, True, False)  # player font
    turn1 = turnfont.render('Your Turn', 1, (255, 0, 0))
    turn2 = turnfont.render('Your Turn', 1, (0, 0, 0))
    window.blit(player1, (play_loc_x + play_width + 50, play_loc_y + play_height - 3 * block_size))  # location
    window.blit(player2, (play_loc_x + play_width + 50, play_loc_y + block_size))  # location
    if turn == 1:
        window.blit(turn1, (play_loc_x + play_width + 50, play_loc_y + play_height - 3 * block_size + 30))  # location
    elif turn == -1:
        window.blit(turn2, (play_loc_x + play_width + 50, play_loc_y + block_size + 30))  # location
    wordfont = pygame.font.SysFont("comicsans", 50, True, False)  # player font
    chuhe = wordfont.render('ChuHe', 1, (0, 0, 0))  # chuhe and its color
    hanjie = wordfont.render('HanJie', 1, (0, 0, 0))  # hanjie and its color
    hanjie = pygame.transform.rotate(hanjie, 180)
    window.blit(chuhe, (play_loc_x + 60, play_loc_y + 4 * block_size + 20))
    window.blit(hanjie, (play_loc_x + play_width - 60 - hanjie.get_width(), play_loc_y + 4 * block_size + 20))


def draw_piece(window, piece, num, imgs):
    """This function is to draw the pieces"""
    for temp in piece.values():
        window.blit(imgs[num][temp.piece], (temp.x, temp.y))


def draw_win(window, red_piece, black_piece, turn):
    """This function is to draw the window"""
    window.fill((102, 51, 0))  # background color -> brown
    pygame.draw.rect(window, (255, 153, 51), (play_loc_x, play_loc_y, play_width, play_height))  # draw the play window
    draw_grid(window, turn)  # draw the lines
    draw_piece(window, red_piece, 0, pieces)  # draw the red pieces
    draw_piece(window, black_piece, 1, pieces)  # draw the black pieces
    pygame.display.update()


def main(window):
    """This is the main loop of this game"""
    run = True
    # player1 = Player("R")  # define player #1 (red)
    # player2 = Player("B")  # define player #2 (black)
    red_pieces = init_pieces('red')  # initialize the red pieces
    black_pieces = init_pieces('black')  # initialize the black pieces
    turn = 1  # 1 --> red, -1 --> black
    candidate = None
    x, y = None, None
    lost = None

    while run:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:  # quit
                run = False
                pygame.display.quit()
            if event.type == pygame.MOUSEBUTTONDOWN:  # when the mouse is clicked
                x, y = pygame.mouse.get_pos()  # get the location of the click
                for block in blocks:
                    if block.collidepoint(x, y):  # see which block it belongs to
                        x, y = block.center  # move the selected location to the middle
                        x -= 33
                        y -= 33
                        if candidate is None:  # if there is no candidate
                            if turn == 1:  # if it is the red turn
                                if (x, y) in red_pieces.keys():  # if the location is in red pieces
                                    candidate = (x, y)  # update candidate
                            else:  # if it is the black turn
                                if (x, y) in black_pieces.keys():  # if the location is in black pieces
                                    candidate = (x, y)  # update candidate
                        break

        if candidate is not None:  # if there is a candidate
            if turn == 1:  # red turn
                candidate, turn = update(x, y, red_pieces, black_pieces, candidate, turn)  # update
            elif turn == -1:  # black turn
                candidate, turn = update(x, y, black_pieces, red_pieces, candidate, turn)  # update
            else:
                lost = candidate[0]  # if one of the player is lost
                run = False

        draw_win(window, red_pieces, black_pieces, turn)  # draw the window

        if not run:
            if lost == 1:
                p_l = 2
                e = 1
            else:
                p_l = 1
                e = 2
            with open('moves_archive.txt', 'a') as file:
                file.write('Player{0} Killed Player{1}\'s General\nResult: Player{2} lost!\nGame ended at {3}\n'
                           .format(e, p_l, p_l, datetime.now()))
            draw_loss(window, lost)
            pygame.display.update()
            delay()


def log_window(window):
    """This function is to show the window that print out the log for last game"""
    run = True
    while run:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:  # quit
                run = False
        window.fill((0, 0, 0))
        font = pygame.font.SysFont("comicsansms", 25, True)
        offsite = 0  # location offsite
        with open("moves_archive.txt", 'r') as file:
            for line in file:  # read all the line in the file
                words = font.render(line, 1, (255, 255, 255))
                window.blit(words, (0, offsite))
                offsite += 20
        pygame.display.update()


def main_menu(window):
    """this is a window as a welcom window"""
    run = True
    while run:
        window.fill((0, 0, 0))  # background color -> black
        startfont = pygame.font.SysFont('comicsansms', 60, True)  # initial the font
        tipfont = pygame.font.SysFont('comicsansms', 20, True)  # initial the font
        label1 = startfont.render('Welcome to Chinese Chess', 1, (255, 255, 255))  # the sentence and color
        label2 = startfont.render('By Yutao Chen', 1, (255, 255, 255))  # the sentence and color
        label3 = startfont.render('Press SPACE To Play!', 1, (255, 255, 255))  # the sentence and color
        tip1 = tipfont.render('Press l To see the log for last game', 1, (255, 255, 255))
        tip2 = tipfont.render('Close the window to go back', 1, (255, 255, 255))
        # display the sentence on the screen
        window.blit(label1, ((window_width - label1.get_width()) / 2, (window_height / 2 - label1.get_height() - 25)))
        window.blit(label2, ((window_width - label2.get_width()) / 2, (window_height - label2.get_height()) / 2))
        window.blit(label3, ((window_width - label3.get_width()) / 2, (window_height + label3.get_height()) / 2))
        window.blit(tip1, ((window_width - tip1.get_width()) // 2, window_height - tip1.get_height() - 60))
        window.blit(tip2, ((window_width - tip2.get_width()) // 2, window_height - tip2.get_height() - 40))
        pygame.display.update()  # update the screen
        for event in pygame.event.get():
            if event.type == pygame.QUIT:  # quit
                run = False
            if event.type == pygame.KEYDOWN:  # if any key is pressed, start the game
                if event.key == pygame.K_SPACE:
                    with open('moves_archive.txt', 'w') as file:  # open the log file
                        file.write('Game Started at {0}\n'.format(datetime.now()))  # write into the file
                    main(window)  # main loop of the game
                if event.key == pygame.K_l:
                    log_window(window)
    pygame.display.quit()  # quit the game


surface = pygame.display.set_mode((window_width, window_height))  # initial the window
pygame.display.set_caption('Chinese Chess')  # the title of the game
main_menu(surface)  # call the function and start the game
