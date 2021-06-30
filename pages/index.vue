<template>
  <div>
    <ScenarioTable
      tableHeading="Shared Scenarios"
      :scenarioTableData="sharedScenariosList.scenarios"
    />
    <MetricsTable :metricsTableData="baseMetricsList" />
  </div>
</template>

<script>
import ScenarioTable from "../components/Scenarios/ScenarioTable.vue";
import MetricsTable from "../components/Metrics/MetricsTable.vue";

export default {
  data() {
    return {
      sharedScenariosList: [],
      baseMetricsList: [],
    };
  },
  components: {
    ScenarioTable,
    MetricsTable,
  },
  async mounted() {
    this.sharedScenariosList = await this.$axios.$get("/shared-scenarios", {
      progress: true,
    });

    const baseWeeklyMetricsListString = await this.$axios.$get(
      "/base-weekly-metrics",
      {
        progress: true,
      }
    );
    this.baseMetricsList = JSON.parse(
      baseWeeklyMetricsListString.baseWeeklyMetrics
    );
  },
};
</script>

<style></style>
