import os
import random
from collections import namedtuple
from enum import Enum
from pprint import pprint
from typing import List

import pygame
from pygame import freetype
from pygame.constants import QUIT, KEYDOWN, K_ESCAPE, MOUSEBUTTONUP
from pygame.rect import Rect

SCREENRECT = Rect(0, 0, 1000, 1000)
PANE_WIDTH = 6
PANE_HEIGHT = 6
CARD_SIZE = 100

main_dir = os.path.split(os.path.abspath(__file__))[0]

# chars = ["接", "搬", "新", "旧", "重",
#          "轻", "换", "最", "洗", "练",
#          "过", "节", "楼", "巧", "让",
#          "票", "绿", "租"]
chars = ["猫", "牛", "狗", "马", "羊",
         "黄", "绿", "蓝", "黑", "白",
         "一", "二", "三", "四", "五",
         "日", "月", "年"]

Coord = namedtuple("Coord", "x y")


class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0


shuffled_chars = list(chars * 2)
# random.seed(42)
random.shuffle(shuffled_chars)

card_chars = [[shuffled_chars[i + j * PANE_HEIGHT]
               for i in range(PANE_WIDTH)]
              for j in range(PANE_HEIGHT)]

pprint(card_chars)


class CardState(Enum):
    SHOWN = 1
    HIDDEN = 2
    REMOVED = 3


colors = {
    "grey_light": pygame.Color(200, 200, 200),
    "grey_dark": pygame.Color(100, 100, 100),
    "green": pygame.Color(50, 255, 63),
    "red": pygame.Color(220, 30, 30),
    "blue": pygame.Color(50, 75, 245),
    "background": pygame.Color(200, 200, 200),
}


def load_image(file):
    "loads an image, prepares it for play"
    file = os.path.join(main_dir, 'data', file)
    try:
        surface = pygame.image.load(file)
    except pygame.error:
        raise SystemExit('Could not load image "%s" %s' % (file, pygame.get_error()))
    return surface


class Back(pygame.sprite.Sprite):
    card_back_image = load_image('card_back_square.jpg')
    card_back_image = pygame.transform.scale(card_back_image, (CARD_SIZE, CARD_SIZE))

    def __init__(self, x, y):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = self.card_back_image
        self.rect = Rect(x, y, CARD_SIZE, CARD_SIZE)


def drawCard(font, screen, x, y, state: CardState):
    if not state == CardState.HIDDEN:
        rect = Rect(CARD_SIZE * x, CARD_SIZE * y, CARD_SIZE, CARD_SIZE)
        screen.fill(colors["background"], rect=rect)

    if state == CardState.SHOWN:
        font.render_to(screen, (CARD_SIZE * x, CARD_SIZE * y), card_chars[y][x], colors["grey_dark"],
                       size=CARD_SIZE, style=freetype.STYLE_NORMAL)


def update(font, screen, cards_state: List[List[CardState]]):
    for y in range(PANE_HEIGHT):
        for x in range(PANE_WIDTH):
            drawCard(font, screen, x, y, cards_state[x][y])


def _update_cards_and_score(all, card_state, font, screen, players, active_player):
    screen.fill(colors["background"])
    dirty = all.draw(screen)
    pygame.display.update(dirty)
    update(font, screen, card_state)

    for i, player in enumerate(players):
        color = colors["red"] if player == active_player else colors["grey_dark"]
        font.render_to(screen, (int(CARD_SIZE * (PANE_WIDTH + 0.5)), int(CARD_SIZE / 2) * (i + 1)),
                       player.name + ": " + str(player.score), color, size=int(CARD_SIZE / 2),
                       style=freetype.STYLE_NORMAL)

    pygame.display.flip()


def main():
    winstyle = 0  # | pygame.FULLSCREEN
    players = [Player("Linda"),
               Player("Tim"),
               ]

    active_player = players[0]
    current_dir = os.path.dirname(os.path.abspath(__file__))
    screen = pygame.display.set_mode(SCREENRECT.size, winstyle, 32)

    card_state = [[CardState.HIDDEN for i in range(PANE_HEIGHT)] for j in range(PANE_WIDTH)]

    font = freetype.Font(os.path.join(current_dir, "fonts", "kaiti.ttf"))
    all = pygame.sprite.RenderUpdates()
    Back.containers = all

    card_backs = [[Back(j * CARD_SIZE, i * CARD_SIZE) for i in range(PANE_HEIGHT)]
                  for j in range(PANE_WIDTH)]

    shown_cards = []

    # update all the sprites
    all.update()
    _update_cards_and_score(all, card_state, font, screen, players, active_player)
    active_player_index = 0
    while True:

        for event in pygame.event.get():
            if event.type == QUIT or \
                    (event.type == KEYDOWN and event.key == K_ESCAPE):
                return
            if event.type == MOUSEBUTTONUP:
                pos = event.pos
                x = int(pos[0] / CARD_SIZE)
                y = int(pos[1] / CARD_SIZE)

                if x >= PANE_WIDTH or y >= PANE_HEIGHT:
                    continue

                state = card_state[x][y]
                if state == CardState.HIDDEN:

                    card_state[x][y] = CardState.SHOWN
                    if len(shown_cards) == 2:
                        hide_card_coord = shown_cards.pop(0)
                        if card_state[hide_card_coord[0]][hide_card_coord[1]] != CardState.REMOVED:
                            card_state[hide_card_coord[0]][hide_card_coord[1]] = CardState.HIDDEN
                    shown_cards.append((x, y))
                    if len(shown_cards) == 2:
                        clicked = Coord(x, y)
                        shown = Coord(shown_cards[0][0], shown_cards[0][1])
                        if card_chars[clicked.y][clicked.x] == card_chars[shown.y][shown.x]:
                            active_player.score += 1

                            card_state[clicked.x][clicked.y] = CardState.REMOVED
                            card_state[shown.x][shown.y] = CardState.REMOVED
                    active_player_index += 1
                    active_player = players[active_player_index % len(players)]
                # elif state == CardState.SHOWN:
                #     card_state[x][y] = CardState.HIDDEN
                #     if (x, y) in shown_cards:
                #         shown_cards.remove((x, y))

                _update_cards_and_score(all, card_state, font, screen, players, active_player)



if __name__ == '__main__':
    pygame.init()
    main()
    pygame.quit()
