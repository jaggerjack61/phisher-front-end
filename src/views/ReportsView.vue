<template>
<Table />
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
import Table from "@/components/Table.vue";

export default {
  name: 'ReportsView',
  components: {
    Table

  },
  mounted() {
    store.commit("setPath","reports");
  }
}
</script>
