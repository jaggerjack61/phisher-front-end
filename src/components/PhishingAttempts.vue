<template>
  <div class="col-lg-6 col-md-12 col-6 mb-4">
    <div class="card">
      <div class="card-body">
        <div class="card-title d-flex align-items-start justify-content-between">


        </div>
        <span><small>Phishing Attempts Today</small></span>
        <h3 class="card-title text-nowrap mb-1">{{attempts}}</h3>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'PhishingAttempts',
  props: {

  },
  data() {
    return {
      attempts:0,
    };
  },
  mounted() {
    this.getAttempts();
  },
  methods:{
    getAttempts() {
      axios.get("http://localhost:8000/pie")
          .then(response => {
            // assign this.attempts here
            this.attempts = response.data.phishing_attempts;
            console.log(response.data);
          })
          .catch(error => console.log(error));
    },
  }
}
</script>