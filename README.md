
# TL;DR
Trend Wars is a game where you as a player can choose which word was trendiest in the chosen topic, territory, category. It can be played solo or with friends. The user also able to submit it's own question ideas, and after approval it is playable.

## Play it now: <https://trendwars.herokuapp.com/>

## Table of Contents:
<table>
<tr>
  <td rowspan="6"><img src="/public/images/heads/1.png"></td>
  <td><a href=#wireframes>Wireframes</a></td>
  
</tr>
<tr>
  <td><a href=#design>Design</a></td>
</tr>
  <tr>
  <td><a href=#game-flow-chart>Game Flow Chart</a></td>
</tr>
  <tr>
  <td><a href=#multiplayer-game-flow-chart>Multiplayer Game Flow Chart</a></td>
</tr>
  <tr>
  <td><a href=#some-documentation>Some Documentation</a></td>
</tr>
  <tr>
  <td><a href=#technologies>Technologies</a></td>
</tr>
</table>


## Wireframes
The wireframes not represent the final product and not all pages have wireframes. After finishing the initial coding I switched out Bootstrap and started using my own design and did not make any new wireframes.
#### [See all the wireframes in PDF here](.github/initial-wireframes.pdf)

![Dashboard Wireframe](.github/dashboard.png "Dashboard wireframe")

---
## Design
I designed the whole app - no wonder I'm not a designer - and implemented it with pure CSS. Some pages do not have a design, since I just used the already established style to make it. 
#### [See all the designs in PDF here](.github/twdesign.pdf)

![Design](.github/design.jpg "Design")

---

## Game Flow Chart
The game directed by the game director. It decides what component to mount/unmount. Sub directors are the solo game and multigame which can direct most of their own part of the gameplay. 
![Game Flow Chart](.github/gameflowchart.png "Game Flow Chart")


## Multiplayer Game Flow Chart
Blue squares represent the main controller components (Game Director and MultiGame) who are responsible for the user's flow thru the game. Green ones are connections to the GraphQL server in the back. White-colored nodes represent what the user sees.
![Multiplayer Game Flow Chart](.github/multigameflowchart.png "Multiplayer Game Flow Chart")

## Some Documentation

### Special words
**Deck** - Represents the data that makes up a game's basis - name, description, keywords etc. - that anyone can submit in the Create Questions segment.

**GameRoom** - Represents the data that is "passed around" in multiplayer, contains everything that a multiplayer game needs

**Waiting Room** - The component where the player join to before starting the game

### File system

#### animations 
Contains 2 reusable animation component that can accept a child component which it animates. Created with framer-motion.

#### components
Contains mostly components that are used around the application. Some are styled-components - BBbutton - or whole screens - Loading, GamePlay.

**GameDirector.tsx** the most important component that controls the game flow of single and multiplayer games.

#### constants
Contains only the Category and Country list that needs to code/decode the data from the backend.

#### store
Contains the redux store. I started implementing it way too late, but for the messaging system and user login was one of the easiest solutions.
**appState** Have a message system in it, so can display information to the user where needed.
**user** Contains the user login/logout actions. In the end, the app does not use a user system, only have users to identify them as Admin. The component can be used in future development, registration/login working.

### pages
Contains the separate pages of the application.

**Admin** - There is an administration page that can be reached at /admin. Only be accessed by registered users who the owner promoted to Admin by direct DB input - currently no user handling feature. Admin can approve the submitted decks, edit or delete them. 

**CreateDeck** - The page where the users can submit new questions. Whatever is submitted will go to the database, uncreated. Once an Admin approves the deck, it will be made in the backend and will be available to play for anyone.

**CreateGame** - Contains the DeckSelector and the GameOptions. This is the entry point for making games and will forward the user either to SoloGame or MultiGame.

**Dashboard** - This is the main entry page for the application

**Login** - Currently only used for the admin part of the application. Users can register or login, places JWT to local store automatically. Good to use for further feature development.

**Multiplayer** - Controls the flow of the multiplayer games - see [Multi Flow Chart](#multiplayer-game-flow-chart). Additionally contains the HeadChoosingBox, HeadSender, and Flyinghead components which given the gameId independently subscribe to the server to send heads around. 

**Solo** Controls the Solo Game. Uses the same gameplay component as multiplayer but fewer features. 


## Technologies
- React Typescript for framework
- Apollo Client / GraphQL to connect the backend
- Moment to convert the dates
- Redux for messaging and user handling
- Framer-motion for some animations
- Styled-components
