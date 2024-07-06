<script lang="ts">
export default {
  name: "SortBox",
  props: {
    genre: String,
    description: String,
    icon: String,
    bookNumber: Number,
    onSlide: Function,
    i : Number
  }
};
</script>

<template>
  <div @click="$emit('on-slide', i)" class="flex flex-col p-10">
    <header>
      <div class="bg-santa float-left p-3 rounded-lg">
        <img :src="icon" />
      </div>
      <div class="float-left ml-3 p-3">
        <h2 class="font-light text-2xl">{{ genre }}</h2>
        <p class="text-gray font-light">{{ description }}</p>
      </div>
    </header>
    <section class="flex mt-4 gap-x-10 flex-row">
      <div>
        <h4 class="text-gray pl-2 basis-1/3 font-light">Nombre de Livres</h4>
        <p class="text-center pl-2">{{ bookNumber }}</p>
      </div>
      <!-- <div>
                <h4 class="text-gray basis-1/3 font-light">Membres</h4>
                <p></p>
            </div>
            <div>
                <h4 class="text-gray basis-1/3 font-light">Votes</h4>
                <p>
                    <span></span>
                    </p>
            </div> -->
    </section>
  </div>
</template>
