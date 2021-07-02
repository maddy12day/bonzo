<template>
  <card card-body-classes="table-full-width">
    <div class="row" v-if="forecastYQData.length > 0">
      <div class="col-md-12 text-right mb-2">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label
            v-for="(option, index) in yearlyQuarterlyTabs"
            :key="option.name"
            class="btn btn-sm btn-primary btn-simple"
            :id="index"
            :class="{ active: currentYQTab == option.name }"
          >
            <input
              type="radio"
              name="options"
              autocomplete="off"
              checked=""
              @click="calloutByDuration(option.name)"
            />
            <span class="d-none d-sm-block">{{ option.name }}</span>
            <span class="d-block d-sm-none">
              <i :class="option.icon"></i>
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Yearly'">
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            yearlyPlannedData[0] ? parseInt(yearlyPlannedData[0]._sum.units) : 0
          }`"
          :revenue="`${
            yearlyPlannedData[0]
              ? parseInt(yearlyPlannedData[0]._sum.revenue)
              : 0
          }`"
          class="border border-info"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${yearlySaleData[0] ? yearlySaleData[0].qtr_units : 0}`"
          :revenue="`${yearlySaleData[0] ? yearlySaleData[0].qtr_revenue : 0}`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${
            forecastYQData[1] ? forecastYQData[1].yearly_aggregate : 0
          }`"
          :revenue="`${
            forecastYQData[0] ? forecastYQData[0].yearly_aggregate : 0
          }`"
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q1'">
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            quarterlyPlannedData[0] ? quarterlyPlannedData[0].qtr_units : 0
          }`"
          :revenue="`${
            quarterlyPlannedData[0] ? quarterlyPlannedData[0].qtr_revenue : 0
          }`"
          class="border border-info"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${
            quarterlySaleData[0] ? quarterlySaleData[0].qtr_units : 0
          }`"
          :revenue="`${
            quarterlySaleData[0] ? quarterlySaleData[0].qtr_revenue : 0
          }`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${forecastYQData[1] ? forecastYQData[1].q1_aggregate : 0}`"
          :revenue="`${forecastYQData[0] ? forecastYQData[0].q1_aggregate : 0}`"
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q2'">
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            quarterlyPlannedData[1] ? quarterlyPlannedData[1].qtr_units : 0
          }`"
          :revenue="`${
            quarterlyPlannedData[1] ? quarterlyPlannedData[1].qtr_revenue : 0
          }`"
          class="border border-info"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${
            quarterlySaleData[1] ? quarterlySaleData[1].qtr_units : 0
          }`"
          :revenue="`${
            quarterlySaleData[1] ? quarterlySaleData[1].qtr_revenue : 0
          }`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${forecastYQData[1] ? forecastYQData[1].q2_aggregate : 0}`"
          :revenue="`${forecastYQData[0] ? forecastYQData[0].q2_aggregate : 0}`"
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q3'">
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            quarterlyPlannedData[2] ? quarterlyPlannedData[2].qtr_units : 0
          }`"
          :revenue="`${
            quarterlyPlannedData[2] ? quarterlyPlannedData[2].qtr_revenue : 0
          }`"
          class="border border-info"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${
            quarterlySaleData[2] ? quarterlySaleData[2].qtr_units : 0
          }`"
          :revenue="`${
            quarterlySaleData[2] ? quarterlySaleData[2].qtr_revenue : 0
          }`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${forecastYQData[1] ? forecastYQData[1].q3_aggregate : 0}`"
          :revenue="`${forecastYQData ? forecastYQData[0].q3_aggregate : 0}`"
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q4'">
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            quarterlyPlannedData[3] ? quarterlyPlannedData[3].qtr_units : 0
          }`"
          :revenue="`${
            quarterlyPlannedData[3] ? quarterlyPlannedData[3].qtr_revenue : 0
          }`"
          class="border border-info"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${
            quarterlySaleData[3] ? quarterlySaleData[3].qtr_units : 0
          }`"
          :revenue="`${
            quarterlySaleData[3] ? quarterlySaleData[3].qtr_revenue : 0
          }`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${forecastYQData[1] ? forecastYQData[1].q4_aggregate : 0}`"
          :revenue="`${forecastYQData[0] ? forecastYQData[0].q4_aggregate : 0}`"
          class="border border-warning"
        />
      </div>
    </div>
  </card>
</template>

<script>
import Card from "~/components/Cards/Card.vue";
import YearlyQuarterlyCard from "../components/YearlyQuarterlyCards/YearlyQuarterlyCards.vue";

export default {
  data() {
    return {
      forecastYQData: {},
      quarterlyPlannedData: [],
      quarterlySaleData: [],
      yearlyPlannedData: [],
      yearlySaleData: [],
      currentYQTab: "Yearly",
    };
  },
  components: {
    Card,
    YearlyQuarterlyCard,
  },
  methods: {
    async calloutByDuration(duration) {
      this.currentYQTab = duration;
      const booleanDuration = ["Q1", "Q2", "Q3", "Q4"].find(
        (vendor) => vendor === duration
      );
      if (booleanDuration) {
        this.quarterlySale();
        this.quarterlyPlanned();
      }
    },

    async quarterlySale() {
      const quaterly = await this.$axios.$get(
        "/based-quarterly-sale-this-year",
        {
          progress: true,
        }
      );
      this.quarterlySaleData = quaterly.baseQuarterlySale;
    },

    async quarterlyPlanned() {
      const quarterly = await this.$axios.$get("/based-quarterly-planned", {
        progress: true,
      });
      this.quarterlyPlannedData = quarterly.baseQuarterlyPlanned;
    },

    async yearlySale() {
      const yearly = await this.$axios.$get("/based-yearly-sale-this-year", {
        progress: true,
      });
      this.yearlySaleData = yearly.baseYearlySale;
    },

    async yearlyPlanned() {
      const yearly = await this.$axios.$get("/base-yearly-planned", {
        progress: true,
      });
      this.yearlyPlannedData = yearly.baseYearlyPlanned;
    },

    async forecastYearlyQuarterly() {
      const forecast = await this.$axios.$get(
        "/base-yearly-quarterly-forecast",
        {
          progress: true,
        }
      );
      this.forecastYQData = JSON.parse(forecast.baseYQForecast);
    },
  },
  async mounted() {
    this.forecastYearlyQuarterly();
    this.yearlySale();
    this.yearlyPlanned();
  },
  computed: {
    yearlyQuarterlyTabs() {
      return [
        { name: "Yearly" },
        { name: "Q1" },
        { name: "Q2" },
        { name: "Q3" },
        { name: "Q4" },
      ];
    },
  },
};
</script>

<style>
</style>