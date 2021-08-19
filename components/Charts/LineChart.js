import { Line, mixins } from "vue-chartjs";

export default {
  name: "line-chart",
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    extraOptions: Object,
    gradientColors: {
      type: Array,
      default: () => [
        "rgba(72,72,176,0.2)",
        "rgba(72,72,176,0.0)",
        "rgba(119,52,169,0)",
      ],
      validator: (val) => {
        return val.length > 1;
      },
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: (val) => {
        return val.length > 1;
      },
    },
  },
  data() {
    return {
      ctx: null,
      options: {
        //Chart.js options
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function(tooltipItem) {
              const weekendDates = JSON.parse(localStorage.getItem("weekendDates"))
              if (tooltipItem.xLabel.startsWith("W")) {
                if (Number(tooltipItem.yLabel)  > 999) {
                  return parseFloat(Number(tooltipItem.yLabel)  / 1000).toFixed(2) + "K"  + `  (date: ${weekendDates[tooltipItem.index]})`;
                } else if (Number(tooltipItem.yLabel)  < 999) {
                  return parseFloat(Number(tooltipItem.yLabel) ).toFixed(2) +  `  (date: ${weekendDates[tooltipItem.index]})`;
                }
              }else {
                if (Number(tooltipItem.yLabel)  > 999) {
                  return parseFloat(Number(tooltipItem.yLabel)  / 1000).toFixed(2) + "K"
                } else if (Number(tooltipItem.yLabel)  < 999) {
                  return parseFloat(Number(tooltipItem.yLabel) ).toFixed(2)
                } 
              }
            },
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function(value, index, values) {
                  if (value > 999 && value < 1000000) {
                    return parseFloat(value / 1000).toFixed(2) + "K";
                  } else if (value < 999) {
                    return parseFloat(value).toFixed(2);
                  } else {
                    return parseFloat(value / 1000000).toFixed(2) + "M";
                  }
                },
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
          legendText: ["Planned", "This Year", "Forecast"],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    updateGradients(chartData) {
      if (!chartData) return;
      const ctx =
        this.ctx || document.getElementById(this.chartId).getContext("2d");
      const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      this.gradientStops.forEach((stop, index) => {
        gradientStroke.addColorStop(stop, this.gradientColors[index]);
      });
      chartData.datasets.forEach((set) => {
        if (!set.backgroundColor) {
          set.backgroundColor = gradientStroke;
        }
      });
    },
  },
  mounted() {
    this.$watch(
      "chartData",
      (newVal, oldVal) => {
        this.updateGradients(this.chartData);
        if (!oldVal) {
          this.renderChart(this.chartData, this.options);
        }
      },
      { immediate: true }
    );
  },
};
