# UI

## Icon

We attach icons with each button as much as possible so that it make more sense for user,
including admin and player to access our application

## Avatar

We use a hash function to assign an avatar for each player, this avatar will be displayed on
admin window (i.e when they join into the game lobby) and player result window (i.e once game is
finished and they will be redirected to an result screen with different url)

# UX

## Navigation

We build a menu bar at the top of admin homepage, which allow admin to get to whatever they want

## Autonavigate

Besides what is required on spec,
We implement auto navigate to specific page when user finish certain operations. For example, after
admin edit question or quiz, they will be redirected back to the last page instead of clicking the return
button

## Autoclose

Similarly with what we mention above, when admin create game successfully, the popup will be automatically closed

## Random player name

At the screent where allow user to join game, we set up a button for user, which allow them to get a random
player name for joining game

## Message popup

Besides what is mentioned in spec. Whenever is possible, there will be a popup window ( error or sucess ) at the top of screen,
indicating whether admin has done something wrong or successfully
