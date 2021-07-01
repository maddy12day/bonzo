<template>
  <div>
    <div class="col-md-12 text-right">
      <div class="btn-group btn-group-toggle p-0 mb-2" data-toggle="buttons">
        <label
          v-for="(option, index) in filtersType"
          :key="option.name"
          class="btn btn-sm btn-primary btn-simple"
          :id="index"
          :class="{ active: activeFilterType == option.name }"
        >
          <input
            type="radio"
            name="options"
            autocomplete="off"
            checked=""
            @click="showFilterType(option.name)"
          />
          <span class="d-none d-sm-block">{{ option.name }}</span>
          <span class="d-block d-sm-none">
            <i :class="option.icon"></i>
          </span>
        </label>
      </div>
      <RegularFilters
        :showAplyFilterBtn="false"
        v-if="activeFilterType == 'Regular'"
      />
      <ProgramFilters
        :showAplyFilterBtn="false"
        v-if="activeFilterType == 'Program'"
      />
      <ScenarioTable
        class="mt-2"
        tableHeading="Your Scenarios"
        :scenarioTableData="sharedScenariosList.scenarios"
        :type="'yourScenarios'"
        v-if="sharedScenariosList.scenarios"
      />
    </div>
  </div>
</template>

<script>
import ScenarioTable from "../components/Scenarios/ScenarioTable.vue";
import RegularFilters from "../components/Filters/RegularFilter.vue";
import ProgramFilters from '../components/Filters/ProgramFilter.vue';

export default {
  data() {
    return {
      sharedScenariosList: [],
      activeFilterType: "Regular",
    };
  },
  components: {
    ScenarioTable,
    RegularFilters,
    ProgramFilters
  },
  methods: {
    showFilterType(type) {
      this.activeFilterType = type;
    },
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
  computed: {
    filtersType() {
      return [
        { name: "Regular", icon: "tim-icons icon-single-02" },
        {
          name: "Program",
          icon: "tim-icons icon-gift-2",
        },
      ];
    },
  },
};
</script>

<style></style>
