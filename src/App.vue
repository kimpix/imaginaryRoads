<script lang="ts" setup>
import 'tw-elements';
// import icons
import Calendar from "./components/Icons/Calendar.vue";

//import Blocks
import Main from "./components/SFC/Main/Main.vue";
import PremiumBlock from "./components/SFC/Blocks/PremiumBlock.vue";
import Nav from "./components/SFC/Blocks/Nav.vue";
import NavMobile from "./components/SFC/Blocks/NavMobile.vue";
import ModalBooks from "./components/SFC/Blocks/ModalBooks.vue";
</script>

<!--  -->
<template>
  <div :class="[isMobile ? mobileClass : desktopClass]">
    <!-- Main if it's mobile -->
    <Main v-if="isMobile"/>
    <!-- SideNavigation if it's Mobile -->
    <NavMobile v-if="isMobile" />

    <!-- if it's not mobile : Desktop Style -->
    <div v-if="!isMobile" class="container relative py-5 flex gap-x-10 flex-row font-extrabold" >
      <!-- if SideNav Desktop : 1/3 width-->
      <aside class="basis-1/3 flex flex-col gap-y-10 relative">
        <Nav />
        <PremiumBlock />
      </aside>
     <!-- if  Main Desktop 2/3 width -->
     <Main />
     <ModalBooks/>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}

thead, tr {
  border-bottom: 1px solid #DAE1ED;

}

tr:last-child {
  border:none;
}

</style>
<script lang="ts">
export default {
  data() {
    return {
      isMobile: window.screen.availWidth < 550,
      desktopClass : "flex px-32 py-10 inset-0 justify-center items-center bg-secondary",
      mobileClass :"flex flex-col relative bg-secondary"
      }}
}
</script>
