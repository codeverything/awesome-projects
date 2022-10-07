import pygame
from pygame.sprite import Sprite

class Bullet(Sprite):
    def __init__(self,ai_settings,screen,ship):
        super().__init__()  #this class is derived from sprite
        self.screen=screen
        #create a bullet at (0,0) and then correct position so that it appears to come from ship
        self.rect=pygame.Rect(0,0,ai_settings.bullet_width,ai_settings.bullet_height)
        self.rect.centerx=ship.rect.centerx
        self.rect.top=ship.rect.top 

        self.color=ai_settings.bullet_color
        self.speed_factor=ai_settings.bullet_speed_factor

        #store vertical position of bullet as decimal value
        self.y=float(self.rect.y)

    #update position of bullet
    def update(self):
        self.y-=self.speed_factor
        self.rect.y=self.y
    def draw_bullet(self):
        pygame.draw.rect(self.screen,self.color,self.rect)               