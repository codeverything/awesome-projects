import pygame
class Ship():
    def __init__(self,ai_settings,screen):
        self.screen=screen
        self.ai_settings=ai_settings
        #load ship image and set position 
        self.image = pygame.image.load('images/ship6.bmp')
        self.rect = self.image.get_rect()  #rect of the ship
        self.screen_rect = screen.get_rect()  #rect of screen
        #put every new ship at bottom center of screen
        self.rect.centerx=self.screen_rect.centerx
        self.rect.bottom=self.screen_rect.bottom
        # Store a decimal value for the ship's center(our speed_factor is float).
        self.center = float(self.rect.centerx)
        #flag movement of ship
        self.moving_right=False
        self.moving_left=False
        
        
    #draw ship at current position
    def blitme(self):
        self.screen.blit(self.image,self.rect)

    #update position of ship according to key press and flags
    def update(self):
        if self.moving_right and (self.rect.right<self.screen_rect.right):
            self.center+=self.ai_settings.ship_speed_factor
        if self.moving_left and self.rect.left>0:
            self.center-=self.ai_settings.ship_speed_factor
        # Update rect object from self.center.
        self.rect.centerx = self.center        
    
    #position new ship
    def center_ship(self):
        self.center=self.screen_rect.centerx
