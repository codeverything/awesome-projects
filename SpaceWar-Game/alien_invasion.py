#main file

import sys
import pygame
import game_funcs as gf
from settings import Settings
from ship import Ship
from pygame.sprite import Group
from aliens import Alien
from game_stats import GameStats
from button import Button

def run_game():
    #initialize game and create a game object
    pygame.init()
    ai_settings=Settings()
    screen=pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("ALIEN INVASION")

    #display play button
    play_button=Button(ai_settings,screen,"PLAY")
    
    stats=GameStats(ai_settings)

    #make ship 
    ship=Ship(ai_settings,screen)

    #make a group to store bullets and aliens
    bullets=Group()
    aliens=Group()

    # Create the fleet of aliens.
    gf.create_fleet(ai_settings, screen, ship,aliens)

    #main loop for game
    while True:
        #Check for input from hardware and update position of ship accordingly
        gf.check_events(ai_settings,screen,stats,play_button,ship,aliens,bullets)
        if stats.game_active:
            ship.update()
            gf.update_bullets(ai_settings,screen,ship,aliens,bullets)
            gf.update_aliens(ai_settings,stats,screen,ship,aliens,bullets)

        #redraw screen during each pass with the loop and update images
        gf.update_screen(ai_settings,screen,stats,ship,aliens,bullets,play_button)

run_game()                
