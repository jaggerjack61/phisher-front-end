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
            <canvas id="myChart1" width="100%" height="200"></canvas>
            <div class="d-flex justify-content-center pt-4 gap-2">
              <div class="flex-shrink-0">
                <div id="expensesOfWeek"></div>
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
  name: 'PieChart',
  props: {
    data:null
  },
  mounted() {

    this.drawChart();

  },
  methods:{

    async drawChart() {
      let x = null;
      await axios.get("http://localhost:8000/pie")
          .then((response)=> x = response.data)
          .catch((error)=> console.log(error))
      let ctx = document.getElementById('myChart1').getContext('2d');

      let data = {
        labels: ['True Positives', 'False Positives', 'True Negatives', 'False Negatives'], // time values for the x-axis
        datasets: [{
          label: 'Visit Breakdown', // label for the y-axis
          data: [x.true_positives, x.false_positives, x.true_negatives, x.false_negatives], // attempts values for the y-axis
          // fill: false, // do not fill the area under the curve
          borderColor: 'lightblue', // set the color of the line to blue
          tension: 0.1, // set the smoothness of the curve
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(48,114,64)',
            'rgb(255, 205, 86)',

          ],
        }]
      };

// Define the options for the graph
      let options = {
        scales: {
          y: {
            beginAtZero: true // start the y-axis from zero
          }
        }
      };

// Create a new chart object with the data and options
      let myChart = new Chart(ctx, {
        type: 'doughnut', // set the type of the graph to line
        data: data, // use the sample data
        options: options // use the options
      });
    }
  }
}
</script>