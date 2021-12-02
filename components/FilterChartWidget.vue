<template>
  <card type="chart">
    <template slot="header">
      <div class="row">
        <div class="col-sm-12 text-right d-flex d-sm-block">
          <div
            class="btn-group btn-group-toggle"
            :class="'float-right'"
            data-toggle="buttons"
          >
            <label
              v-for="(option, index) in chartTypes"
              :key="option.name"
              class="btn btn-sm btn-primary btn-simple"
              :class="{
                active: activeIndexChart === index,
              }"
              :id="index"
            >
              <input
                type="radio"
                @click="initForecastChartType(index)"
                name="options"
                autocomplete="off"
                :checked="activeIndexChart === index"
              />
              <span class="d-none d-sm-block">{{ option.name }}</span>
              <span class="d-block d-sm-none">
                <i :class="option.acronym"></i>
              </span>
            </label>
          </div>
        </div>
        <div class="col-sm-6" :class="'text-left'">
          <h5 class="card-category">Planned Vs Actuals Vs Forecast</h5>
          <h2 class="card-title"></h2>
        </div>

        <div class="col-sm-6 d-flex d-sm-block text-right">
          <div
            class="btn-group btn-group-toggle"
            :class="'float-right'"
            data-toggle="buttons"
          >
            <label
              v-for="(option, index2) in durations"
              :key="option.name"
              class="btn btn-sm btn-primary btn-simple"
              :class="{
                active: activeIndex === index2,
              }"
              :id="index2"
            >
              <input
                type="radio"
                @click="initForecastChart(index2)"
                name="options"
                autocomplete="off"
                :checked="activeIndex === index2"
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
        ref="forecastChart2"
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
import moment from 'moment'
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
  props: ["requestedFilterOption"],
  data() {
    return {
      activeIndex: 0,
      activeIndexChart: 1,
      chartWeeklylApiJsonData: [],
      weeklyUnitsChartData: [],
      monthlyUnitsChartData: [],
      chartMonthlyApiJsonData: [],
      lineChart: {
        chartData: {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(label, index, labels) {
                    return label / 1000 + "k";
                  },
                },
                scaleLabel: {
                  display: true,
                  labelString: "1k = 1000",
                },
              },
            ],
          },
          datasets: [
            {
              label: "Planned",
            },
            {
              label: "This Year",
            },
            {
              label: "Forecast",
            },
          ],
          labels: weeklyChartLabels,
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      forecastedYear: "2021"
    };
  },
  computed: {
    requestedFilterOptionCom() {
      return this.requestedFilterOption;
    },
    chartTypes() {
      return [
        { name: "Units", acronym: "U", icon: "tim-icons icon-single-02" },
        {
          name: "Revnue",
          acronym: "R",
          icon: "tim-icons icon-gift-2",
        },
      ];
    },
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
    initChart(year) {
      this.forecastedYear = year;
      this.baseMonthlyChart();
      this.baseWeeklyChart();
      
  },
     dataMappingWeekly(data, duration) {
      if (duration == "Weekly" && data) {
        let dataMap = new Map();
        for (let i = 1; i <= 52; i++) {
          dataMap.set(i-1, { date: i, total_revenue: 0, total_units: 0 });
        }
        for (let d of data) {
          if (parseInt(d.date) <= 52) {
            dataMap.set(parseInt(d.date), d);
          }
        }
        return [...dataMap.values()].slice(0, moment(new Date()).week()-1)
      } else if(data) {
        let dataMap = new Map();
        for (let i = 1; i <= 12; i++) {
          dataMap.set(i, { date: i, total_revenue: 0, total_units: 0 });
        }
        for (let d of data) {
          if (parseInt(d.date) <= 12) {
            dataMap.set(parseInt(d.date), d);
          }
        }
        return [...dataMap.values()].slice(0, new Date().getMonth()+1)
      }
    },
    async baseWeeklyChart() {
      const reqBody = this.requestedFilterOptionCom;
      delete reqBody["filterType"];
      const chartData = await this.$axios.$post(
        `/get-filtered-chart-data-by-duration/${this.forecastedYear}`,
        {
          filters: { ...reqBody },
          duration: "week",
        }
      );
      this.chartWeeklylApiJsonData = chartData;
      this.changeWeeklyDataByType("Units");
    },
    async baseMonthlyChart() {
      const reqBody = this.requestedFilterOptionCom;
      delete reqBody["filterType"];
      const chartData = await this.$axios.$post(
        `/get-filtered-chart-data-by-duration/${this.forecastedYear}`,
        {
          filters: { ...reqBody },
          duration: "month",
        }
      );
      this.chartMonthlyApiJsonData = chartData;
          this.initForecastChartType(0);
      this.changeMonthDataByType("Units");
    },
    initForecastChartType(index) {
      this.activeIndexChart = index;
      this.activeIndexChart == 1 && this.activeIndex == 1
        ? (this.changeWeeklyDataByType("Revenue"), this.initForecastChart(1))
        : this.changeWeeklyDataByType("Units");

      this.activeIndexChart == 0 && this.activeIndex == 1
        ? (this.changeWeeklyDataByType("Units"), this.initForecastChart(1))
        : this.changeWeeklyDataByType("Revenue");
      this.activeIndexChart == 1 && this.activeIndex == 0
        ? (this.changeMonthDataByType("Revenue"), this.initForecastChart(0))
        : this.changeMonthDataByType("Units");
      this.activeIndexChart == 0 && this.activeIndex == 0
        ? (this.changeMonthDataByType("Units"), this.initForecastChart(0))
        : this.changeMonthDataByType("Revenue");
    },
    changeWeeklyDataByType(forecastType) {
      let plannedData = [];
      let thisYearData = [];
      let forecastData = [];
      switch (forecastType) {
        case "Units":
          plannedData = this.chartWeeklylApiJsonData?.chartData
            ? this.chartWeeklylApiJsonData?.chartData[0]?.map(
                (item) => item.total_units
              )
            : [];
          thisYearData = this.chartWeeklylApiJsonData?.chartData
            ? this.dataMappingWeekly(this.chartWeeklylApiJsonData?.chartData[1] , "Weekly")?.map(
                (item) => item.total_units
              )
            : [];
          forecastData = this.chartWeeklylApiJsonData?.chartData
            ? this.chartWeeklylApiJsonData?.chartData[2]?.map(
                (item) => item.total_units
              )
            : [];
          break;
        case "Revenue":
          plannedData = this.chartWeeklylApiJsonData?.chartData
            ? this.chartWeeklylApiJsonData?.chartData[0]?.map(
                (item) => item.total_revenue
              )
            : [];
          thisYearData = this.chartWeeklylApiJsonData?.chartData
            ? this.dataMappingWeekly(this.chartWeeklylApiJsonData?.chartData[1], "Weekly")?.map(
                (item) => item.total_revenue
              )
            : [];
          forecastData = this.chartWeeklylApiJsonData?.chartData
            ? this.chartWeeklylApiJsonData?.chartData[2]?.map(
                (item) => item.total_revenue
              )
            : [];
          break;
      }
      this.weeklyUnitsChartData[0] = plannedData;
      this.weeklyUnitsChartData[1] = thisYearData;
      this.weeklyUnitsChartData[2] = forecastData;
    },
    changeMonthDataByType(forecastType) {
      let plannedData = [];
      let thisYearData = [];
      let forecastData = [];
      switch (forecastType) {
        case "Units":
          plannedData = this.chartMonthlyApiJsonData?.chartData
            ? this.chartMonthlyApiJsonData?.chartData[0]?.map(
                (item) => item.total_units
              )
            : [];
          thisYearData = this.chartMonthlyApiJsonData?.chartData
            ? 
             this.dataMappingWeekly(this.chartMonthlyApiJsonData?.chartData[1], "Monthly")?.map(
                (item) => item.total_units
              )
            : [];
          forecastData = this.chartMonthlyApiJsonData?.chartData
            ? this.chartMonthlyApiJsonData?.chartData[2]?.map(
                (item) => item.total_units
              )
            : [];
          break;
        case "Revenue":
          plannedData = this.chartMonthlyApiJsonData?.chartData
            ? this.chartMonthlyApiJsonData?.chartData[0]?.map(
                (item) => item.total_revenue
              )
            : [];
          thisYearData = this.chartMonthlyApiJsonData?.chartData
            ? this.dataMappingWeekly(this.chartMonthlyApiJsonData?.chartData[1], "Monthly")?.map(
                (item) => item.total_revenue
              )
            : [];
          forecastData = this.chartMonthlyApiJsonData?.chartData
            ? this.chartMonthlyApiJsonData?.chartData[2]?.map(
                (item) => item.total_revenue
              )
            : [];
          break;
      }
      this.monthlyUnitsChartData[0] = plannedData;
      this.monthlyUnitsChartData[1] = thisYearData;
      this.monthlyUnitsChartData[2] = forecastData;
    },
    initForecastChart(index) {
      this.activeIndex = index;
      this.activeIndexChart == 1 && this.activeIndex == 1
        ? this.changeWeeklyDataByType("Revenue")
        : this.changeWeeklyDataByType("Units");

      this.activeIndexChart == 0 && this.activeIndex == 1
        ? this.changeWeeklyDataByType("Units")
        : this.changeWeeklyDataByType("Revenue");
      this.activeIndexChart == 1 && this.activeIndex == 0
        ? this.changeMonthDataByType("Revenue")
        : this.changeMonthDataByType("Units");
      this.activeIndexChart == 0 && this.activeIndex == 0
        ? this.changeMonthDataByType("Units")
        : this.changeMonthDataByType("Revenue");
      this.activeIndex = index;
      if (index == 0) {
        let chartData = {
          datasets: [
            {
              label: "Planned",
              fill: false,
              borderColor: "#1d8cf8",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1d8cf8",
              pointBorderColor: "#1d8cf8",
              pointHoverBackgroundColor: "#1d8cf8",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 6,
              pointRadius: 1,
              data: this.monthlyUnitsChartData[0]
                ? this.monthlyUnitsChartData[0]
                : [],
            },
            {
              label: "This Year",
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
              pointHoverBorderWidth: 6,
              pointRadius: 1,
              data: this.monthlyUnitsChartData[1]
                ? this.monthlyUnitsChartData[1]
                : [],
            },
            {
              label: "Forecast",
              fill: false,
              borderColor: "#d48d23d9",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "",
              pointBorderColor: "#d48d23d9",
              pointHoverBackgroundColor: "#d48d23d9",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 6,
              pointRadius: 1,
              data: this.monthlyUnitsChartData[2]
                ? this.monthlyUnitsChartData[2]
                : [],
              legend: {
                display: true,
              },
            },
          ],
          labels: monthlyChartLabels,
        };
        this.$refs.forecastChart2.updateGradients(chartData);
        this.lineChart.chartData = chartData;
      }
      if (index == 1) {
        let chartData = {
          datasets: [
            {
              label: "Planned",
              fill: false,
              borderColor: "#1d8cf8",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1d8cf8",
              pointBorderColor: "#1d8cf8",
              pointHoverBackgroundColor: "#1d8cf8",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 6,
              pointRadius: 1,
              data: this.weeklyUnitsChartData[0]
                ? this.weeklyUnitsChartData[0]
                : [],
            },
            {
              label: "This Year",
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
              pointHoverBorderWidth: 6,
              pointRadius: 1,
              data: this.weeklyUnitsChartData[1]
                ? this.weeklyUnitsChartData[1]
                : [],
            },
            {
              label: "Forecast",
              fill: false,
              borderColor: "#d48d23d9",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#d48d23d9",
              pointBorderColor: "#d48d23d9",
              pointHoverBackgroundColor: "#d48d23d9",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 6,
              pointRadius: 1,
              data: this.weeklyUnitsChartData[2]
                ? this.weeklyUnitsChartData[2]
                : [],
            },
          ],
          labels: weeklyChartLabels,
        };
        this.$refs.forecastChart2.updateGradients(chartData);
        this.lineChart.chartData = chartData;
      }
    },
  },

  created() {},
  
  mounted() {
    this.baseMonthlyChart();
    this.baseWeeklyChart();
  },
};
</script>

<style></style>
