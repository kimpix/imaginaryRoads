<script lang="ts" setup>
import PremiumImage from "../../Images/PremiumImage.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      }
     }
    }
</script>

<template>
        <section class="memberUpgrade relative shadow-card bg-white p-7 overflow-hidden rounded-lg">
            <h3 class="mb-4 tracking-wide font-light text-2xl">Aide et Tutoriel</h3>
            <p class="mb-8 text-gray tracking-wide text-l font-light"></p>
            <span class="block w-32 absolute -bottom-4 -right-5">
               <PremiumImage class="w-32"></PremiumImage>
            </span>
            <button class="shadow-button font-light rounded-full text-white p-3 bg-primary">Mettre à jour</button>
        </section>
</template>
