<template>
  <div>
    <card card-body-classes="table-full-width">
      <div class="row" v-if="forecastYQData.length > 0">
        <div class="col-md-12 text-right mb-3">
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
          <YearlyQarterlyCard
            title="Planned"
            :units="`${
              yearlyPlannedData[0]
                ? parseInt(yearlyPlannedData[0]._sum.units)
                : 0
            }`"
            :revenue="`${
              yearlyPlannedData[0]
                ? parseInt(yearlyPlannedData[0]._sum.revenue)
                : 0
            }`"
            class="bg-danger"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="This Year"
            :units="`${yearlySaleData[0] ? yearlySaleData[0].qtr_units : 0}`"
            :revenue="`${
              yearlySaleData[0] ? yearlySaleData[0].qtr_revenue : 0
            }`"
            class="bg-warning"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Forecast"
            :units="`${
              forecastYQData[1] ? forecastYQData[1].yearly_aggregate : 0
            }`"
            :revenue="`${
              forecastYQData[0] ? forecastYQData[0].yearly_aggregate : 0
            }`"
            class="bg-info"
          />
        </div>
      </div>
      <div class="row" v-if="currentYQTab == 'Q1'">
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Planned"
            :units="`${
              quarterlyPlannedData[0] ? quarterlyPlannedData[0].qtr_units : 0
            }`"
            :revenue="`${
              quarterlyPlannedData[0] ? quarterlyPlannedData[0].qtr_revenue : 0
            }`"
            class="bg-danger"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="This Year"
            :units="`${
              quarterlyPlannedData[0] ? quarterlyPlannedData[0].qtr_units : 0
            }`"
            :revenue="`${
              quarterlyPlannedData[0] ? quarterlyPlannedData[0].qtr_revenue : 0
            }`"
            class="bg-warning"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Forecast"
            :units="`${forecastYQData[1] ? forecastYQData[1].q1_aggregate : 0}`"
            :revenue="`${
              forecastYQData[0] ? forecastYQData[0].q1_aggregate : 0
            }`"
            class="bg-info"
          />
        </div>
      </div>
      <div class="row" v-if="currentYQTab == 'Q2'">
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Planned"
            :units="`${
              quarterlyPlannedData[1] ? quarterlyPlannedData[1].qtr_units : 0
            }`"
            :revenue="`${
              quarterlyPlannedData[1] ? quarterlyPlannedData[1].qtr_revenue : 0
            }`"
            class="bg-danger"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="This Year"
            :units="`${
              quarterlyPlannedData[1] ? quarterlyPlannedData[1].qtr_units : 0
            }`"
            :revenue="`${
              quarterlyPlannedData[1] ? quarterlyPlannedData[1].qtr_revenue : 0
            }`"
            class="bg-warning"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Forecast"
            :units="`${forecastYQData[1] ? forecastYQData[1].q2_aggregate : 0}`"
            :revenue="`${
              forecastYQData[0] ? forecastYQData[0].q2_aggregate : 0
            }`"
            class="bg-info"
          />
        </div>
      </div>
      <div class="row" v-if="currentYQTab == 'Q3'">
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Planned"
            :units="`${
              quarterlyPlannedData[2] ? quarterlyPlannedData[2].qtr_units : 0
            }`"
            :revenue="`${
              quarterlyPlannedData[2] ? quarterlyPlannedData[2].qtr_revenue : 0
            }`"
            class="bg-danger"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="This Year"
            :units="`${
              quarterlyPlannedData[2] ? quarterlyPlannedData[2].qtr_units : 0
            }`"
            :revenue="`${
              quarterlyPlannedData[2] ? quarterlyPlannedData[2].qtr_revenue : 0
            }`"
            class="bg-warning"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Forecast"
            :units="`${forecastYQData[1] ? forecastYQData[1].q3_aggregate : 0}`"
            :revenue="`${forecastYQData ? forecastYQData[0].q3_aggregate : 0}`"
            class="bg-info"
          />
        </div>
      </div>
      <div class="row" v-if="currentYQTab == 'Q4'">
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Planned"
            :units="`${
              quarterlyPlannedData[3] ? quarterlyPlannedData[3].qtr_units : 0
            }`"
            :revenue="`${
              quarterlyPlannedData[3] ? quarterlyPlannedData[3].qtr_revenue : 0
            }`"
            class="bg-danger"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="This Year"
            :units="`${
              quarterlyPlannedData[3] ? quarterlyPlannedData[3].qtr_units : 0
            }`"
            :revenue="`${
              quarterlyPlannedData[3] ? quarterlyPlannedData[3].qtr_revenue : 0
            }`"
            class="bg-warning"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Forecast"
            :units="`${forecastYQData[1] ? forecastYQData[1].q4_aggregate : 0}`"
            :revenue="`${
              forecastYQData[0] ? forecastYQData[0].q4_aggregate : 0
            }`"
            class="bg-info"
          />
        </div>
      </div>
    </card>

    <ScenarioTable
      v-if="sharedScenariosList.scenarios"
      tableHeading="Shared Scenarios"
      :scenarioTableData="sharedScenariosList.scenarios"
      :type="'sharedScenarios'"
    />

    <card card-body-classes="table-full-width">
      <div class="col-md-12 text-right p-0">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label
            v-for="(option, index) in Durations"
            :key="option.name"
            class="btn btn-sm btn-primary btn-simple"
            :id="index"
            :class="{ active: activeTab == option.name }"
          >
            <input
              type="radio"
              name="options"
              autocomplete="off"
              checked=""
              @click="showMetricsByDuration(option.name)"
            />
            <span class="d-none d-sm-block">{{ option.name }}</span>
            <span class="d-block d-sm-none">
              <i :class="option.icon"></i>
            </span>
          </label>
        </div>
      </div>
      <WeeklyMetricsTable
        v-if="activeTab == 'Weekly'"
        :metricsTableData="baseMetricsList"
        tableHeading="Weekly Metrics"
      />
      <MonthlyMetricsTable
        v-if="activeTab == 'Monthly'"
        :metricsTableData="baseMetricsList"
        tableHeading="Monthly Metrics"
      />
    </card>
  </div>
</template>

<script>
import ScenarioTable from "../components/Scenarios/ScenarioTable.vue";
import WeeklyMetricsTable from "../components/Metrics/WeeklyMetricsTable.vue";
import MonthlyMetricsTable from "../components/Metrics/MonthlyMetricsTable.vue";
import YearlyQarterlyCard from "../components/YearlyQuarterlyCards/YearlyQuarterlyCards.vue";
import Card from "~/components/Cards/Card.vue";

export default {
  data() {
    return {
      sharedScenariosList: [],
      baseMetricsList: [],
      forecastYQData: {},
      quarterlyPlannedData: [],
      quarterlySaleData: [],
      yearlySaleData: [],
      yearlyPlannedData: [],
      activeTab: "Weekly",
      currentYQTab: "Yearly",
      userInfo: [],
    };
  },
  components: {
    ScenarioTable,
    WeeklyMetricsTable,
    MonthlyMetricsTable,
    YearlyQarterlyCard,
    Card,
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
    async showMetricsByDuration(activeTab) {
      this.activeTab = activeTab;
      if (this.activeTab == "Weekly") {
        // all shared scenario
        this.sharedScenariosList = await this.$axios.$get("/shared-scenarios", {
          progress: true,
        });
        // base metrics table for weekly
        const baseWeeklyMetricsListString = await this.$axios.$get(
          "/base-weekly-metrics",
          {
            progress: true,
          }
        );
        this.baseMetricsList = JSON.parse(
          baseWeeklyMetricsListString.baseWeeklyMetrics
        );
      } else {
        // base metrics table for monthly
        const baseMonthlyMetricsListString = await this.$axios.$get(
          "/base-monthly-metrics",
          {
            progress: true,
          }
        );
        this.baseMetricsList = JSON.parse(
          baseMonthlyMetricsListString.baseMonthlyMetrics
        );
      }
    },

    async yearlySale() {
      const yearly = await this.$axios.$get("/based-yearly-sale-this-year", {
        progress: true,
      });
      this.yearlySaleData = yearly.baseYearlySale;
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

    async yearlyPlanned() {
      const yearly = await this.$axios.$get("/base-yearly-planned", {
        progress: true,
      });
      this.yearlyPlannedData = yearly.baseYearlyPlanned;
    },

    async quarterlyPlanned() {
      const quarterly = await this.$axios.$get("/based-quarterly-planned", {
        progress: true,
      });
      this.quarterlyPlannedData = quarterly.baseQuarterlyPlanned;
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
    async getAllUserData() {
      this.userInfo = await this.$axios.$get("/get-all-users");
      window.localStorage.setItem(
        "allUsersInfo",
        JSON.stringify(this.userInfo)
      );
    },
  },
  async mounted() {
    this.showMetricsByDuration("Weekly");
    this.forecastYearlyQuarterly();
    this.yearlySale();
    this.yearlyPlanned();
    this.getAllUserData();
  },

  computed: {
    yearlyQuarterlyTabs() {
      return [
        { name: "Yearly", icon: "tim-icons icon-single-02" },
        {
          name: "Q1",
          icon: "tim-icons icon-gift-2",
        },
        {
          name: "Q2",
          icon: "tim-icons icon-gift-2",
        },
        {
          name: "Q3",
          icon: "tim-icons icon-gift-2",
        },
        {
          name: "Q4",
          icon: "tim-icons icon-gift-2",
        },
      ];
    },
    Durations() {
      return [
        { name: "Monthly", icon: "tim-icons icon-single-02" },
        {
          name: "Weekly",
          icon: "tim-icons icon-gift-2",
        },
      ];
    },
  },
};
</script>

<style></style>
