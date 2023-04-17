## 1. Input validation

Each time when admin create or edit quiz, we check whether the input data
is valid, incluing URL, validation of single/multiple choice

## 2. Random name generator

To improve player experience, we design an random name generator, which allow user to get a random name 


At the screent where allow user to join game, we set up a button for user, which allow them to get a random player name for joining game

## 3. Avatar

For each player, we assign them an avatar once they join a session, we also display each of them ( name and avatar ) at the admin screen so that admin can immediately know how many players joining this session. We use a simple hash function to assign avatar according their name

## 4. Search bar

At history page where we can view all past results of a particular page, we add a search bar. It allows admin to search some of the sessions according to the session id they enter, which allows them to filter sessions when they want to view specific sessions

## 5. Delete quiz button

In assignment spec, we are only required to have one button to delete quiz. We instead add one button for each quiz, so that it must be better for admin to delete particular quiz.

## 6. Game info autofill

There is a button in the window of creating game, which allows user to import a json file which includes some metadata of a game, as a template. Then our appliation will autofill all fields for admin.

## 7. Lobby game

As mentioned in spec, the lobby should be pleasant and entertaining, we therefore design a little game for player to enjoy when the game is not started yet

## 8. Login improvement
We implement an remember me button at the login screen. When admin click it and login, next time when they login again, they don't need to enter email and password