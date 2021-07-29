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
              const weekendDates = [
                "2021-01-03",
                "2021-01-10",
                "2021-01-17",
                "2021-01-24",
                "2021-01-31",
                "2021-02-07",
                "2021-02-14",
                "2021-02-21",
                "2021-02-28",
                "2021-03-07",
                "2021-03-14",
                "2021-03-21",
                "2021-03-28",
                "2021-04-04",
                "2021-04-11",
                "2021-04-18",
                "2021-04-25",
                "2021-05-02",
                "2021-05-09",
                "2021-05-16",
                "2021-05-23",
                "2021-05-30",
                "2021-06-06",
                "2021-06-13",
                "2021-06-20",
                "2021-06-27",
                "2021-07-04",
                "2021-07-11",
                "2021-07-18",
                "2021-07-25",
                "2021-08-01",
                "2021-08-08",
                "2021-08-15",
                "2021-08-22",
                "2021-08-29",
                "2021-09-05",
                "2021-09-12",
                "2021-09-19",
                "2021-09-26",
                "2021-10-03",
                "2021-10-10",
                "2021-10-17",
                "2021-10-24",
                "2021-10-31",
                "2021-11-07",
                "2021-11-14",
                "2021-11-21",
                "2021-11-28",
                "2021-12-05",
                "2021-12-12",
                "2021-12-19",
                "2021-12-26",
              ];
              console.log(tooltipItem);
              if (tooltipItem.xLabel.startsWith("W")) {
                return (
                    Number(tooltipItem.yLabel) < 1000000
                  ? parseInt( Number(tooltipItem.yLabel) / 1000) + "K" + `  (date: ${weekendDates[tooltipItem.index]})`
                  : parseInt( Number(tooltipItem.yLabel) / 1000000) + "M"+`  (date: ${weekendDates[tooltipItem.index]})`
                );
              } else {
                return  Number(tooltipItem.yLabel) < 1000000
                ? parseInt( Number(tooltipItem.yLabel) / 1000) + "K"
                : parseInt( Number(tooltipItem.yLabel) / 1000000) + "M"
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
                  return value < 1000000
                    ? parseInt(value / 1000) + "K"
                    : parseInt(value / 1000000) + "M";
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
