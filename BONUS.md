## 1. input validation

Each time when admin create or edit quiz, we check whether the input data
is valid, incluing URL, validation of single/multiple choice

## 2. random name generator

To improve player experience, we design an random name generator, which allow user to get a random name

## 3. avatar

For each player, we assign them an avatar once they join a session, we also display each of them (name and avatar) at the admin screen so that admin can immediately know how many players joining this session. We use a simple hash function to assign avatar according their name
