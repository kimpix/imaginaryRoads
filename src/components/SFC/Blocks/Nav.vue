<script lang="ts" setup>
import HomeIcon from "../../Icons/Sidebar/HomeIcon.vue";
import ModulesIcon from "../../Icons/Sidebar/ModulesIcon.vue";
import FavoritesIcon from "../../Icons/Sidebar/FavoritesIcon.vue";
import NotificationsIcon from "../../Icons/Sidebar/NotificationsIcon.vue";
import TeamIcon from "../../Icons/Sidebar/TeamIcon.vue";

import 'tw-elements';
</script>
<script lang="ts">
//EXPORT COMPONENT Nav
// for classes switch e.g. :class="[isMobile ? navMobileClass : navDesktopClass]" return nacVClass etc..
export default {
  data() {
    return {
      }
     }
    }
</script>
<template>
      <nav role="navigation" class="shadow-nav block bg-white rounded-lg">
            <ul class="navList">
              <li class="text-gray flex flex-row gap-x-4 items-center">
                <span class="block w-12">
                  <HomeIcon class="rounded-lg w-12 bg-secondary p-3 fill-primary"></HomeIcon>
                </span>
                <span class="text-primary">Genres</span>
              </li>
              <li class="text-gray flex flex-row gap-x-4 items-center">
                <span class="block w-12">
                  <ModulesIcon class="rounded-lg w-12 p-3 bg-white fill-gray-lighter"></ModulesIcon>
                </span>
                <span>Époques</span>
              </li>
              <li class="text-gray flex flex-row gap-x-4 items-center">
                <span class="block w-12">
                  <FavoritesIcon class="rounded-lg w-12 p-3 bg-white fill-gray-lighter"> </FavoritesIcon>
                </span>
                <span>Collections</span>
              </li>
              <li class="text-gray flex flex-row gap-x-4 items-center">
                <span class="block w-12">
                  <TeamIcon class="rounded-lg w-12 p-3 bg-white fill-gray-lighter"> </TeamIcon>
                </span>
                <span>Team</span>
              </li>
              <li class="text-gray flex flex-row gap-x-4 items-center">
                <span class="block w-12">
                  <NotificationsIcon class="rounded-lg w-12 p-3 bg-white fill-gray-lighter"> </NotificationsIcon>
                </span>
                <span>Notifications</span>
              </li>
            </ul>
      </nav>
</template>



<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}

.navList {
  padding: 20px;
}
.navList > li {
 font-size: 22px;
 font-style: normal;
 font-weight:100;
 padding-top: 18px;
 padding-bottom: 18px;
 text-align: center;
 cursor: pointer;
}
.horizontal-list ul li {
float:left;
font-size: 1rem;
padding-left: 1rem
}

</style>
