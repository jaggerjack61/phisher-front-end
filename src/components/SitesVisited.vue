<template>
  <div class="col-lg-6 col-md-12 col-6 mb-4">
    <div class="card">
      <div class="card-body">
        <div class="card-title d-flex align-items-start justify-content-between">

        </div>
        <span><small>Websites Visited Today</small></span>
        <h3 class="card-title mb-2">{{total}}</h3>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SitesVisited',
  props: {
  },
  data() {
    return {
      total:0,
    };
  },
  mounted() {
    this.getVisits();
  },
  methods:{
    getVisits() {
      axios.get("http://localhost:8000/pie")
          .then(response => {
            // assign this.attempts here
            this.total = response.data.total_visits;
            console.log(response.data);
          })
          .catch(error => console.log(error));
    },
  }
}
</script>