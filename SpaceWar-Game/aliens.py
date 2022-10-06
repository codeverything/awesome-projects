import pygame
from pygame.sprite import Sprite

class Alien(Sprite):
    def __init__(self,ai_settings,screen):
        super(Alien,self).__init__()
        self.screen=screen
        self.ai_settings=ai_settings

        #load image and its rect
        self.image=pygame.image.load('images/alien.bmp')
        self.rect=self.image.get_rect()

        #ship starts from top left of screen
        self.rect.x=self.rect.width
        self.rect.y=self.rect.height

        #store the alien's exact position
        self.x=float(self.rect.x)

    def blitme(self):
        self.screen.blit(self.image, self.rect)
        
    #return true if alien is at screen edge
    def check_edge(self):
        screen_rect= self.screen.get_rect()
        if self.rect.right>=screen_rect.right:
            return True
        elif self.rect.left<=0:
            return True    

    def update(self):
        self.x+= (self.ai_settings.alien_speed_factor * self.ai_settings.fleet_direction)
        self.rect.x=self.x
