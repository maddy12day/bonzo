<template>
  <div>
    <StatsWidget />

    <ScenarioTable
      v-if="sharedScenariosList.scenarios"
      tableHeading="Shared Scenarios"
      :scenarioTableData="sharedScenariosListCom.scenarios"
      :type="'sharedScenarios'"
      previewBtnText="Merge Scenario"
      @scenarioStatus="scenarioMergeStatusUpdate"
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
            <span class="d-block d-sm-none">{{ option.name }}</span>
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
      callToIntervalAjax: true,
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
    async scenarioMergeStatusUpdate() {
      this.sharedScenariosList = await this.$axios.$get("/shared-scenarios", {
        progress: true,
      });
    },
    // check status after every 10 sec for user scenarios
    async checkMergeScenarioStatus() {
      console.log(
        "this.callToIntervalAjaxSCom",
        this.sharedScenariosList.scenarios
      );
      if (this.callToIntervalAjaxSCom) {
        const scenarioTypesJson = await this.$axios.$get("/shared-scenarios", {
          progress: true,
        });
        const mergedPending = scenarioTypesJson.scenarios.filter((item) =>
          item.status.includes("Merge Pending")
        );
        if (mergedPending.length > 0) {
          this.callToIntervalAjax = true;
        } else {
          this.callToIntervalAjax = false;
        }
        this.sharedScenariosList = scenarioTypesJson;
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
        localStorage.setItem(
          "baseVersionId",
          this.baseMetricsList[0].demand_forecast_run_log_id
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
    async getWeekendDates() {
      const weekendDates = await this.$axios.$get("/get-weekend-dates");
      window.localStorage.setItem(
        "allUsersInfo",
        JSON.stringify(this.userInfo)
      );

      localStorage.setItem(
        "weekendDates",
        JSON.stringify(weekendDates.weekends)
      );
    },
  },
  async mounted() {
    this.showMetricsByDuration("Weekly");
    this.getAllUserData();
    this.getWeekendDates();
    setTimeout(() => {
      this.checkMergeScenarioStatus();
    }, 10000);
  },

  computed: {
    callToIntervalAjaxSCom() {
      return this.callToIntervalAjax;
    },
    sharedScenariosListCom() {
      return this.sharedScenariosList;
    },
    Durations() {
      return [
        { name: "Monthly", acronym: "M", icon: "tim-icons icon-calendar-60" },
        {
          name: "Weekly",
          acronym: "W",
          icon: "tim-icons icon-notes",
        },
      ];
    },
  },
};
</script>

<style scoped></style>
