<template>
  <div class="col-md-6 col-lg-4 order-2 mb-4">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between">
        <h5 class="card-title m-0 me-2">Recent</h5>

      </div>
      <div class="card-body">
        <ul class="p-0 m-0" v-for="log in logs">
          <li class="d-flex mb-4 pb-1">
            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
              <div class="me-2">
                <small class="text-muted d-block mb-1">{{new Date(log.created_at).toLocaleString().slice(11)}}</small>
                <h6 class="mb-0 truncate" style="width:225px">{{log.url}}</h6>
              </div>
              <div class="user-progress d-flex align-items-center gap-1">

                <h6 class="mb-0 bg-success rounded p-1" v-if="log.status==='legitimate'">{{log.status}}</h6>
                <h6 class="mb-0 bg-danger rounded p-1" v-if="log.status==='phishing'">{{log.status}}</h6>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {forEach} from "core-js/internals/array-iteration";

export default {
  name: 'RecentHistory',
  props: {
  },
  data(){
    return {
      logs:null,
    };

  },
  mounted() {
    console.log("hello");
    axios.get("http://localhost:8000/reports")
        .then((response) => {this.logs = response.data.logs.slice(-7).reverse()}
        )
        .catch((error) => console.log(error));

  },
  methods:{

  }
}
</script>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>