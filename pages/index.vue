<template>
  <div>
   <ScenarioTable
      tableHeading="Shared Scenarios"
      :scenarioTableData="sharedScenariosList.scenarios"
    />
  </div>
</template>

<script>
import ScenarioTable from "../components/Scenarios/ScenarioTable.vue";
export default {
  data() {
    return {
      sharedScenariosList: [],
    };
  },
  components: {
    ScenarioTable
  },
  async mounted() {
    this.sharedScenariosList = await this.$axios.$get("/shared-scenarios", {
      progress: true,
    });
  },
};
</script>

<style></style>
