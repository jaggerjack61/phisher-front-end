<template>
  <nav
      class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
  >
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
      <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
        <i class="bx bx-menu bx-sm"></i>
      </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      <!-- Search -->
      <div class="navbar-nav align-items-center">
        <div class="nav-item d-flex align-items-center">
          <i class="bx bx-search fs-4 lh-0"></i>
          <input
              v-model = "url"
              type="text"
              class="form-control border-0 shadow-none"
              placeholder="Search..."
              aria-label="Search..."
          />
        </div>
      </div>
      <!-- /Search -->

      <ul class="navbar-nav flex-row align-items-center ms-auto">
        <!-- Place this tag where you want the button to render. -->
        <li class="nav-item lh-1 me-3">
         <small>Check SSL</small> <input type="checkbox" class="" v-model="check_ssl" />
        </li>
        <li class="nav-item lh-1 me-3" v-if="status === 'check' || status === 'phishing' || status === 'legitimate' " @click="checkUrl()">
          <a class="btn btn-outline-info">Check</a>
        </li>

        <li class="nav-item lh-1 me-3" v-if="status === 'loading'">
          <a class="btn btn-outline-info">Loading...</a>
        </li>

        <li class="nav-item lh-1 me-3" v-if="status === 'phishing'">
          <a class="btn btn-danger">Phishing</a>
        </li>

        <li class="nav-item lh-1 me-3" v-if="status === 'legitimate'">
          <a class="btn btn-success">Legitimate</a>
        </li>



      </ul>

    </div>
  </nav>

</template>

<script>
import axios from "axios";

export default {
  name: 'SearchBar',
  props: {
  },
  data() {
    return {
      url:'',
      loading:false,
      status:'check',
      check_ssl:false,
    }
  },
  mounted() {

  },
  methods:{
    async checkUrl() {
      this.status ='loading';
      await axios.post("http://localhost:8000/check/",{
        url:this.url,
        source:'webapp',
        check_ssl:this.check_ssl,
      })
          .then(response => {
            this.status = response.data.status;
            console.log(response.data)
          })
          .catch(error => {
            this.status = 'check';
          })

    }
  }
}
</script>