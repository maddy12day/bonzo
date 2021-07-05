<template>
  <div>
    <!-- Filters component (Vishal) -->
    <card card-body-classes="table-full-width">
      <div class="forecast-filter-buttons">
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
        <div class="btn-custom-div" v-if="applyCtaDisabled" @click="resetFilter">
          <label class="btn btn-sm btn-dark btn-simple btn-custom">
            <span class="d-none d-sm-block">Reset Filters</span>
          </label>
        </div>
      </div>
      <RegularFilters
        :showAplyFilterBtn="true"
        v-if="activeFilterType == 'Regular'"
        @appliedFilters="appliedFilters"
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
        ref="regularFilter"
        :key="regularFiltersComponentKey"
      />
      <ProgramFilters
        :showAplyFilterBtn="true"
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
        ref="programFilter"
      />

      <div class="applied-filter-container" v-if="allAppliedFilters.length > 0">
        <br />
        <h4 class="text-bold font-weight-bold">
          Applied Filters
        </h4>
        <Tags :allAppliedFilters="allAppliedFilters" />
      </div>
    </card>
    <!-- Applied filters pills (Vishal) -->

    <!-- Base Year/Quarter Stats / Filtered Year/Quarter Stats (Vishal) -->
    <StatsWidget v-if="!isFilteredForecast" />
    <FilteredStatsWidget
      :filteredRequestBody="regularFilters"
      ref="filterWidgets"
      v-if="isFilteredForecast"
      :allAppliedFilters="allAppliedFilters"
    />

    <!-- Adjustments Table -->
    <AdjustmentTable
      class="mt-4"
      tableHeading="Base Model Adjustments"
      :adjustmentTableData="baseAdjustmentsListCom.adjustments"
    />

    <!-- Base Metrics / Filtered Metrics (Jubin) -->
    <!-- Filter: Revenue table (Jubin) -->
    <!-- Filter: Units table (Jubin) -->
    <!-- Filter: AUR table (Jubin) -->
    <card card-body-classes="table-full-width" v-if="!isFilteredForecast">
      <div class="col-md-12 text-right p-0">
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
      <ManualAdjustmentTable
        v-if="activeTab == 'Weekly' && showManualAdj"
        :metricsTableData="baseMetricsList"
        tableHeading="Edit Forecast Metrics"
        @EvtAdjValues="getAdjustedValues"
      />
      <WeeklyMetricsTable
        v-if="activeTab == 'Weekly' && !showManualAdj"
        :metricsTableData="baseMetricsList"
        tableHeading="Base Weekly Forecast Metrics"
      />
      <MonthlyMetricsTable
        v-if="activeTab == 'Monthly'"
        :metricsTableData="baseMetricsList"
        tableHeading="Base Monthly Forecast Metrics"
      />
      <div class="col-md-12 text-right">
        <button
          :class="`btn btn-primary btn-sm text-left ${
            disbledCom || showManualAdj ? 'disabled' : ''
          }`"
          @click="switchToManualAdj"
          :disabled="disbledCom || showManualAdj"
          v-if="!changeMABtnText && activeTab == 'Weekly'"
        >
          Manual Ajustment
        </button>
        <button
          :class="`btn btn-primary btn-sm text-left ${
            disbledCom ? 'disabled' : ''
          }`"
          @click="createManualAdjustment"
          v-if="changeMABtnText"
          :disabled="disbledCom"
        >
          Submit Adjustment
        </button>
        <button
          :class="`btn btn-primary btn-sm ${disbledCom ? 'disabled' : ''}`"
          @click="discardChanges"
          v-if="showDiscardBtn"
          :disabled="disbledCom"
        >
          Discard
        </button>
      </div>
    </card>

    <div v-if="isFilteredForecast">
      <card card-body-classes="table-full-width">
        <div class="col-md-12 text-right p-0">
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label
              v-for="(option, index) in FilteredDurations"
              :key="option.name"
              class="btn btn-sm btn-primary btn-simple"
              :id="index"
              :class="{ active: filteredActiveTab == option.name }"
            >
              <input
                type="radio"
                name="options"
                autocomplete="off"
                checked=""
                @click="showFilteredMetricsByDuration(option.name)"
              />
              <span class="d-none d-sm-block">{{ option.name }}</span>
              <span class="d-block d-sm-none">{{ option.acronym }}</span>
            </label>
          </div>
        </div>

        <FilteredWeeklyMetricsTable
          v-if="filteredActiveTab == 'Weekly'"
          :filteredForecastMetrics="filteredForecastMetrics"
          tableHeading="Filtered Weekly Forecast Metrics"
        />

        <FilteredMonthlyMetricsTable
          v-if="filteredActiveTab == 'Monthly'"
          :filteredForecastMetrics="filteredForecastMetrics"
          tableHeading="Filtered Monthly Forecast Metrics"
        />
      </card>
      <h4 class="font-weight-bold">Top 10 SKUs Forecast</h4>
      <WeeklyForecast
        :tableHeading="'Revenue'"
        :forecast_attribute="'retail_sales'"
        :weeklyforecast="weeklyforecast"
      />
      <WeeklyForecast
        :tableHeading="'Units Sales'"
        :forecast_attribute="'units_sales'"
        :weeklyforecast="weeklyforecast"
      />
      <WeeklyForecast
        :tableHeading="'AUR'"
        :forecast_attribute="'aur'"
        :weeklyforecast="weeklyforecast"
      />
    </div>
  </div>
</template>

<script>
import RegularFilters from "../components/Filters/RegularFilter.vue";
import ProgramFilters from "../components/Filters/ProgramFilter.vue";
import StatsWidget from "../components/StatsWidget.vue";
import AdjustmentTable from "../components/Adjustments/AdjustmentTable.vue";
import WeeklyForecast from "../components/Forecast/ForecastBySkuTable.vue";
import Card from "~/components/Cards/Card.vue";
import WeeklyMetricsTable from "../components/Metrics/WeeklyMetricsTable.vue";
import MonthlyMetricsTable from "../components/Metrics/MonthlyMetricsTable.vue";
import FilteredMonthlyMetricsTable from "../components/Metrics/FilteredMonthlyMetricsTable.vue";
import FilteredWeeklyMetricsTable from "../components/Metrics/FilteredWeeklyMetricsTable.vue";
import FilteredStatsWidget from "../components/FilteredStatsWidget.vue";
import ManualAdjustmentTable from "../components/Metrics/ManualAdjustmentTable.vue";
import Tags from "../components/Tags.vue";

export default {
  name: "Forecast",
  components: {
    MonthlyMetricsTable,
    WeeklyMetricsTable,
    ManualAdjustmentTable,
    StatsWidget,
    AdjustmentTable,
    RegularFilters,
    ProgramFilters,
    WeeklyForecast,
    Card,
    FilteredWeeklyMetricsTable,
    FilteredMonthlyMetricsTable,
    FilteredStatsWidget,
    Tags,
  },

  data() {
    return {
      activeFilterType: "Regular",
      isFilteredForecast: false,
      activeTab: "Weekly",
      filteredActiveTab: "Weekly",
      baseAdjustmentsList: [],
      baseMetricsList: [],
      weeklyforecast: [],
      showManualAdj: false,
      changeMABtnText: false,
      disbleAdjustment: false,
      callToIntervalAjax: true,
      adustments: {},
      type: ["", "info", "success", "warning", "danger"],
      filteredForecastMetrics: [],
      filterMonthly: false,
      filterWeekly: false,
      regularFilters: {},
      filteredStatsWidgetData: {},
      showDiscardBtn: false,
      refreshWidget: false,
      allAppliedFilters: [],
      regularFiltersComponentKey: Math.random(),
    };
  },
  methods: {
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
      this.brandValues = values;
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
    },
    getScenarioType(values) {
      this.scenarioTypeValue = values.id;
    },
    // manual adjustments
    discardChanges() {
      this.showManualAdj = false;
      this.showDiscardBtn = false;
      this.changeMABtnText = false;
    },
    getAdjustedValues(values) {
      if (values) {
        console.log(values);
        this.changeMABtnText = true;
        this.adustments = values;
        this.showDiscardBtn = true;
      }
    },
    switchToManualAdj() {
      this.showDiscardBtn = true;
      this.showManualAdj = true;
    },
    async showMetricsByDuration(activeTab) {
      this.activeTab = activeTab;
      if (this.activeTab == "Weekly") {
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
        localStorage.setItem(
          "baseVersionId",
          this.baseMetricsList[0].demand_forecast_run_log_id
        );
        localStorage.setItem(
          "adjustmentTableData",
          JSON.stringify(this.baseMetricsList)
        );
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
    async showFilteredMetricsByDuration(activeTab) {
      this.filteredActiveTab = activeTab;

      let requestedFilterOption = this.emptyFieldCleaner(this.regularFilters);

      if (this.filteredActiveTab == "Weekly") {
        requestedFilterOption["filterType"] = "week";
        this.filterWeekly = true;
      } else {
        requestedFilterOption["filterType"] = "month";
        this.filterMonthly = true;
      }

      this.filteredForecastMetrics = await this.$axios.$post(
        `/get-filtered-forecast-metrics`,
        requestedFilterOption
      );
    },
    showFilterType(type) {
      this.activeFilterType = type;
    },
    async getFilteredForecastData(requestedFilterOption) {
      requestedFilterOption["filterType"] = "week";
      this.filterMonthly = false;
      this.filterWeekly = true;
      const [weeklyforecast, filteredForecastMetrics] = await Promise.all([
        this.$axios.$post(`/get-filtered-forecast-data`, this.regularFilters),
        this.$axios.$post(
          `/get-filtered-forecast-metrics`,
          requestedFilterOption
        ),
      ]);

      this.weeklyforecast = weeklyforecast;
      this.filteredForecastMetrics = filteredForecastMetrics;
      if (this.refreshWidget) {
        this.$refs.filterWidgets.getFilteredStatsWidgetData(
          this.regularFilters
        );
      }
      this.$store.commit("toggleCTAState");
      this.refreshWidget = true;
      this.notifyVue(
        "top",
        "right",
        "Filtered Results Fetched Successfully ",
        3
      );
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
    // create manual adjustments
    async createManualAdjustment() {
      const res = await this.$axios.$post(`/create-manualadjustment`, {
        adjusted_by_user_id: parseInt(this.$auth.user.user_id),
        demand_forecast_run_log_id: parseInt(
          localStorage.getItem("baseVersionId")
        ),
        filter_level: "baseVersion",
        is_active: true,
        adjusted_metrics_name: this.adustments.metrics_name,
        adjusted_metrics_cell_date: new Date(this.adustments.weekend_date),
        before_adjustment_value: parseFloat(this.adustments.old_value),
        new_adjusted_value: parseFloat(this.adustments.new_value),
        status: "Pending",
      });
      this.baseAdjustmentsList.adjustments.unshift(res.manualAjustment);
      res.manualAjustment.status == "Pending"
        ? this.notifyVue(
            "top",
            "right",
            '"Adjustment" submitted for processing with model. Please check "Base Model Adjustments" section for updates'
          )
        : "";
      this.showDiscardBtn = false;
      this.showManualAdj = false;
      if (res.manualAjustment.status == "Punding") {
        this.showManualAdj = false;
        this.changeMABtnText = false;
        this.disbleAdjustment = true;
      } else {
        this.disbleAdjustment = false;
        this.changeMABtnText = false;
      }
    },

    // check status after every 10 sec for user scenarios
    async checkManualAdjustmentStatus() {
      // console.log(this.callToIntervalAjax)
      if (this.callToIntervalAjaxCom) {
        const adjustmentsJson = await this.$axios.$get(
          `/get-adjustment-status/${this.$auth.user.user_id}`,
          {
            progress: true,
          }
        );
        if (adjustmentsJson) {
          if (
            adjustmentsJson &&
            ["Completed", "Failed"].includes(adjustmentsJson.adjustment.status)
          ) {
            this.callToIntervalAjax = false;
            this.disbleAdjustment = false;
            this.baseAdjustmentsList.adjustments[0].status =
              adjustmentsJson.adjustment.status;
          } else {
            this.disbleAdjustment = true;
            this.callToIntervalAjax = true;
            this.baseAdjustmentsList.adjustments[0].status =
              adjustmentsJson.adjustment.status;
          }
        }
      }
    },
    resetFilter() {
      console.log("ioioio");
      this.forceRerender();
      this.$store.commit("updateRegularFilter",[]);
    },
    async appliedFilters() {
      this.notifyVue(
        "top",
        "right",
        "Fetching Filtered Results. We'll notify you here once the Filtered Results are available",
        4
      );
      this.regularFilters = {
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
      };
      console.log("this.regularFilters", this.regularFilters);
      let requestedFilterOption = this.emptyFieldCleaner(this.regularFilters);
      this.allAppliedFilters = [];
      for (let [key, value] of Object.entries(this.regularFilters)) {
        this.allAppliedFilters.push(
          key.replace("filter_", "").replace("_", " ") + ": " + value.join(", ")
        );
      }
      await this.getFilteredForecastData(requestedFilterOption);
      this.isFilteredForecast = true;
      this.filteredActiveTab = "Weekly";
      this.refreshWidget = true;
    },
    notifyVue(verticalAlign, horizontalAlign, message, type) {
      this.$notify({
        message: message,
        timeout: 12000,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[type],
      });
    },
    async getBaseAdjustments() {
      this.baseAdjustmentsList = await this.$axios.$get(
        "/get-base-adjustments",
        {
          progress: true,
        }
      );
    },
    forceRerender() {
      this.regularFiltersComponentKey += 1;
    },
  },
  computed: {
    callToIntervalAjaxCom() {
      return this.callToIntervalAjax;
    },
    disbledCom() {
      return this.disbleAdjustment;
    },
    baseAdjustmentsListCom() {
      return this.baseAdjustmentsList;
    },
    Durations() {
      return [
        { name: "Monthly", acronym: "M", icon: "tim-icons icon-single-02" },
        {
          name: "Weekly",
          acronym: "W",
          icon: "tim-icons icon-gift-2",
        },
      ];
    },
    FilteredDurations() {
      return [
        { name: "Monthly", acronym: "M", icon: "tim-icons icon-single-02" },
        {
          name: "Weekly",
          acronym: "W",
          icon: "tim-icons icon-gift-2",
        },
      ];
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
    applyCtaDisabled() {
      return this.$store.state.appliedRegularFilter.length == 0 || this.$store.state.regularFilterCTADisabled == true ? false : true;
    },
  },
  mounted() {
    this.getBaseAdjustments();
    this.showMetricsByDuration("Weekly");
    setInterval(() => {
      this.checkManualAdjustmentStatus();
    }, 10000);
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  h4 {
    margin: 0;
  }

  .forecast-filter-buttons {
    display: flex;

    .btn-custom-div {
      position: absolute;
      right: 0;
      padding: 0 15px;
    }
  }

  .applied-filter-container {
    text-transform: capitalize;
    h4 {
      margin-bottom: 4px;
    }
  }
}
</style>
