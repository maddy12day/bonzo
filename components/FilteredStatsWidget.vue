<template>
  <card card-body-classes="table-full-width">
    <div
      class="row"
      v-if="
        forecastYQData &&
          forecastYQData.filteredStats &&
          forecastYQData.filteredStats.yearlyFilteredStats.length > 0
      "
    >
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
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="
            `${
              yearlyFilteredStats[0] && yearlyFilteredStats[0][0]
                ? parseInt(yearlyFilteredStats[0][0].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              yearlyFilteredStats[0] && yearlyFilteredStats[0][0]
                ? parseInt(yearlyFilteredStats[0][0].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="
            `${
              yearlyFilteredStats[1] && yearlyFilteredStats[1][0]
                ? yearlyFilteredStats[1][0].total_units
                : ''
            }`
          "
          :revenue="
            `${
              yearlyFilteredStats[1] && yearlyFilteredStats[1][0]
                ? yearlyFilteredStats[1][0].total_revenue
                : ''
            }`
          "
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              yearlyFilteredStats[2] && yearlyFilteredStats[2][0]
                ? yearlyFilteredStats[2][0].total_units
                : ''
            }`
          "
          :revenue="
            `${
              yearlyFilteredStats[2] && yearlyFilteredStats[2][0]
                ? yearlyFilteredStats[2][0].total_revenue
                : ''
            }`
          "
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q1'">
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][0]
                ? quarterlyFilteredStats[0][0].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][0]
                ? quarterlyFilteredStats[0][0].total_revenue
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][0]
                ? quarterlyFilteredStats[1][0].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][0]
                ? quarterlyFilteredStats[1][0].total_revenue
                : ''
            }`
          "
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][0]
                ? quarterlyFilteredStats[2][0].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][0]
                ? quarterlyFilteredStats[2][0].total_revenue
                : ''
            }`
          "
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q2'">
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][1]
                ? quarterlyFilteredStats[0][1].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][1]
                ? quarterlyFilteredStats[0][1].total_revenue
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][1]
                ? quarterlyFilteredStats[1][1].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][1]
                ? quarterlyFilteredStats[1][1].total_revenue
                : ''
            }`
          "
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][1]
                ? quarterlyFilteredStats[2][1].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][1]
                ? quarterlyFilteredStats[2][1].total_revenue
                : ''
            }`
          "
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q3'">
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][2]
                ? quarterlyFilteredStats[0][2].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[0][2] && quarterlyFilteredStats[0][2]
                ? quarterlyFilteredStats[0][2].total_revenue
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][2]
                ? quarterlyFilteredStats[1][2].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][2]
                ? quarterlyFilteredStats[1][2].total_revenue
                : ''
            }`
          "
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][2]
                ? quarterlyFilteredStats[2][2].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][2]
                ? quarterlyFilteredStats[2][2].total_revenue
                : ''
            }`
          "
          class="border border-warning"
        />
      </div>
    </div>
    <div class="row" v-if="currentYQTab == 'Q4'">
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Planned"
          :units="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][3]
                ? quarterlyFilteredStats[0][3].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][3]
                ? quarterlyFilteredStats[0][3].total_revenue
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="This Year"
          :units="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][3]
                ? quarterlyFilteredStats[1][3].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][3]
                ? quarterlyFilteredStats[1][3].total_revenue
                : ''
            }`
          "
          class="border border-danger"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][3]
                ? quarterlyFilteredStats[2][3].total_units
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][3]
                ? quarterlyFilteredStats[2][3].total_revenue
                : ''
            }`
          "
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
  props: ["regularFilters"],
  data() {
    return {
      forecastYQData: {},
      quarterlyPlannedData: [],
      quarterlySaleData: [],
      yearlyPlannedData: [],
      yearlySaleData: [],
      currentYQTab: "Yearly",
      yearlyFilteredStats: [],
      quarterlyFilteredStats: [],
    };
  },
  components: {
    Card,
    YearlyQuarterlyCard,
  },
  methods: {
    async calloutByDuration(duration) {
      this.currentYQTab = duration;
    },
    async getFilteredStatsWidgetData(regularFilters) {
      const filteredStatsWidgetData = await this.$axios.$post(
        "/get-filtered-stats",
        regularFilters
      );
      this.forecastYQData = filteredStatsWidgetData;
      this.quarterlyFilteredStats =
        filteredStatsWidgetData.filteredStats.quarterlyFilteredStats;
      this.yearlyFilteredStats =
        filteredStatsWidgetData.filteredStats.yearlyFilteredStats;
    },
  },
  async created() {
    this.getFilteredStatsWidgetData(this.regularFilters);
  },
  computed: {
    yearlyQuarterlyTabs() {
      return [
        { name: "Yearly", icon: "tim-icons icon-planet" },
        { name: "Q1", icon: "tim-icons icon-bullet-list-67" },
        { name: "Q2", icon: "tim-icons icon-bullet-list-67" },
        { name: "Q3", icon: "tim-icons icon-bullet-list-67" },
        { name: "Q4", icon: "tim-icons icon-bullet-list-67" },
      ];
    },
  },
};
</script>

<style></style>
