<script lang="ts">
//import json from '../../JSON/genre.json'
import SortBox from '../Blocks/SortBox.vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

var i = 0;
export default {
  data() {
    return {
      isMobile: window.screen.availWidth < 550,
      mainDesktopClass : "basis-2/3 flex flex-col gap-y-10",
      mainMobileClass :"flex flex-col gap-y-7 p-7",
      genreTab: ["Tout genre", "Roman", "Langues/Linguistique", "Biographie", "Roman graphique", "BD", "Historique", "Fantastique", "Science-Fiction", "Nouvelles", "Dictionnaire", "Conte", "Enfant", "Heroïc-Fantaisy", "Epouvante", "Policier", "Sciences-Humaines", "Sciences Sociale", "Religion", "Esotérie", "Psychologie", "Informatique", "Droit", "Livre d'Art", "Beaux-livres", "Architecture", "Livres lus", "Poésie", "Philosophie", "Cuisine", "Humour", "Erotique", "Coffret/Anthologie", "Sciences"]
      ,epoqueTab: ["Antiquite","Moyen-Age","Renaissance"]
      , menuIndex: ["Genre", "Epoque", "Collection"], genreIndex: 0, test: []
    }
  },
  methods: {
   increment(i) {
      this['genreIndex']++;

      if (i == this['genreTab'].length - 1) {
        this['genreIndex'] = 0;
      }
    },
  },
  components: {
    SortBox
  }
}
</script>

<template>
      <main :class="[isMobile ? mainMobileClass : mainDesktopClass]">
        <div class="mainProject bg-white shadow-card rounded-2xl">
            <!-- Icone Pere Noel et Titre -->
            <SortBox :genre="genreTab[genreIndex]" @on-slide="increment(genreIndex)" icon="../../../assets/images/santa.png" description="Pour tout les goûts"/>
            <!-- Fin icone Pere Noel et Titre -->
          <footer style="border-right:none; border-left:none" class="border-top border-2 border-secondary">
              <div class="flex flex-row gap-x-10 p-10">
                 <button class="shadow-button font-light rounded-2xl md:rounded-full text-white p-3 bg-primary">Trier</button>
                 <button class="secondary-button font-light rounded-2xl md:rounded-full text-gray p-3 bg-white">Aléatoire</button>
              </div>
          </footer>
        </div>
        <div class="taskList bg-white shadow-card rounded-2xl p-10">
          <header class="flex flex-row">
            <h2 class="basis-6/12 align-middle font-light text-2xl">Liste des livres</h2>
            <div class="basis-6/12">
              <button type="button" class="shadow-button md:w-3/5 w-full font-light float-right rounded-2xl md-rounded-full text-white md:p-3 p-4 bg-primary" data-bs-toggle="modal" data-bs-target="#taskModal">+ Ajouter</button>
            </div>
          </header>
          <section class="h-56 overflow-auto tabRounded border border-gray-light rounded-xl">
            <table class="table-auto relative w-full">
                <thead class="sticky top-0">
                  <tr class="bg-gray-lighter">
                    <th class="p-2"><input type="checkbox"/></th>
                    <th class="float-left p-4">Nom</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="book in test[0]">
                    <td class="p-2 text-center"><input type="checkbox"/></td>
                    <td class="p-4">{{ book.name }}</td>
                  </tr>
                </tbody>
            </table>
          </section>
        </div>
      </main>
</template>
<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}

.mainProject > header > h2 {
  font-size: 18px;
  font-weight: 100;
}

.secondary-button {
  border: 1px solid #DAE1ED;
}
.mainProject img {
  width: 35px;
}
.taskList > header {
  margin-bottom: 20px;
}
</style>
