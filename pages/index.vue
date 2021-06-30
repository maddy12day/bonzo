<template>
  <div>
    <ScenarioTable
      tableHeading="Shared Scenarios"
      :scenarioTableData="sharedScenariosList.scenarios"
    />

    <card card-body-classes="table-full-width">
      <div class="row" v-if="yearlyQuarterlyData.length > 0">
        <div class="col-md-12 text-right mb-3">
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label
              v-for="(option, index) in yearlyQuarterlyTabs"
              :key="option.name"
              class="btn btn-sm btn-primary btn-simple "
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
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Planned"
            :units="`Units - ${yearlyQuarterlyData[1].yearly_aggregate}`"
            :revenue="`Revenue - ${yearlyQuarterlyData[0].yearly_aggregate}`"
            class="bg-danger"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="This Year"
            :units="`Units - ${yearlyQuarterlyData[1].yearly_aggregate}`"
            :revenue="`Revenue - ${yearlyQuarterlyData[0].yearly_aggregate}`"
            class="bg-warning"
          />
        </div>
        <div class="col-md-4">
          <YearlyQarterlyCard
            title="Forecast"
            :units="`Units - ${yearlyQuarterlyData[1].yearly_aggregate}`"
            :revenue="`Revenue - ${yearlyQuarterlyData[0].yearly_aggregate}`"
            class="bg-info"
          />
        </div>
      </div>
    </card>
    <card card-body-classes="table-full-width">
      <div class="col-md-12 text-right p-0">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label
            v-for="(option, index) in bigLineChartCategories"
            :key="option.name"
            class="btn btn-sm btn-primary btn-simple "
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
      yearlyQuarterlyData: {},
      activeTab: "Weekly",
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
        console.log(this.baseMetricsList);
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
  },

  async mounted() {
    this.showMetricsByDuration("Weekly");
    const baseYearlyQuarterlysListString = await this.$axios.$get(
      "/base-yearly-quarterly-forecast",
      {
        progress: true,
      }
    );
    this.yearlyQuarterlyData = JSON.parse(
      baseYearlyQuarterlysListString.baseYQForecast
    );
    console.log(this.yearlyQuarterlyData);
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
    bigLineChartCategories() {
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
