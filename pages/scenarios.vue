<template>
  <div>
    <div class="card mb-0 py-2">
      <div class="col-md-12 text-right">
        <h4 class="text-left mt-0 mb-0">Create New Scenarios</h4>
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
          @getBroductSource="getProductSource"
          @getBrandType="getBrandType"
          @getLifyClycle="getLifeCycle"
          @newNess="getNewness"
          @getChannels="getChannelValues"
          @getBrands="getBrandValus"
          @getSubChannelValues="getSubChannelValues"
          @getCollectionValus="getCollectionValues"
          @getSkusValues="getSkusValues"
          @getCategories="getCategoryValues"
        />

        <ProgramFilters
          :showAplyFilterBtn="false"
          v-if="activeFilterType == 'Program'"
          @getBroductSource="getProductSource"
          @getBrandType="getBrandType"
          @getLifyClycle="getLifeCycle"
          @newNess="getNewness"
          @getBrands="getBrandValus"
          @getChannels="getChannelValues"
          @getPrograms="getPrograms"
          @getSubChannel="getSubChannelValues"
          @getCategories="getCategoryValues"
          @getClass="getClassValues"
          @getSubClass="getSubClassValues"
          @getCollection="getCollectionValues"
          @getSkusValues="getSkusValues"
        />
        <div class="row mt-3">
          <div class="col-md-3 text-left">
            <Label class="mb-0 mb-1 mt-2">Scenario Type</Label>
            <Multiselect
              :Options="scenarioTypes"
              :multiple="false"
              @customEvent="getScenarioType"
            />
          </div>
          <div class="col-md-2 text-left mt-1">
            <Label class="mb-0 mt-0">Start Date</Label>
            <base-input
              type="date"
              placeholder="start date"
              class="bg-white mt-2"
              v-model="startDateValue"
            >
            </base-input>
          </div>
          <div class="col-md-2 text-left pl-0 mt-1">
            <Label class="mb-0 mt-0">End Date</Label>
            <base-input
              type="date"
              placeholder="start date"
              class="bg-white mt-2"
              v-model="endDateValue"
            >
            </base-input>
          </div>
          <div class="col-md-2 text-left pl-0 mt-1">
            <Label class="mb-0 mt-0">Amount</Label>
            <base-input
              type="number"
              placeholder="amount"
              class="bg-white mt-2"
              v-model="amountValue"
            >
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 text-left mt-1">
            <Label class="mb-0 mt-0">Scenario Name</Label>
            <base-input
              type="text"
              placeholder="Scenario Name"
              class="bg-white mt-1"
              v-model="scenarioNameValue"
            >
            </base-input>
          </div>
          <div class="col-md-3 mt-4 text-left">
            <button class="btn btn-primary" @click="createScenario">
              Create Scenario
            </button>
          </div>
        </div>
      </div>
    </div>

    <ScenarioTable
      class="mt-4"
      tableHeading="Your Scenarios"
      :scenarioTableData="sharedScenariosList.scenarios"
      :type="'yourScenarios'"
      v-if="showScenarioTable"
    />
  </div>
</template>

<script>
import { BaseAlert } from "@/components";
import ScenarioTable from "../components/Scenarios/ScenarioTable.vue";
import RegularFilters from "../components/Filters/RegularFilter.vue";
import ProgramFilters from "../components/Filters/ProgramFilter.vue";
import Multiselect from "../components/Filters/MultiSelect.vue";
import { emptyFieldCleaner } from "../util/empty-field-cleaner";

export default {
  data() {
    return {
      // filters values vairables
      sharedScenariosList: [],
      activeFilterType: "Regular",
      scenarioTypes: [],
      productSourceValues: [],
      brandTypeValues: [],
      lifeCycleValues: [],
      newNessValues: [],
      brandValues: [],
      programValues: [],
      channelValues: [],
      subChannelsValues: [],
      categoriesValues: [],
      classesValues: [],
      subClassesValues: [],
      collectionValues: [],
      skuValues: [],
      scenarioTypeValue: "",
      startDateValue: "",
      endDateValue: "",
      amountValue: "",
      scenarioNameValue: "",
      showScenarioTable: false,
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false,
      },
    };
  },
  components: {
    BaseAlert,
    ScenarioTable,
    RegularFilters,
    ProgramFilters,
    Multiselect,
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
      let color = 4;
      this.$notify({
        message:
          "Scenario submitted to model. Please check 'Your Scenarios' for updates in sometime.",
        timeout: 30000,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color],
      });
    },
    // filter value getter methods
    getProductSource(values) {
      this.productSourceValues = values;
    },
    getBrandType(values) {
      this.brandTypeValues = values;
    },
    getLifeCycle(values) {
      this.lifeCycleValues = values;
    },
    getNewness(values) {
      this.newNessValues = values;
    },
    getBrandValus(values) {
      this.getBrandValus = values;
    },
    getChannelValues(values) {
      this.channelValues = values;
    },
    getPrograms(values) {
      this.programValues = values;
    },
    getSubChannelValues(values) {
      this.subChannelsValues = values;
    },
    getCategoryValues(values) {
      this.categoriesValues = values;
    },
    getClassValues(values) {
      this.classesValues = values;
    },
    getSubClassValues(values) {
      this.subClassesValues = values;
    },
    getCollectionValues(values) {
      this.collectionValues = values;
    },
    getSkusValues(values) {
      this.skuValues = values;
      console.log(this.scenarioTypeValue);
      console.log(this.startDateValue, this.endDateValue, this.amountValue);
    },
    getScenarioType(values) {
      this.scenarioTypeValue = values.value;
    },

    // -- end ---
    showFilterType(type) {
      this.activeFilterType = type;
    },
    async createScenario() {
      this.showScenarioTable = false;
      const createScenarioModel = {
        scenario_name: this.scenarioNameValue,
        demand_planner_user_id: this.$auth.user.user_id,
        scenario_types: this.scenarioTypeValue,
        amount: Number(this.amountValue),
        is_dollar: false,
        start_date: new Date(this.startDateValue),
        end_date: new Date(this.endDateValue),
        filter_level: this.activeFilterType,
        filter_product_sources: this.productSourceValues,
        filter_brand_types: this.brandTypeValues,
        filter_life_cycles: this.lifeCycleValues,
        filter_newness: this.newNessValues,
        filter_brands: this.brandValues,
        filter_channels: this.channelValues,
        filter_sub_channels: this.subChannelsValues,
        filter_collections: this.collectionValues,
        filter_skus: this.skuValues,
        filter_programs: this.programValues,
        filter_categories: this.categoriesValues,
        filter_classes: this.classesValues,
        filter_sub_classes: this.subClassesValues,
        is_active: true,
        status: "Pending",
        is_shared: false,
        is_part_of_base: false,
      };
      const finalModel = emptyFieldCleaner(createScenarioModel);
      const createScenarioJson = await this.$axios.$post(
        `/create-scenario`,
        finalModel
      );
      await this.userAllScenarios();
      this.notifyVue("top", "right");
    },
    async getScenarioTypes() {
      const scenarioTypesJson = await this.$axios.$get(
        `/get-all-scenario-types`,
        {
          progress: true,
        }
      );
      this.scenarioTypes = scenarioTypesJson.scenariosTypes.map((item) => {
        return {
          name: item.scenario_type,
          value: item.id,
        };
      });
    },
    async userAllScenarios() {
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
      this.showScenarioTable = true;
    },
  },

  async mounted() {
    console.log(this.$auth.user);
    this.getScenarioTypes();
    this.userAllScenarios();
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

<style>
.card .alert {
  position: relative !important;
  width: 100%;
}
</style>
