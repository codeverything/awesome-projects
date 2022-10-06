#adds functionality to game

import sys
import pygame
from bullet import Bullet
from aliens import Alien
from time import sleep

#respond and check for input from hardware
def check_keydown_events(event,ai_settings,screen,ship,bullets):
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True 
    elif event.key == pygame.K_SPACE:
        fire_bullet(ai_settings, screen, ship, bullets)    

def check_keyup_events(event,ship):    
    if event.key == pygame.K_RIGHT:
        ship.moving_right = False
    elif event.key == pygame.K_LEFT:
        ship.moving_left = False    

def check_events(ai_settings,screen,stats,play_button,ship,aliens,bullets):
    for event in pygame.event.get():
        if event.type == pygame.QUIT:   #if user quits
            sys.exit()
        elif event.type == pygame.KEYDOWN:   #if a keypress is detected
            check_keydown_events(event,ai_settings,screen,ship,bullets)
        elif event.type == pygame.KEYUP:   #if a key release is detected
            check_keyup_events(event,ship) 
        elif event.type == pygame.MOUSEBUTTONDOWN:   #for playbutton functions
            mouse_x,mouse_y=pygame.mouse.get_pos()
            check_play_button(ai_settings, screen, stats, play_button, ship, aliens, bullets, mouse_x, mouse_y)                

def check_play_button(ai_settings, screen, stats, play_button, ship, aliens, bullets, mouse_x, mouse_y):
    #Start a new game when the player clicks Play.
    button_clicked=play_button.rect.collidepoint(mouse_x, mouse_y)
    if button_clicked and not stats.game_active:
        pygame.mouse.set_visible(False)# Hide the mouse cursor.
        stats.reset_stats()
        ai_settings.initialize_dynamic_settings()
        stats.game_active = True
        #reset aliens and bullets
        aliens.empty()
        bullets.empty()
        #create new fleet and center ship
        create_fleet(ai_settings, screen, ship,aliens)
        ship.center_ship()


#update screen images and flip to new screen
def update_screen(ai_settings,screen,stats,ship,aliens,bullets,play_button):
    screen.fill(ai_settings.bg_color)
    ship.blitme()
    aliens.draw(screen)
        
    # Redraw all bullets behind ship and aliens.
    for bullet in bullets.sprites():
        bullet.draw_bullet()

    if not stats.game_active:
        play_button.draw_button()
    
    #update screen
    pygame.display.flip() 



#create a new bullet and add it to the group when space is pressed
def fire_bullet(ai_settings, screen, ship, bullets):
    if len(bullets)<ai_settings.bullets_allowed:
        new_bullet=Bullet(ai_settings,screen,ship)
        bullets.add(new_bullet)

#delete bullets which go out of screen so that memory is freed
def update_bullets(ai_settings,screen,ship,aliens,bullets):
    bullets.update()
    for bullet in bullets.copy():
        if bullet.rect.bottom<=0:
            bullets.remove(bullet)
    check_bullet_alien_collision(ai_settings,screen,ship,aliens,bullets)
    
def check_bullet_alien_collision(ai_settings,screen,ship,aliens,bullets):
    # Check for any bullets that have hit aliens.
    #If so, get rid of the bullet and the alien.
    collisions = pygame.sprite.groupcollide(bullets, aliens, True, True)
    if len(aliens) == 0:
        # Destroy existing bullets and create new fleet.
        #increase game speed
        ai_settings.speed_up()
        bullets.empty()
        create_fleet(ai_settings, screen, ship, aliens)    


def get_numof_aliens_x(ai_settings,alien_width):
    avlbl_space_x=ai_settings.screen_width-2*alien_width   #margin
    num_aliens_x= int(avlbl_space_x/(2*alien_width)) 
    return num_aliens_x


def get_numof_rows(ai_settings,ship_height,alien_height):
    avlbl_space_y= (ai_settings.screen_height-ship_height-(3*alien_height))
    num_rows=int(avlbl_space_y/(2*alien_height))
    return num_rows
    
def create_alien(ai_settings, screen, aliens, al_no,num_rows):
    alien=Alien(ai_settings,screen)
    alien_width=alien.rect.width
    alien.x= alien_width+ (2*alien_width*al_no)
    alien.rect.x= alien.x
    alien.rect.y = alien.rect.height + (2 * alien.rect.height * num_rows)
    aliens.add(alien)   

# Create an alien and find the number of aliens in a row.
# Spacing between each alien is equal to one alien width.
def create_fleet(ai_settings,screen,ship,aliens):
    alien=Alien(ai_settings,screen)
    num_aliens_x = get_numof_aliens_x(ai_settings, alien.rect.width)
    num_rows= get_numof_rows(ai_settings,ship.rect.height,alien.rect.height)
    for row_no in range(num_rows):
        for al_no in range(num_aliens_x):
            create_alien(ai_settings,screen,aliens,al_no,row_no)        


#check if fleet is at edge and update positions
def update_aliens(ai_settings,stats,screen,ship,aliens,bullets):
    check_fleet_edge(ai_settings,aliens)
    aliens.update()
    #look for alien to ship collisions
    if pygame.sprite.spritecollideany(ship,aliens):
        ship_hit(ai_settings, stats, screen, ship, aliens, bullets)


#drop the entire fleet and change direction 
def change_fleet_direction(ai_settings,aliens):
    for alien in aliens.sprites():
        alien.rect.y+=ai_settings.fleet_drop_speed
    ai_settings.fleet_direction*=-1    


#check if the fleet is at edge of screen and change direction 
def check_fleet_edge(ai_settings,aliens):
        for alien in aliens.sprites():
            if alien.check_edge():
                change_fleet_direction(ai_settings,aliens)
                break

#respond to ship hit by alien
def ship_hit(ai_settings, stats, screen, ship, aliens, bullets):
    if stats.ships_left>0:
        stats.ships_left-=1
        aliens.empty()
        bullets.empty()
        create_fleet(ai_settings,screen,ship,aliens)   #create new alien fleet
        ship.center_ship()  #put new ship in position
        sleep(1) #pause before game restarts
    else:
        stats.game_active= False
        pygame.mouse.set_visible(True) #if game not active mouse cursor visible

