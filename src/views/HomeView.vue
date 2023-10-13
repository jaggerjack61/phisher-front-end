<template>


  <div class="row">
    <WelcomeBar/>
    <div class="col-lg-4 col-md-4 order-1">
      <div class="row">
        <SitesVisited/>
        <PhishingAttempts/>
      </div>
    </div>
  </div>
  <div class="row">
    <PieChart/>
    <Graph/>
    <RecentHistory/>
  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import SideBar from "@/components/SideBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import WelcomeBar from "@/components/WelcomeBar.vue";
import SitesVisited from "@/components/SitesVisited.vue";
import PhishingAttempts from "@/components/PhishingAttempts.vue";
import PieChart from "@/components/PieChart.vue";
import Graph from "@/components/Graph.vue";
import RecentHistory from "@/components/RecentHistory.vue";
import store from "@/store";

export default {
  name: 'HomeView',
  components: {
    RecentHistory,
    Graph,
    PieChart,
    PhishingAttempts,
    SitesVisited,
    WelcomeBar,
    SearchBar,
    SideBar,
    HelloWorld
  },
  mounted() {
    store.commit("setPath","dashboard");
  }
}
</script>
