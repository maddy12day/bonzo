<template>
  <card card-body-classes="table-full-width">
    <div class="applied-filter-container" v-if="allAppliedFilters.length > 0">
      <h5 class="text-bold font-weight-bold">Applied Filters</h5>
      <Tags :allAppliedFilters="allAppliedFilters" />
    </div>
    <div class="row">
      <div class="col-md-2">
        <select
          class="form-control selectpicker"
          data-style="btn btn-link"
          id="exampleFormControlSelect1"
          @change="getSelectedYear"
        >
          <option value="2021">2021</option>
          <option value="2022" selected>2022</option>
        </select>
      </div>
      <div class="col-md-3 text-right mb-2 offset-md-7">
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
          :title="forecastedYear"
          :units="
            `${
              yearlyFilteredStats[1] && yearlyFilteredStats[1][0]
                ? parseInt(yearlyFilteredStats[1][0].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              yearlyFilteredStats[1] && yearlyFilteredStats[1][0]
                ? parseInt(yearlyFilteredStats[1][0].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              yearlyFilteredStats[2] && yearlyFilteredStats[2][0]
                ? parseInt(yearlyFilteredStats[2][0].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              yearlyFilteredStats[2] && yearlyFilteredStats[2][0]
                ? parseInt(yearlyFilteredStats[2][0].total_revenue)
                : ''
            }`
          "
          class="border border-info"
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
                ? parseInt(quarterlyFilteredStats[0][0].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][0]
                ? parseInt(quarterlyFilteredStats[0][0].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          :title="forecastedYear"
          :units="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][0]
                ? parseInt(quarterlyFilteredStats[1][0].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][0]
                ? parseInt(quarterlyFilteredStats[1][0].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][0]
                ? parseInt(quarterlyFilteredStats[2][0].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][0]
                ? parseInt(quarterlyFilteredStats[2][0].total_revenue)
                : ''
            }`
          "
          class="border border-info"
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
                ? parseInt(quarterlyFilteredStats[0][1].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][1]
                ? parseInt(quarterlyFilteredStats[0][1].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          :title="forecastedYear"
          :units="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][1]
                ? parseInt(quarterlyFilteredStats[1][1].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][1]
                ? parseInt(quarterlyFilteredStats[1][1].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][1]
                ? parseInt(quarterlyFilteredStats[2][1].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][1]
                ? parseInt(quarterlyFilteredStats[2][1].total_revenue)
                : ''
            }`
          "
          class="border border-info"
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
                ? parseInt(quarterlyFilteredStats[0][2].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][2]
                ? parseInt(quarterlyFilteredStats[0][2].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          :title="forecastedYear"
          :units="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][2]
                ? parseInt(quarterlyFilteredStats[1][2].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][2]
                ? parseInt(quarterlyFilteredStats[1][2].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][2]
                ? parseInt(quarterlyFilteredStats[2][2].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][2]
                ? parseInt(quarterlyFilteredStats[2][2].total_revenue)
                : ''
            }`
          "
          class="border border-info"
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
                ? parseInt(quarterlyFilteredStats[0][3].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[0] && quarterlyFilteredStats[0][3]
                ? parseInt(quarterlyFilteredStats[0][3].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          :title="forecastedYear"
          :units="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][3]
                ? parseInt(quarterlyFilteredStats[1][3].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[1] && quarterlyFilteredStats[1][3]
                ? parseInt(quarterlyFilteredStats[1][3].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
      <div class="col-md-4 mt-1">
        <YearlyQuarterlyCard
          title="Forecast"
          :units="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][3]
                ? parseInt(quarterlyFilteredStats[2][3].total_units)
                : ''
            }`
          "
          :revenue="
            `${
              quarterlyFilteredStats[2] && quarterlyFilteredStats[2][3]
                ? parseInt(quarterlyFilteredStats[2][3].total_revenue)
                : ''
            }`
          "
          class="border border-info"
        />
      </div>
    </div>
  </card>
</template>

<script>
import Card from "~/components/Cards/Card.vue";
import YearlyQuarterlyCard from "../components/YearlyQuarterlyCards/YearlyQuarterlyCards.vue";
import Tags from "../components/Tags.vue";

export default {
  props: ["filterPayload", "allAppliedFilters"],
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
      filterQuarterlyPayload: {},
      isFilteredQuarterlyStatsFetched: false,
      forecastedYear: "2022",
    };
  },
  components: {
    Card,
    YearlyQuarterlyCard,
    Tags,
  },
  methods: {
    getSelectedYear(evt) {
      this.forecastedYear = evt.target.value;
      this.$emit("getSelectedYear", this.forecastedYear);
      this.getFilteredStatsWidgetData();
    },
    async calloutByDuration(duration) {
      this.currentYQTab = duration;
      if (duration == "Yearly") {
        this.getFilteredStatsWidgetData();
        this.isFilteredQuarterlyStatsFetched = false;
      } else {
        if (!this.isFilteredQuarterlyStatsFetched) {
          this.getFilteredQuarterlyStatsWidgetData();
          this.isFilteredQuarterlyStatsFetched = true;
        }
      }
    },
    async getFilteredQuarterlyStatsWidgetData() {
      this.$store.commit("toggleStatsAPIResponseState", false);
      const filteredStatsWidgetData = await this.$axios.$post(
        `/get-filtered-quarterly-stats/${this.forecastedYear}`,
        this.filterQuarterlyPayload
      );
      this.forecastYQData = filteredStatsWidgetData;
      this.quarterlyFilteredStats =
        filteredStatsWidgetData.filteredStats.quarterlyFilteredStats;
      this.yearlyFilteredStats =
        filteredStatsWidgetData.filteredStats.yearlyFilteredStats;
      this.$store.commit("toggleStatsAPIResponseState", true);
    },
    async getFilteredStatsWidgetData() {
      this.$store.commit("toggleStatsAPIResponseState", false);
      const filteredStatsWidgetData = await this.$axios.$post(
        `/get-filtered-yearly-stats/${this.forecastedYear}`,
        this.filterQuarterlyPayload
      );
      this.forecastYQData = filteredStatsWidgetData;
      this.quarterlyFilteredStats =
        filteredStatsWidgetData.filteredStats.quarterlyFilteredStats;
      this.yearlyFilteredStats =
        filteredStatsWidgetData.filteredStats.yearlyFilteredStats;
      this.$store.commit("toggleStatsAPIResponseState", true);
    },
  },
  async created() {
    this.filterQuarterlyPayload = this.filterPayload;
    this.getFilteredStatsWidgetData();
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

<style scoped>
#exampleFormControlSelect1 {
  height: auto;
  margin-top: 3px;
}
</style>
