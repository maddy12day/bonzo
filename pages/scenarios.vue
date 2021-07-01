<template>
  <div>
    <ScenarioTable
      tableHeading="Your Scenarios"
      :scenarioTableData="sharedScenariosList.scenarios"
      :type="'yourScenarios'"
      v-if="sharedScenariosList.scenarios"
    />
    <RegularFilters :showAplyFilterBtn="false"/>
  </div>
</template>

<script>
import ScenarioTable from "../components/Scenarios/ScenarioTable.vue";
import RegularFilters from "../components/Filters/RegularFilter.vue";

export default {
  data() {
    return {
      sharedScenariosList: [],
    };
  },
  components: {
    ScenarioTable,
    RegularFilters,
  },
  async mounted() {
    let allUserInfo = JSON.parse(window.localStorage.getItem("allUsersInfo"));
    let currentUserId = allUserInfo.users.filter(
      (user) => (user.email_id = this.$auth.user.email)
    )[0].id;
    this.sharedScenariosList = await this.$axios.$get(
      `/get-user-scenarios/${currentUserId}`,
      {
        progress: true,
      }
    );
  },
};
</script>

<style></style>
