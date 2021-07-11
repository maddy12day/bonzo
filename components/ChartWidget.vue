<template>
  <card type="chart">
    <template slot="header">
      <div class="row">
        <div class="col-sm-6" :class="'text-left'">
          <h5 class="card-category">Planned Vs Actuals Vs Forecast</h5>
          <h2 class="card-title"></h2>
        </div>
        <div class="col-sm-6 d-flex d-sm-block">
          <div
            class="btn-group btn-group-toggle"
            :class="'float-right'"
            data-toggle="buttons"
          >
            <label
              v-for="(option, index) in durations"
              :key="option.name"
              class="btn btn-sm btn-primary btn-simple"
              :class="{
                active: activeIndex === index,
              }"
              :id="index"
            >
              <input
                type="radio"
                @click="initForecastChart(index)"
                name="options"
                autocomplete="off"
                :checked="activeIndex === index"
              />
              <span class="d-none d-sm-block">{{ option.name }}</span>
              <span class="d-block d-sm-none">
                <i :class="option.acronym"></i>
              </span>
            </label>
          </div>
        </div>
      </div>
    </template>
    <div class="chart-area">
      <line-chart
        style="height: 100%"
        ref="forecastChart"
        :chart-data="lineChart.chartData"
        :gradient-colors="lineChart.gradientColors"
        :gradient-stops="lineChart.gradientStops"
        :extra-options="lineChart.extraOptions"
      >
      </line-chart>
    </div>
  </card>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";

let weeklyUnitsChartData = [
  [
    100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100, 80, 120, 105, 110, 95,
    105, 90, 100, 80, 95, 70, 120, 60, 80, 65, 130, 80, 105, 90, 130, 70, 115,
    60, 130, 100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100, 80, 120, 105,
    110,
  ],
  [
    60, 90, 80, 110, 100, 80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120,
    60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130, 100, 70, 90, 70, 85,
    60, 75, 60, 90, 80, 110, 100, 80, 120, 105, 110, 100, 70, 90, 70, 85, 60,
    75,
  ],
  [
    120, 60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130, 100, 70, 90, 70,
    85, 60, 75, 60, 90, 80, 110, 100, 80, 120, 105, 110, 100, 70, 90, 70, 85,
    60, 75, 60, 90, 80, 110, 100, 80, 120, 105, 110, 95, 105, 90, 100, 80, 95,
    70,
  ],
];
let monthlyUnitsChartData = [
  [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 170, 120],
  [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
  [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
];
let weeklyChartLabels = [
  "W01",
  "W02",
  "W03",
  "W04",
  "W05",
  "W06",
  "W07",
  "W08",
  "W09",
  "W10",
  "W11",
  "W12",
  "W13",
  "W14",
  "W15",
  "W16",
  "W17",
  "W18",
  "W19",
  "W20",
  "W21",
  "W22",
  "W23",
  "W24",
  "W25",
  "W26",
  "W27",
  "W28",
  "W29",
  "W30",
  "W31",
  "W32",
  "W33",
  "W34",
  "W35",
  "W36",
  "W37",
  "W38",
  "W39",
  "W40",
  "W41",
  "W42",
  "W43",
  "W44",
  "W45",
  "W46",
  "W47",
  "W48",
  "W49",
  "W50",
  "W51",
  "W52",
];
let monthlyChartLabels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

let chartDatasetOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: "rgba(255,255,255,0)",
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
};

export default {
  name: "ChartWidget",
  components: {
    LineChart,
  },
  data() {
    return {
      activeIndex: 1,
      lineChart: {
        chartData: {
          datasets: [
            {
              ...chartDatasetOptions,
              data: weeklyUnitsChartData[0],
            },
          ],
          labels: weeklyChartLabels,
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
    };
  },
  computed: {
    durations() {
      return [
        { name: "Monthly", acronym: "M", icon: "tim-icons icon-single-02" },
        {
          name: "Weekly",
          acronym: "W",
          icon: "tim-icons icon-gift-2",
        },
      ];
    },
  },
  methods: {
    initForecastChart(index) {
      this.activeIndex = index;
      if (index == 0) {
        let chartData = {
          datasets: [
            {
              ...chartDatasetOptions,
              data: monthlyUnitsChartData[0],
            },
          ],
          labels: monthlyChartLabels,
        };
        this.$refs.forecastChart.updateGradients(chartData);
        this.lineChart.chartData = chartData;
      }
      if (index == 1) {
        let chartData = {
          datasets: [
            {
              ...chartDatasetOptions,
              data: weeklyUnitsChartData[0],
            },
          ],
          labels: weeklyChartLabels,
        };
        this.$refs.forecastChart.updateGradients(chartData);
        this.lineChart.chartData = chartData;
      }
    },
  },
  mounted() {
    this.initForecastChart(1);
  },
};
</script>

<style>
</style>