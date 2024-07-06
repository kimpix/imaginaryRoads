<script lang="ts" setup>
import HomeIcon from "../../Icons/Sidebar/HomeIcon.vue";
import ModulesIcon from "../../Icons/Sidebar/ModulesIcon.vue";
import FavoritesIcon from "../../Icons/Sidebar/FavoritesIcon.vue";
import NotificationsIcon from "../../Icons/Sidebar/NotificationsIcon.vue";
import TeamIcon from "../../Icons/Sidebar/TeamIcon.vue";
import 'tw-elements';
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
<!-- mobileNav w-full -->

  <nav role="navigation" class="sticky inset-0 w-6/7 ml-7 mr-7 bottom-3 rounded-2xl z-10 flex flex-wrap items-center justify-between py-4 bg-white text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
  <div class="container-fluid w-full flex flex-wrap items-center justify-between">
  <div class="flex-grow items-center" id="navbarSupportedContent">
  <!-- Left links -->
  <ul class="navbar-nav flex flex-row justify-center pl-0 list-style-none mr-auto">
    <li class="nav-item p-2">
      <span class="block w-12">
          <HomeIcon class="rounded-lg w-12 bg-secondary p-3 fill-primary"></HomeIcon>
      </span>
    </li>
    <li class="nav-item p-2">
      <span class="block w-12">
        <ModulesIcon class="rounded-lg w-12 p-3 bg-white fill-gray-light"></ModulesIcon>
      </span>
    </li>
    <li class="nav-item p-2">
      <span class="block w-12">
        <FavoritesIcon class="rounded-lg w-12 p-3 bg-white fill-gray-light"> </FavoritesIcon>
      </span>
    </li>
    <li class="nav-item p-2">
      <span class="block w-12">
        <TeamIcon class="rounded-lg w-12 p-3 bg-white fill-gray-light"> </TeamIcon>
      </span>
    </li>
    <li class="nav-item p-2">
      <span class="block w-12">
        <NotificationsIcon class="rounded-lg w-12 p-3 bg-white fill-gray-light"> </NotificationsIcon>
      </span>
    </li>
  </ul>
  <!-- Left links -->
  </div>
  <!-- Collapsible wrapper -->
  </div>
    </nav>
</template>
