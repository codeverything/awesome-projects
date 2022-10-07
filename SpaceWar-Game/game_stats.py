#track game statistics 

class GameStats():
    def __init__(self,ai_settings):
        self.ai_settings=ai_settings
        self.reset_stats()
        self.game_active=False   #game starts as inactive status

    def reset_stats(self):
        #Initialize statistics that can change during the game.
        self.ships_left = self.ai_settings.ship_limit    
