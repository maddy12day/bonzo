<template>
  <div>
    <div class="card mb-0 py-2">
      <div class="col-md-12 text-right">
        <div class="scenario-reset-div">
          <h4 class="text-left mt-0 mb-0">Create New Scenarios</h4>
          <div class="btn-custom-div">
            <label
              class="btn btn-sm btn-dark btn-simple btn-custom"
              v-if="showResetFilter"
            >
              <span class="d-none d-sm-block" @click="forceRerender"
                >Reset Filters</span
              >
            </label>
          </div>
        </div>
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
            <span class="d-block d-sm-none">{{ option.name }}</span>
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
          :showChannelError="showChannelErrorCom"
          :key="regularFiltersComponentKey"
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
          :showChannelError="showChannelErrorCom"
          :key="programFiltersComponentKey"
        />
        <div class="row mt-3">
          <div class="col-md-3 text-left">
            <Label class="mb-0 mb-1 mt-2">Scenario Type</Label>
            <Multiselect
              :Options="scenarioTypes"
              :multiple="false"
              @customEvent="getScenarioType"
              :class="
                showScenarioTypeError ? 'border border-danger rounded' : ''
              "
            />
            <p class="text-danger small " v-if="showScenarioTypeError">
              select a valid scenario type
            </p>
          </div>
          <div class="col-md-3 text-left mt-1">
            <Label class="mb-0 mt-0">Start Date</Label>
            <base-input
              type="date"
              placeholder="start date"
              class="mt-2"
              v-model="startDateValue"
              :class="showStartDateError ? 'border border-danger rounded' : ''"
              @change="getStartDate"
            >
            </base-input>
            <p class="text-danger small " v-if="showStartDateError">
              please enter a start date
            </p>
          </div>
          <div class="col-md-3 text-left pl-0 mt-1">
            <Label class="mb-0 mt-0">End Date</Label>
            <base-input
              type="date"
              placeholder="start date"
              class="mt-2"
              :min="tomorrowDate"
              v-model="endDateValue"
              :class="showEndDateError ? 'border border-danger rounded' : ''"
              @change="getEndDate"
            >
            </base-input>
            <p class="text-danger small " v-if="showEndDateError">
              please enter a end date
            </p>
          </div>
          <div class="col-md-2 text-left pl-0 mt-1">
            <Label class="mb-0 mt-0">Amount</Label>
            <base-input
              type="number"
              placeholder="amount"
              class="mt-2"
              v-model="amountValue"
              :maxlength="2"
              @input="getAmount"
              :class="showAmountError ? 'border border-danger rounded' : ''"
            >
            </base-input>
            <p v-if="showAmountError" class="text-danger small">
              Please enter a correct amount
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 text-left mt-1">
            <Label class="mb-0 mt-0">Scenario Name</Label>
            <base-input
              type="text"
              placeholder="Scenario Name"
              class="mt-1"
              v-model="scenarioNameValue"
              :class="
                showScenarioNameError ? 'border border-danger rounded' : ''
              "
              @input="getScenarioName"
            >
            </base-input>
            <p v-if="showScenarioNameError" class="text-danger small">
              Please enter a Scenario Name
            </p>
          </div>
          <div class="col-md-3 mt-4 text-left">
            <button
              class="btn btn-primary createScenarioBtn"
              @click="createScenario"
              :disabled="disabledScenarioBtn"
            >
              Create Scenario
            </button>
          </div>
        </div>
      </div>
    </div>

    <ScenarioTable
      class="mt-4"
      tableHeading="Your Scenarios"
      :scenarioTableData="sharedScenariosListCom.scenarios"
      :type="'yourScenarios'"
      v-if="showScenarioTable && sharedScenariosListCom.scenarios.length > 0"
      useClass="fixedHeightScrollTable"
      previewBtnText="Share Scenario"
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
import moment from "moment";

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
      callToIntervalAjax: true,
      disabledScenarioBtn: false,
      showScenarioTable: false,
      tomorrowDate: "",
      //validation vars
      showChannelError: false,
      showScenarioTypeError: false,
      showStartDateError: false,
      showEndDateError: false,
      showAmountError: false,
      showScenarioNameError: false,
      requestedFilterOption: [],
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false,
      },
      fixedHeightScrollTable: {
        height: "550px",
        overflow: "scroll",
      },

      regularFiltersComponentKey: Math.random(),
      programFiltersComponentKey: Math.random(),
     
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
    resetFilter() {
      this.forceRerender();
      this.$store.commit("updateRegularFilter", []);
    },
    notifyVue(verticalAlign, horizontalAlign) {
      let color = 2;
      this.$notify({
        message:
          "Scenario submitted to model. Please check 'Your Scenarios' for updates in sometime.",
        timeout: 12000,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color],
      });
    },
    // filter value getter methods
    getProductSource(values) {
      this.productSourceValues = values;
      this.getSelectedFilters();
    },
    getBrandType(values) {
      this.brandTypeValues = values;
      this.getSelectedFilters();
    },
    getLifeCycle(values) {
      this.lifeCycleValues = values;
      this.getSelectedFilters();
    },
    getNewness(values) {
      this.newNessValues = values;
      this.getSelectedFilters();
    },
    getBrandValus(values) {
      this.getBrandValus = values;
      this.getSelectedFilters();
    },
    getChannelValues(values) {
      this.channelValues = values;
      this.channelValues.find((item) => item.includes("All")) ||
      this.channelValues.length > 1 ||
      this.channelValues.length == 0
        ? (this.showChannelError = true)
        : (this.showChannelError = false);
      this.getSelectedFilters();
    },
    getPrograms(values) {
      this.programValues = values;
      this.getSelectedFilters();
    },
    getSubChannelValues(values) {
      this.subChannelsValues = values;
      this.getSelectedFilters();
    },
    getCategoryValues(values) {
      this.categoriesValues = values;
      this.getSelectedFilters();
    },
    getClassValues(values) {
      this.classesValues = values;
      this.getSelectedFilters();
    },
    getSubClassValues(values) {
      this.subClassesValues = values;
      this.getSelectedFilters();
    },
    getCollectionValues(values) {
      this.collectionValues = values;
      this.getSelectedFilters();
    },
    getSkusValues(values) {
      this.skuValues = values;
      this.getSelectedFilters();
    },
    getScenarioType(values) {
      this.scenarioTypeValue = values.value;
      this.showScenarioTypeError = this.scenarioTypeValue ? false : true;
    },
    getScenarioName(evt) {
      this.showScenarioNameError = this.scenarioNameValue ? false : true;
    },
    getStartDate(evt) {
      this.tomorrowDate = moment(this.startDateValue)
        .add(1, "days")
        .format("YYYY-MM-DD");
      this.showStartDateError = this.startDateValue ? false : true;
    },
    getEndDate(evt) {
      this.showEndDateError = this.endDateValue ? false : true;
    },
    getAmount(evt) {
      this.showAmountError = this.amountValue ? false : true;
    },

    // -- end ---
    showFilterType(type) {
      this.activeFilterType = type;
      this.$store.commit("updateRegularFilter", []);
    },
    forceRerender() {
      this.regularFiltersComponentKey += 1;
      this.programFiltersComponentKey += 1;
      this.requestedFilterOption = {};
    },
    emptyFieldCleaner(reqBody) {
      for (let key in reqBody) {
        if (reqBody[key] == "" || reqBody[key] == undefined) {
          delete reqBody[key];
        }
        if (Array.isArray(reqBody[key]) && reqBody[key].length > 1) {
          reqBody[key] = reqBody[key].map((item) => {
            if (item.includes("All") === false) {
              return item;
            }
          });
        } else if (Array.isArray(reqBody[key]) && reqBody[key].length == 1) {
          reqBody[key] = reqBody[key].map((item) => {
            if (item.includes("All") === false) {
              return item;
            }
          });
        }
      }
      return reqBody;
    },
    getSelectedFilters() {
      let selectedFilter = {
        filter_product_sources: this.productSourceValues,
        filter_brand_types: this.brandTypeValues,
        filter_life_cycles: this.lifeCycleValues,
        filter_newness: this.newNessValues,
        filter_brands: this.brandValues,
        filter_channels: this.channelValues,
        filter_sub_channels: this.subChannelsValues,
        filter_categories: this.categoriesValues,
        filter_collections: this.collectionValues,
        filter_skus: this.skuValues,
        filter_classes: this.classesValues,
        filter_sub_classes: this.subClassesValues,
        filter_programs: this.programValues,
      };
      this.requestedFilterOption = this.emptyFieldCleaner(selectedFilter);
    },
    async createScenario() {
      // validations
      this.showScenarioTypeError = this.scenarioTypeValue ? false : true;
      this.showScenarioNameError = this.scenarioNameValue ? false : true;
      this.showEndDateError = this.startDateValue ? false : true;
      this.showStartDateError = this.endDateValue ? false : true;
      this.channelValues.find((item) => item.includes("All")) ||
      this.channelValues.length > 1 ||
      this.channelValues.length == 0
        ? (this.showChannelError = true)
        : (this.showChannelError = false);
      this.showAmountError = this.amountValue ? false : true;
      if (
        this.showScenarioTypeError ||
        this.showScenarioNameError ||
        this.showStartDateError ||
        this.showEndDateError ||
        this.showChannelErrorCom ||
        this.showChannelError ||
        this.showAmountError
      ) {
      } else {
        const createScenarioModel = {
          scenario_name: this.scenarioNameValue,
          demand_planner_user_id: this.$auth.user.user_id,
          scenario_types: this.scenarioTypeValue,
          amount: parseFloat(this.amountValue),
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
        this.sharedScenariosList.scenarios.unshift(
          createScenarioJson.scenarioRes
        );
        this.resetFilter();
        this.scenarioTypes = "";
        this.scenarioNameValue = "";
        this.startDateValue = "";
        this.endDateValue = "";
        this.amountValue = "";
        this.showScenarioTable = true;
        this.disabledScenarioBtn = true;
        this.callToIntervalAjax = true;
        this.notifyVue("top", "right");
      }
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
      this.sharedScenariosList = await this.$axios.$get(
        `/get-user-scenarios/${this.$auth.user.user_id}`,
        {
          progress: true,
        }
      );
      if (!this.sharedScenariosList || !this.sharedScenariosList.scenario) {
        this.sharedScenariosList.scenario = [];
      }
      this.showScenarioTable = true;
    },

    // check status after every 10 sec for user scenarios
    async checkScenarioStatus() {
      if (this.callToIntervalAjaxSCom) {
        const scenarioTypesJson = await this.$axios.$get(
          `/get-scenario-status/${this.$auth.user.user_id}`,
          {
            progress: true,
          }
        );
        if (scenarioTypesJson !== {} && scenarioTypesJson.scenario) {
          if (
            scenarioTypesJson &&
            ["Completed", "Failed", "Error", "Merge Completed"].includes(
              scenarioTypesJson.scenario.status
            )
          ) {
            this.callToIntervalAjax = false;
            this.disabledScenarioBtn = false;
            this.sharedScenariosList.scenarios[0].status =
              scenarioTypesJson.scenario.status;
          } else {
            this.callToIntervalAjax = true;
            this.disabledScenarioBtn = true;
            this.sharedScenariosList.scenarios[0].status =
              scenarioTypesJson.scenario.status;
          }
        }
      } else {
        this.disabledScenarioBtn = false;
      }
    },
  },

  async mounted() {
    this.getScenarioTypes();
    this.userAllScenarios();
    setInterval(() => {
      this.checkScenarioStatus();
    }, 10000);
  },
  computed: {
    showResetFilter() {
      return Object.keys(this.requestedFilterOption).length > 0;
    },
    showChannelErrorCom() {
      return this.showChannelError;
    },
    disbledCom() {
      return this.disabledScenarioBtn;
    },
    callToIntervalAjaxSCom() {
      return this.callToIntervalAjax;
    },
    sharedScenariosListCom() {
      return this.sharedScenariosList;
    },
    filtersType() {
      return [
        { name: "Regular", acronym: "R", icon: "tim-icons icon-single-02" },
        {
          name: "Program",
          acronym: "P",
          icon: "tim-icons icon-gift-2",
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.card .alert {
  position: relative !important;
  width: 100%;
}
.form-control {
  border-radius: 5px !important;
  border-color: #e8e8e8 !important;
  height: 45px;
  margin-top: -4px;
}

.createScenarioBtn {
  height: 45px;
  margin-top: 0px;
}

.scenario-reset-div {
  display: flex;
  margin-bottom: 10px;

  .btn-custom-div {
    position: absolute;
    right: 0;
    padding: 0 15px;
  }
}
</style>
