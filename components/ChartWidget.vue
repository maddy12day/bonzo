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
    <div class="chart-area" >
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

export default {
  name: "ChartWidget",
  components: {
    LineChart,
  },
  data() {
    return {
      activeIndex: 1,
      chartWeeklylApiJsonData: [],
      weeklyUnitsChartData: [],
      monthlyUnitsChartData: [],
      chartMonthlyApiJsonData: [],
      lineChart: {
        chartData: {
          datasets: [{}, {}, {}],
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
    async baseWeeklyChart() {
      const chartData = await this.$axios.$get("/weekly-base-forecast-chart");
      this.chartWeeklylApiJsonData = chartData;
      this.changeWeeklyDataByType("Units");
    },
    async baseMonthlyChart() {
      const chartData = await this.$axios.$get("/monthly-base-forecast-chart");
      this.chartMonthlyApiJsonData = chartData;
      this.changeMonthDataByType("Units");
    },
    changeWeeklyDataByType(forecastType) {
      let plannedData = [];
      let thisYearData = [];
      let forecastData = [];
      switch (forecastType) {
        case "Units":
          plannedData = this.chartWeeklylApiJsonData.plannedData.map(
            (item) => item.units
          );
          thisYearData = this.chartWeeklylApiJsonData.thisYearData.map(
            (item) => item.units
          );
          forecastData = Object.values(
            this.chartWeeklylApiJsonData.forecastData[0]
          );
          break;
        case "Revenue":
          plannedData = this.chartWeeklylApiJsonData.plannedData.map(
            (item) => item.revenue
          );
          thisYearData = this.chartWeeklylApiJsonData.thisYearData.map(
            (item) => item.revenue
          );
          forecastData = Object.values(
            this.chartWeeklylApiJsonData.forecastData[1]
          );
          break;
      }
      this.weeklyUnitsChartData[0] = plannedData;
      this.weeklyUnitsChartData[1] = thisYearData;
      this.weeklyUnitsChartData[2] = forecastData;
      this.initForecastChart(1);
      console.log(this.weeklyUnitsChartData);
    },
    changeMonthDataByType(forecastType) {
      let plannedData = [];
      let thisYearData = [];
      let forecastData = [];
      switch (forecastType) {
        case "Units":
          plannedData = this.chartMonthlyApiJsonData.plannedData.map(
            (item) => item.units
          );
          thisYearData = this.chartMonthlyApiJsonData.thisYearData.map(
            (item) => item.units
          );
          forecastData = Object.values(
            this.chartMonthlyApiJsonData.forecastData[0]
          );
          break;
        case "Revenue":
          plannedData = this.chartMonthlyApiJsonData.plannedData.map(
            (item) => item.revenue
          );
          thisYearData = this.chartMonthlyApiJsonData.thisYearData.map(
            (item) => item.revenue
          );
          forecastData = Object.values(
            this.chartMonthlyApiJsonData.forecastData[1]
          );
          break;
      }
      this.monthlyUnitsChartData[0] = plannedData;
      this.monthlyUnitsChartData[1] = thisYearData;
      this.monthlyUnitsChartData[2] = forecastData;
      this.initForecastChart(1);
      console.log(this.weeklyUnitsChartData);
    },
    initForecastChart(index) {
      this.activeIndex = index;
      if (index == 0) {
        let chartData = {
          datasets: [
            {
              fill: false,
              borderColor: "#1d8cf8",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "",
              pointBorderColor: "",
              pointHoverBackgroundColor: "#1d8cf8",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 1,
              data: this.monthlyUnitsChartData[0],
            },
            {
              fill: false,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 1,
              data: this.monthlyUnitsChartData[1],
            },
            {
              fill: false,
              borderColor: "#d48d23d9",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "",
              pointBorderColor: "#d48d23d9",
              pointHoverBackgroundColor: "",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 1,
              data: this.monthlyUnitsChartData[2],
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
              fill: false,
              borderColor: "#1d8cf8",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "",
              pointBorderColor: "",
              pointHoverBackgroundColor: "#1d8cf8",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 1,
              data: this.weeklyUnitsChartData[0],
            },
            {
              fill: false,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 1,
              data: this.weeklyUnitsChartData[1],
            },
            {
              fill: false,
              borderColor: "#d48d23d9",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "",
              pointBorderColor: "#d48d23d9",
              pointHoverBackgroundColor: "",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 1,
              data: this.weeklyUnitsChartData[2],
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
    this.baseWeeklyChart();
    this.baseMonthlyChart();
  },
};
</script>

<style></style>
