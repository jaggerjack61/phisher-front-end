<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SideBar/>
      <div class="layout-page">
        <SearchBar />
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import SideBar from "@/components/SideBar.vue";
import SearchBar from "@/components/SearchBar.vue";
</script>