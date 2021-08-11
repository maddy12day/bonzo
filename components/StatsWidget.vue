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
            <span class="d-block d-sm-none">{{ option.acronym }}</span>
          </label>
        </div>
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Yearly'">
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            yearlyPlannedData[0]
              ? parseInt(yearlyPlannedData[0]._sum.units)
              : ''
          }`"
          :revenue="`${
            yearlyPlannedData[0]
              ? parseInt(yearlyPlannedData[0]._sum.revenue)
              : ''
          }`"
          class="border border-info"
        />
        <p><sub>*Plan does not contain all the skus</sub></p>
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${yearlySaleData[0] ? parseInt(yearlySaleData[0].qtr_units): ''}`"
          :revenue="`${yearlySaleData[0] ? parseInt( yearlySaleData[0].qtr_revenue ): ''}`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${
            forecastYQData[1] ? parseInt(forecastYQData[1].yearly_aggregate) : ''
          }`"
          :revenue="`${
            forecastYQData[0] ? parseInt(forecastYQData[0].yearly_aggregate) : ''
          }`"
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q1'">
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            quarterlyPlannedData[0] ? parseInt(quarterlyPlannedData[0].qtr_units): ''
          }`"
          :revenue="`${
            quarterlyPlannedData[0] ? parseInt(quarterlyPlannedData[0].qtr_revenue) : ''
          }`"
          class="border border-info"
        />
        <p><sub>*Plan does not contain all the skus</sub></p>
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${
            quarterlySaleData[0] ? parseInt(quarterlySaleData[0].qtr_units) : ''
          }`"
          :revenue="`${
            quarterlySaleData[0] ? parseInt(quarterlySaleData[0].qtr_revenue) : ''
          }`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${forecastYQData[0] ? parseInt(forecastYQData[0].q1_aggregate) : ''}`"
          :revenue="`${
            forecastYQData[1] ? parseInt(forecastYQData[1].q1_aggregate) : ''
          }`"
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q2'">
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            quarterlyPlannedData[1] ? parseInt(quarterlyPlannedData[1].qtr_units) : ''
          }`"
          :revenue="`${
            quarterlyPlannedData[1] ? parseInt( quarterlyPlannedData[1].qtr_revenue) : ''
          }`"
          class="border border-info"
        />
        <p><sub>*Plan does not contain all the skus</sub></p>
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${
            quarterlySaleData[1] ? parseInt(quarterlySaleData[1].qtr_units) : ''
          }`"
          :revenue="`${
            quarterlySaleData[1] ? parseInt(quarterlySaleData[1].qtr_revenue ): ''
          }`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${forecastYQData[1] ? parseInt(forecastYQData[1].q2_aggregate) : ''}`"
          :revenue="`${
            forecastYQData[0] ? parseInt(forecastYQData[0].q2_aggregate) : ''
          }`"
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q3'">
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            quarterlyPlannedData[2] ? parseInt(quarterlyPlannedData[2].qtr_units) : ''
          }`"
          :revenue="`${
            quarterlyPlannedData[2] ? parseInt(quarterlyPlannedData[2].qtr_revenue) : ''
          }`"
          class="border border-info"
        />
        <p><sub>*Plan does not contain all the skus</sub></p>
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${
            quarterlySaleData[2] ? parseInt(quarterlySaleData[2].qtr_units ): ''
          }`"
          :revenue="`${
            quarterlySaleData[2] ? parseInt(quarterlySaleData[2].qtr_revenue) : ''
          }`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${forecastYQData[1] ? parseInt(forecastYQData[1].q3_aggregate) : ''}`"
          :revenue="`${forecastYQData[0] ? parseInt(forecastYQData[0].q3_aggregate) : ''}`"
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q4'">
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="`${
            quarterlyPlannedData[3] ? parseInt(quarterlyPlannedData[3].qtr_units) : ''
          }`"
          :revenue="`${
            quarterlyPlannedData[3] ? parseInt(quarterlyPlannedData[3].qtr_revenue) : ''
          }`"
          class="border border-info"
        />
        <p><sub>*Plan does not contain all the skus</sub></p>
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="`${
            quarterlySaleData[3] ? parseInt(quarterlySaleData[3].qtr_units) : ''
          }`"
          :revenue="`${
            quarterlySaleData[3] ? parseInt(quarterlySaleData[3].qtr_revenue) : ''
          }`"
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="`${forecastYQData[1] ? parseInt(forecastYQData[1].q4_aggregate) : ''}`"
          :revenue="`${
            forecastYQData[0] ? parseInt(forecastYQData[0].q4_aggregate) : ''
          }`"
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
      this.$store.commit("toggleStatsAPIResponseState",false);
      const quaterly = await this.$axios.$get(
        "/based-quarterly-sale-this-year",
        {
          progress: true,
        }
      );
      this.quarterlySaleData = quaterly.baseQuarterlySale;
      this.$store.commit("toggleStatsAPIResponseState",true);
    },

    async quarterlyPlanned() {
      this.$store.commit("toggleStatsAPIResponseState",false);
      const quarterly = await this.$axios.$get("/based-quarterly-planned", {
        progress: true,
      });
      this.quarterlyPlannedData = quarterly.baseQuarterlyPlanned;
      this.$store.commit("toggleStatsAPIResponseState",true);
    },

    async yearlySale() {
      this.$store.commit("toggleStatsAPIResponseState",false);
      const yearly = await this.$axios.$get("/based-yearly-sale-this-year", {
        progress: true,
      });
      this.yearlySaleData = yearly.baseYearlySale;
      this.$store.commit("toggleStatsAPIResponseState",true);
    },

    async yearlyPlanned() {
      this.$store.commit("toggleStatsAPIResponseState",false);
      const yearly = await this.$axios.$get("/base-yearly-planned", {
        progress: true,
      });
      this.yearlyPlannedData = yearly.baseYearlyPlanned;
      this.$store.commit("toggleStatsAPIResponseState",true);
    },

    async forecastYearlyQuarterly() {
      this.$store.commit("toggleStatsAPIResponseState",false);
      const forecast = await this.$axios.$get(
        "/base-yearly-quarterly-forecast/2021",
        {
          progress: true,
        }
      );
      console.log("forecast",JSON.parse(forecast.baseYQForecast));
      this.forecastYQData = JSON.parse(forecast.baseYQForecast);
      this.$store.commit("toggleStatsAPIResponseState",true);
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
        { name: "Yearly", acronym: "Y", icon: "tim-icons icon-planet" },
        { name: "Q1", acronym: "Q1", icon: "tim-icons icon-bullet-list-67" },
        { name: "Q2", acronym: "Q2", icon: "tim-icons icon-bullet-list-67" },
        { name: "Q3", acronym: "Q3", icon: "tim-icons icon-bullet-list-67" },
        { name: "Q4", acronym: "Q4", icon: "tim-icons icon-bullet-list-67" },
      ];
    },
  },
};
</script>

<style>
</style>