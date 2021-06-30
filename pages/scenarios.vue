<template>
  <div>
    <ScenarioTable
      tableHeading="Your Scenarios"
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
    ScenarioTable,
  },
  async mounted() {
    this.sharedScenariosList = await this.$axios.$get("/get-user-scenarios", {
      progress: true,
    });
    console.log("JJ",this.$auth.user)
  },
};
</script>

<style></style>
