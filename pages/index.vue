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
    <StatsWidget @getSelectedYear="getSelectedYear" />
    <ChartWidget ref="chartWidget" />

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
        <div class="col-md-2 text-right offset-md-10">
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
    <ComparisonTable :tableData="comparisonCollnData" jsonkey="collection"/>
    <ComparisonTable :tableData="ComparisonCategoryData"  jsonkey="category"/>
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
import ComparisonTable from "../components/ComparisionTables/ComparisonTable.vue";
import CategoryTable from "../components/ComparisionTables/ComparisonTable.vue";

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
      forecastedYear: "2021",
      comparisonCollnData: [],
      ComparisonCategoryData:[],
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
    ComparisonTable,
    CategoryTable
  },
  methods: {
    async scenarioMergeStatusUpdate() {
      this.sharedScenariosList = await this.$axios.$get("/shared-scenarios", {
        progress: true,
      });
    },
    getSelectedYear(value) {
      this.forecastedYear = value;
      this.showMetricsByDuration("Weekly");
      this.getWeekendDates();
      this.$refs.chartWidget.chartInit(value);
      this.comparisonTableDataGenerator();
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
    async comparisonTableDataGenerator() {
      const CategoryRetailForecast = await this.$axios(
        `/forecast-category-by-retail/${this.forecastedYear}`
        );
         const CategoryEcommForecast = await this.$axios(
        `/forecast-category-by-ecomm/${this.forecastedYear}`
        );
         const CategoryTotalForecast = await this.$axios(
        `/forecast-category-by-total/${this.forecastedYear}`
        );
           console.log("this is Retail calling",CategoryRetailForecast);
           console.log("this is Ecomm calling",CategoryEcommForecast);
            console.log("this is total calling",CategoryTotalForecast);

      const collectionForecast = await this.$axios(
        `/collection-forecast/${this.forecastedYear}`
      );
      const collectionForecastByEcomm = await this.$axios(
        `/collection-forecast-by-ecomm/${this.forecastedYear}`
      );
      const collectionForecastByRetail = await this.$axios(
        `/collection-forecast-by-retail/${this.forecastedYear}`
      );
      this.comparisonCollnData = [];
      this.ComparisonCategoryData=[];
       for (let category of CategoryTotalForecast.data.category) {
        for (let ecategory of CategoryEcommForecast.data.category) {
          for (let rcategory of CategoryRetailForecast.data.category) {
            if (
              category.category == ecategory.category &&
              category.category == rcategory.category
            ) {
              this.ComparisonCategoryData.push({
                total: {
                  ...category,
                },
                ecomm: {
                  ...ecategory,
                },
                retail: {
                  ...rcategory,
                },
              });
            }
          }
        }
      }
      for (let collection of collectionForecast.data.collections) {
        for (let ecolln of collectionForecastByEcomm.data.collections) {
          for (let rcolln of collectionForecastByRetail.data.collections) {
            if (
              collection.collection == ecolln.collection &&
              collection.collection == rcolln.collection
            ) {
              this.comparisonCollnData.push({
                total: {
                  ...collection,
                },
                ecomm: {
                  ...ecolln,
                },
                retail: {
                  ...rcolln,
                },
              });
            }
          }
        }
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
      const weekendDates = await this.$axios.$get(
        `/get-weekend-dates/${this.forecastedYear}`
      );
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
    this.getTimelineDetails();
    this.showMetricsByDuration("Monthly");
    this.getAllUserData();
    this.getWeekendDates();
    this.comparisonTableDataGenerator();
    setTimeout(() => {
      this.checkMergeScenarioStatus();
    }, 10000);
  },
  watch: {
    forecastedYearWatch(val) {
      this.forecastedYear = val;
    },
  },
  computed: {
    forecatedYearCom() {
      return this.forecastedYear;
    },
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
