<template>
  <div class="col-md-6 col-lg-4 order-1 mb-4">
    <div class="card h-100">
      <div class="card-header">
        <ul class="nav nav-pills" role="tablist">
          <li class="nav-item">
            <button
                type="button"
                class="btn btn-outline-info btn-sm"
                role="tab"
                data-bs-toggle="tab"
                data-bs-target="#navs-tabs-line-card-income"
                aria-controls="navs-tabs-line-card-income"
                aria-selected="true"
            >
              Last 24 hours
            </button>
          </li>

        </ul>
      </div>
      <div class="card-body px-0">
        <div class="tab-content p-0">
          <div class="tab-pane fade show active" id="navs-tabs-line-card-income" role="tabpanel">
            <div class="d-flex p-4 pt-3">


            </div>
            <canvas id="myChart" width="100%" height="325"></canvas>
            <div class="d-flex justify-content-center pt-4 gap-2">
              <div class="flex-shrink-0">
                <div id="expensesOfWeek"></div>
              </div>
              <div>
                <p class="mb-n1 mt-1">Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Graph',
  props: {
  },
  data() {
    return {
      coordinates:null,
    }
  },
  mounted() {
    this.getCoordinates();

  },
  methods:{
    async getCoordinates() {
      await axios.get("http://localhost:8000/pie")
          .then(response => {
            this.coordinates = response.data.coordinates.reverse();
            console.log(this.coordinates);
            this.plotGraph();
          })
          .catch(error => {
            console.log(error);
          });

    },
    plotGraph() {
      // Get the context of the canvas element
      let ctx = document.getElementById('myChart').getContext('2d');

      // Get the current date and time
      let now = new Date();

      // Create an empty array for the data values
      let info = [];

      // Create an empty array for the labels
      let labels = [];

      // Loop through the coordinates array from the django backend
      for(let i = 0; i < this.coordinates.length; i++) {
        // Get the data count for each coordinate
        info[i] = this.coordinates[i].data_count;

        // Get the start and end times for each coordinate as Date objects
        let start = new Date(this.coordinates[i].start);
        let end = new Date(this.coordinates[i].end);

        // Format the start and end times as human readable strings with only the time component
        let startLabel = start.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'});
        let endLabel = end.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'});

        // Concatenate the start and end labels with a dash
        let label = startLabel + ' - ' + endLabel;

        // Push the label to the labels array
        labels.push(label);
      }

      // Log the labels array to the console
      console.log(labels);

      // Define the data object for the graph
      let data = {
        labels: labels, // use the labels array for the x-axis
        datasets: [{
          label: 'Recent Activity', // label for the y-axis
          data: info, // use the info array for the y-axis
          fill: false, // do not fill the area under the curve
          borderColor: 'lightblue', // set the color of the line to blue
          tension: 0.25 // set the smoothness of the curve
        }]
      };

      // Define the options object for the graph
      let options = {
        scales: {
          y: {
            beginAtZero: true, // start the y-axis from zero
            title: {
              display: true, // show the label
              text: 'Sites visited' // set the label text
            }
          }
        }
      };

      // Create a new chart object with the data and options
      let myChart = new Chart(ctx, {
        type: 'line', // set the type of the graph to line
        data: data, // use the data object
        options: options // use the options object
      });
    }


  }
}
</script>