# The Outsider Game

A social deduction game where players try to identify who doesn't know the chosen topic.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install react-transition-group framer-motion
```

### 2. Project Structure

Make sure your project follows this structure:

```
/outsider-game/
├── public/
│   ├── index.html
│   ├── assets/
│   │   └── images/
│   │       ├── game.png  (add your image here)
│   │       ├── anime.png (add your image here)
│   │       ├── clothing.png (add your image here)
│   │       └── food.png (add your image here)
├── src/
│   ├── App.js
│   ├── index.js
│   ├── components/
│   │   ├── CreateGame.js
│   │   ├── Gameplay.js (note the lowercase 'p')
│   │   ├── JoinGame.js
│   │   ├── LandingPage.js
│   │   ├── Lobby.js
│   │   ├── OutsiderGuess.js
│   │   ├── PlayerSetup.js
│   │   ├── ResultsScreen.js
│   │   ├── RoleReveal.js
│   │   ├── TopicSelection.js
│   │   └── VotingScreen.js
│   ├── contexts/
│   │   └── GameContext.js
│   ├── data/
│   │   └── topics.js
│   └── styles/
│       └── App.css
└── package.json
```

### 3. Image Files

Place your topic images in the `public/assets/images/` directory:
- `game.png` - For video games topic
- `anime.png` - For anime topic
- `clothing.png` - For clothing topic
- `food.png` - For food topic

### 4. Adding Sound (Later)

When you're ready to add sound effects, install:

```bash
npm install howler
```

## Game Features

### Local Game Mode
- Play with friends passing a single device between players
- Choose from 4 topic categories: Video Games, Anime, Clothing, and Food
- One player is randomly chosen as "The Outsider" who doesn't know the topic
- Take turns asking questions to identify who's the outsider

### Online Game Mode
- Create a game and share a 6-character code with friends
- Join existing games using a game code
- Host controls the game and selects topics
- Players can see who's joined the lobby

## Topic Information

1. **Video Games** - Popular video games from classic consoles to modern releases. Includes titles like Minecraft, Fortnite, Call of Duty, The Legend of Zelda, and many more. Perfect for gamers of all ages. The category covers a wide range of genres from RPGs and shooters to sports games and puzzlers.

2. **Anime** - Popular anime series and movies from different eras and genres. Features beloved titles such as Naruto, One Piece, Attack on Titan, and Studio Ghibli films. This category spans from classic anime to the latest seasonal hits, covering action, romance, fantasy, sci-fi, and slice-of-life genres.

3. **Clothing** - Fashion brands, clothing styles, and iconic apparel from around the world. Includes major brands like Nike, Adidas, Gucci, and Louis Vuitton alongside everyday clothing items. This category tests players' knowledge of fashion trends, designer labels, and everyday wear that defines personal style.

4. **Food** - Cuisines, dishes, and famous foods from around the world. From Italian pasta and Japanese sushi to American burgers and Mexican tacos, this category celebrates the global diversity of culinary delights. Includes popular dishes, desserts, and iconic food items that everyone loves to eat.

## Online Implementation Notes

The current implementation simulates online functionality using local state. To make this fully functional online:

1. Create a backend server (Node.js/Express recommended)
2. Implement WebSockets for real-time communication (Socket.io recommended)
3. Store game state on the server
4. Handle room creation and joining with the game codes
5. Synchronize game state between all connected players

## Running the Application

```bash
npm start
```

The game will be available at http://localhost:3000