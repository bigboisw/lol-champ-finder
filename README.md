# LOL Champ Finder

LOL Champ Finder is an independently created app that returns a random champ that satisfies the selected criteria. Its purpose is to help new League of Legends players pick a starter they want from the overwhelmingly large pool of 166 champs.

All data is scraped directly from the LOL wiki. The source to the uncleaned CSV file can be found [here](https://www.kaggle.com/datasets/liamsmitsdorff/league-of-legends-champion-information?resource=download).

To challenge myself, I decided to add a backend aspect to what was originally going to be a purely frontend project. First, I hosted a local database, wrote scripts to clean the data in the CSV file, and imported the CSV into a table via MySQL Workbench. Then, I created a simple and clean frontend using the Vue framework (HTML, JS, CSS) consisting of a brief website description and dropdown menus that allowed users to choose values corresponding to the column values in the table. I set up a Node.js server that took that selected information from the frontend (via Vue's built-in Axios library) and incorporated it into a SQL query that returned the names of all champs fitting the aforementioned criteria. Finally, I returned the response to the frontend and displayed it by showing the champ's name as well as links to its page on the official wiki.

A video demonstration of the page can be found [here](https://youtu.be/qNdl4FsTGjs).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Node.js server
```
node server.js
```
