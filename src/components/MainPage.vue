<template>
<div class='page-container'>
  <div class='overlay'></div>
  <div class='content-container'>
    <img class='logo' src='../assets/lol_png.png'>
    <div class='title'>LOL Champ Finder</div>
    <div class='register'>
      <label class='dropdown'> <!-- dropdown menu sourced from https://codepen.io/raneio/pen/NbbZEM -->
      <div class='dd-button' @click="selectedType = '' || selectedType">Type: {{ selectedType || 'Select Type' }}</div>
      <input type='checkbox' class='dd-input' id='type-dropdown'>
      <ul class='dd-menu'>
        <li @click="selectedType = 'Melee'">Melee</li>
        <li @click="selectedType = 'Ranged'">Ranged</li>
        <li class='divider'></li>
      </ul>
      </label>
      <label class='dropdown'>
      <div class='dd-button' @click="selectedClass = '' || selectedClass">Class: {{ selectedClass || 'Select Class' }}</div>
      <input type="checkbox" class="dd-input" id="class-dropdown">
      <ul class='dd-menu class-menu'>
        <li @click="selectedClass = 'Artillery'">Artillery</li>
        <li @click="selectedClass = 'Assassin'">Assassin</li>
        <li @click="selectedClass = 'Battlemage'">Battlemage</li>
        <li @click="selectedClass = 'Burst'">Burst</li>
        <li @click="selectedClass = 'Catcher'">Catcher</li>
        <li @click="selectedClass = 'Controller'">Controller</li>
        <li @click="selectedClass = 'Diver'">Diver</li>
        <li @click="selectedClass = 'Enchanter'">Enchanter</li>
        <li @click="selectedClass = 'Fighter'">Fighter</li>
        <li @click="selectedClass = 'Juggernaut'">Juggernaut</li>
        <li @click="selectedClass = 'Mage'">Mage</li>
        <li @click="selectedClass = 'Marksman'">Marksman</li>
        <li @click="selectedClass = 'Slayer'">Slayer</li>
        <li @click="selectedClass = 'Skirmisher'">Skirmisher</li>
        <li @click="selectedClass = 'Specialist'">Specialist</li>
        <li @click="selectedClass = 'Tank'">Tank</li>
        <li @click="selectedClass = 'Vanguard'">Vanguard</li>
        <li @click="selectedClass = 'Warden'">Warden</li>
        <li class='divider'></li>
      </ul>
      </label>
      <label class='dropdown'>
      <div class='dd-button' @click="selectedResource = '' || selectedResource">Resource: {{ selectedResource || 'Select Resource' }}</div>
      <input type='checkbox' class='dd-input' id='resource-dropdown'>
      <ul class='dd-menu'>
        <li @click="selectedResource = 'Mana'">Mana</li>
        <li @click="selectedResource = 'Energy'">Energy</li>
        <li @click="selectedResource = 'Other'">Other</li>
        <li class='divider'></li>
      </ul>
      </label>
    </div>
    <div class='search'>
      <button @click="searchChampion">Find Champ</button>
    </div>
  </div>
  <div class = 'text-container'>
    <div v-if="!searched" class='title'>ABOUT</div>
    <hr><br>
    <p v-if="!searched">LOL Champ Finder is an app that returns a random champ that satisfies the selected criteria.<br><br>
      Its purpose is to help new players pick a starter from the pool of 166 champs.<br><br>
      All data is scraped directly from the <a class="link-style" href='https://leagueoflegends.fandom.com/wiki/League_of_Legends_Wiki'>LOL wiki</a>.
    </p>
    <div v-if="selectedChampion">
      <div class = 'title'><span class="capital">Your Champ Is: {{ selectedChampion.name }}</span></div>
      <a :href="`https://leagueoflegends.fandom.com/wiki/${selectedChampion.name}/LoL`" target='_blank' class='link-style'>Champion Details</a>
    </div>
    <div>
      <p class = 'title' v-if="searched && !selectedChampion">No Champ Found!</p> <!-- triggers if "Find Champ" has been clicked + no champ in the database matches the criteria -->
    </div>
    <br><hr>
  </div>
</div>
</template>
  
<script>

import axios from 'axios';

export default {
  name: 'MainPage',
  data() {
    return {
      selectedType: '',
      selectedClass: '',
      selectedResource: '',
      selectedChampion: null,
    };
  },
  mounted() {
    document.title = "LOL Champ Finder";
  },
  methods: {
    searchChampion() {
      console.log('Request parameters:', { //as per the table's column titles
        Type: this.selectedType,
        roles: this.selectedClass,
        Resource: this.selectedResource,
    });
      axios.get('http://localhost:3001/api/champion', { //interact with backend
        params: {
          Type: this.selectedType,
          roles: this.selectedClass,
          Resource: this.selectedResource,
        },
      })
      .then(response => {
        const champions = response.data;
        const randomChamp = champions[Math.floor(Math.random() * champions.length)];
        this.selectedChampion = randomChamp;
        console.log ('Your Champ Is: ', randomChamp.name)
      })
      .catch(error => {
        console.error('Error:', error);
        this.selectedChampion = null; //set selectedChampion to null for redundancy
        this.searched = true;
      });
    },
  },
};
</script>

<style>

@import '@/assets/Dropdown.css';

body {
  margin: 0;
}

.page-container {
  position: relative;
  background-image: url('@/assets/drx_vue.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
}

.content-container, .text-container {
  position: relative;
  z-index: 1;
  flex-direction: column;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin:auto;
  justify-content: flex-start;
}

.text-container {
  color: white;
  margin: auto;
  font-size: 150%;
  max-width: 35vw;
}

.logo {
  width: 100px;
}

.title {
  color: white;
  padding: 30px;
  font-size: 200%;
  font-weight: bold;
}

.search button {
  width: 250px;
  height: 50px;
  border: 1px solid #b39556;
  background: #b39556;
  position: relative;
  z-index: 2;
  font-weight: bold;
  margin-top: 0px;
  border-radius: 4px;
}

.search button:hover {
  background-color: #7d693c;
}

.link-style {
  color: #7d693c;
  text-decoration: underline;
  font-weight: bold;
}

.capital {
  font-size: 80%;
  text-transform: capitalize;
}
</style>
