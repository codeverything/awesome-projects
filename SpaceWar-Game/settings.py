class Settings():
    def __init__(self):
        #screen settings
        self.screen_width = 1200
        self.screen_height = 800
        self.bg_color = (0,0,0)
        
        #ship settings
        self.ship_limit=3
        
        #alien settings
        self.fleet_drop_speed=10

        # Bullet settings
        self.bullet_width = 3
        self.bullet_height = 15
        self.bullet_color = 135,206,235
        self.bullets_allowed=3

        # How quickly the game speeds up
        self.speedup_scale = 1.1
        self.initialize_dynamic_settings()

    def initialize_dynamic_settings(self):    
        self.ship_speed_factor=1.5
        self.alien_speed_factor=0.7
        self.fleet_direction=1   #1 for right and -1 for left
        self.bullet_speed_factor = 3

    def speed_up(self):
        self.alien_speed_factor *= self.speedup_scale
        self.ship_speed_factor *= self.speedup_scale
        self.bullet_speed_factor *= self.speedup_scale    
