# UI

## 1. Icon

We attach icons with each button as much as possible so that it make more sense for user,
including admin and player to access our application

## 2. Avatar

We use a hash function to assign an avatar for each player, this avatar will be displayed on
admin window (i.e when they join into the game lobby) and player result window (i.e once game is
finished and they will be redirected to an result screen with different url)

## 3. Media alt

Each media including video and image contains an alt arritbute

# UX

## 1. Navigation

We build a menu bar at the top of admin homepage, which allow admin to get to whatever they want

## 2. Autonavigate

Besides what is required on spec,
We implement auto navigate to specific page when user finish certain operations. For example, after
admin edit question or quiz, they will be redirected back to the last page instead of clicking the return
button

## 3. Autoclose

Similarly with what we mention above, when admin create game successfully, the popup will be automatically closed

## 4. Random player name

At the screent where allow user to join game, we set up a button for user, which allow them to get a random
player name for joining game

## 5. Message popup

Besides what is mentioned in spec. Whenever is possible, there will be a popup window ( error or sucess ) at the top of screen,
indicating whether admin has done something wrong or successfully

## 6. Keyboard event

In terms of user experience, we add onkeypress attribute for our component. Therefore user can enter lobby or admin homepage without clicking button on screen
