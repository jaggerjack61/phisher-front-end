<template>
  <div class="card">
    <h5 class="card-header">Reports</h5>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-3">Start<input v-model="start" class="form-control" type="date"></div>
      <div class="col-1"></div>
      <div class="col-3">End<input v-model="stop" class="form-control" type="date"></div>
      <div class="col-4"><button @click="getReports()" class="btn btn-primary btn-sm mt-4">Generate</button></div>
    </div>
    <div class="table-responsive text-nowrap">
      <table class="table">
        <thead>
        <tr>
          <th>Type</th>
          <th>Number</th>
          <th>Percentage</th>

        </tr>
        </thead>
        <tbody class="table-border-bottom-0">
        <tr>
          <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>False Positives</strong></td>
          <td>{{data?.false_positives ?? 0}}</td>
          <td>
            {{((data?.false_positives/data?.total_visits)*100).toFixed(2) ?? 0}} %
          </td>
        </tr>
        <tr>
          <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>True Positives</strong></td>
          <td>{{data?.true_positives ?? 0}}</td>
          <td>
            {{((data?.true_positives/data?.total_visits)*100).toFixed(2) ?? 0}} %
          </td>
        </tr>
        <tr>
          <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>False Negatives</strong></td>
          <td>{{data?.false_negatives ?? 0}}</td>
          <td>
            {{((data?.false_negatives/data?.total_visits)*100).toFixed(2) ?? 0}} %
          </td>
        </tr>
        <tr>
          <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>True Negatives</strong></td>
          <td>{{data?.true_negatives ?? 0}}</td>
          <td>
            {{((data?.true_negatives/data?.total_visits)*100).toFixed(2) ?? 0}} %
          </td>
        </tr>
        <tr>
          <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>Total Sites Visited</strong></td>
          <td>{{data?.total_visits ?? 0}}</td>
          <td>
            100%
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>



  <div class="card mt-4">
    <h5 class="card-header">Activity</h5>
    <div class="table-responsive text-nowrap">
      <table class="table">
        <thead>
        <tr>
          <th>URL</th>
          <th>Source</th>
          <th>Time</th>
          <th>Status</th>

        </tr>
        </thead>
        <tbody class="table-border-bottom-0">


        <tr  v-for="day in data?.logs.reverse()">
          <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{{day.url.slice(0,30)}}<span v-if="day.url.length>30">...</span></strong></td>
          <td>{{day.source}}</td>
          <td>
            {{new Date(day.created_at).toLocaleString().slice(0,24)}}
          </td>
          <td>{{day.status}}</td>

        </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Table',
  props: {
    msg: String
  },
  data() {
    return {
      start:null,
      stop:null,
      data:null,
    }
  },
  mounted() {
  },
  methods: {
    getReports() {
      axios.post('http://localhost:8000/pie/',{start:this.start,stop:this.stop})
          .then(response => {
            this.data = response.data;
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    },
  }
}
</script>