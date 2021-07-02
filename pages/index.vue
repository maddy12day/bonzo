<template>
  <div>
    <StatsWidget />

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
        tableHeading="Weekly Forecast Metrics"
      />
      <MonthlyMetricsTable
        v-if="activeTab == 'Monthly'"
        :metricsTableData="baseMetricsList"
        tableHeading="Monthly Forecast Metrics"
      />
    </card>
  </div>
</template>

<script>
import StatsWidget from "../components/StatsWidget.vue";
import ScenarioTable from "../components/Scenarios/ScenarioTable.vue";
import WeeklyMetricsTable from "../components/Metrics/WeeklyMetricsTable.vue";
import MonthlyMetricsTable from "../components/Metrics/MonthlyMetricsTable.vue";
import Card from "~/components/Cards/Card.vue";

export default {
  data() {
    return {
      sharedScenariosList: [],
      baseMetricsList: [],
      activeTab: "Weekly",
      userInfo: [],
    };
  },
  components: {
    StatsWidget,
    ScenarioTable,
    WeeklyMetricsTable,
    MonthlyMetricsTable,
    Card,
  },
  methods: {
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
    this.getAllUserData();
  },

  computed: {
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
