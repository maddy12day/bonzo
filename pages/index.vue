<template>
  <div>
    <el-collapse class="mb-2">
      <el-collapse-item
        :title="'Model Timeline'"
        :class="'font-weght-bold display-3'"
      >
        <div class="card pt-2">
          <Timeline
            :genesisTimeLineNode="genesisNodeTimeline"
            :timeLineData="mergedScenariosTimeLine"
          />
        </div>
      </el-collapse-item>
    </el-collapse>

    <StatsWidget />
    <ChartWidget />

    <ScenarioTable
      v-if="
        sharedScenariosList.scenarios &&
          sharedScenariosListCom.scenarios.length > 0
      "
      tableHeading="Shared Scenarios"
      :scenarioTableData="sharedScenariosListCom.scenarios"
      :type="'sharedScenarios'"
      previewBtnText="Merge Scenario"
      @scenarioStatus="scenarioMergeStatusUpdate"
    />

    <card card-body-classes="table-full-width">
      <div class="row mt-1">
        <div class="col-md-2 text-left">
          <select
            class="form-control selectpicker"
            data-style="btn btn-link"
            id="exampleFormControlSelect1"
            @change="getSelectedYear"
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div class="col-md-2 text-right offset-md-8">
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
      </div>
      <client-only>
        <WeeklyMetricsTable
          v-if="activeTab == 'Weekly'"
          :metricsTableData="baseMetricsList"
          tableHeading="Weekly Forecast Metrics"
        />
      </client-only>
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
import ChartWidget from "../components/ChartWidget.vue";
import ScenarioTable from "../components/Scenarios/ScenarioTable.vue";
import WeeklyMetricsTable from "../components/Metrics/WeeklyMetricsTable.vue";
import MonthlyMetricsTable from "../components/Metrics/MonthlyMetricsTable.vue";
import Card from "~/components/Cards/Card.vue";
import Timeline from "../components/Timeline/Timeline.vue";

export default {
  data() {
    return {
      sharedScenariosList: [],
      baseMetricsList: [],
      activeTab: "Monthly",
      userInfo: [],
      callToIntervalAjax: true,
      genesisNodeTimeline: [],
      mergedScenariosTimeLine: [],
      forecastedYear: '2021',
    };
  },
  components: {
    StatsWidget,
    ChartWidget,
    ScenarioTable,
    WeeklyMetricsTable,
    MonthlyMetricsTable,
    Card,
    Timeline,
  },
  methods: {
    async scenarioMergeStatusUpdate() {
      this.sharedScenariosList = await this.$axios.$get("/shared-scenarios", {
        progress: true,
      });
    },
    getSelectedYear(evt) {
      this.forecastedYear = evt.target.value;
      this.showMetricsByDuration("Weekly");

    },
    // timeline api call
    async getTimelineDetails() {
      const mergedScenario = await this.$axios.$get(
        "/merge-scenario-time-line",
        {
          progress: true,
        }
      );
      this.mergedScenariosTimeLine = mergedScenario.mergeScenarios;
      const genesisNode = await this.$axios.$get("/genesis-node-time-line", {
        progress: true,
      });
      this.genesisNodeTimeline = genesisNode.genensis[0];
    },
    // check status after every 10 sec for user scenarios
    async checkMergeScenarioStatus() {
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
          `/base-weekly-metrics/${this.forecastedYear}`,
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
          `/base-monthly-metrics/${this.forecastedYear}`,
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
    console.log("opopopoop00---");
    this.getTimelineDetails();
    this.showMetricsByDuration("Monthly");
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
