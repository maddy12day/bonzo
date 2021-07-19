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
        <div
          class="btn-custom-div"
          v-if="
            !isFilteredPageDataLoading &&
              showRegularResetFilter &&
              activeFilterType == 'Regular'
          "
          @click="resetFilter"
        >
          <label class="btn btn-sm btn-dark btn-simple btn-custom">
            <span class="d-none d-sm-block">Reset Filters</span>
          </label>
        </div>
        <div
          class="btn-custom-div"
          v-if="
            !isFilteredPageDataLoading &&
              showProgramResetFilter &&
              activeFilterType == 'Program'
          "
          @click="resetFilter"
        >
          <label class="btn btn-sm btn-dark btn-simple btn-custom">
            <span class="d-none d-sm-block">Reset Filters</span>
          </label>
        </div>
        <div v-if="isFilteredPageDataLoading" class="btn-custom-div">
          <i class="display-4 el-icon-loading"></i>
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
        @appliedFilters="appliedFilters"
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
        :key="programFiltersComponentKey"
      />

      <div class="applied-filter-container" v-if="allAppliedFilters.length > 0">
        <br />
        <h4 class="text-bold font-weight-bold">Applied Filters</h4>
        <Tags :allAppliedFilters="allAppliedFilters" />
      </div>
    </card>
    <!-- Applied filters pills (Vishal) -->

    <!-- Base Year/Quarter Stats / Filtered Year/Quarter Stats (Vishal) -->
    <StatsWidget v-if="!isFilteredForecast" />
    <FilteredStatsWidget
      :filterPayload="filterPayload"
      ref="filterWidgets"
      v-if="isFilteredForecast"
      :allAppliedFilters="allAppliedFilters"
      :key="filteredStatsComponentKey"
    />

    <!-- Adjustments Table -->
    <AdjustmentTable
      v-if="[...baseAdjustmentsListCom.adjustmentsResponse].length > 0"
      class="mt-4"
      tableHeading="Base Model Adjustments"
      :adjustmentTableData="baseAdjustmentsListCom.adjustmentsResponse"
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
        :metricsTableData="baseMetricsListCom"
        tableHeading="Edit Forecast Metrics"
        @EvtAdjValues="getAdjustedValues"
      />
      <WeeklyMetricsTable
        v-if="activeTab == 'Weekly' && !showManualAdj"
        :metricsTableData="baseMetricsListCom"
        tableHeading="Base Weekly Forecast Metrics"
      />
      <MonthlyMetricsTable
        v-if="activeTab == 'Monthly'"
        :metricsTableData="baseMetricsListCom"
        tableHeading="Base Monthly Forecast Metrics"
      />
      <div class="col-md-12 text-right">
        <button
          :class="
            `btn btn-primary btn-sm text-left ${
              disbledCom || showManualAdj ? 'disabled' : ''
            }`
          "
          @click="switchToManualAdj"
          :disabled="disbledCom || showManualAdj"
          v-if="!changeMABtnText && activeTab == 'Weekly'"
        >
          Manual Adjustment
        </button>
        <button
          :class="
            `btn btn-primary btn-sm text-left ${disbledCom ? 'disabled' : ''}`
          "
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

    <!-- <div v-if="isFilteredForecast"> -->
    <card card-body-classes="table-full-width" v-if="isFilteredForecast">
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

    <h4 class="font-weight-bold" v-if="isFilteredForecast">
      Top 10 SKUs Forecast
    </h4>
    <download-csv
      @click="downloadAllSkusData"
      class="btn btn-default"
      :data="skusJsonData"
      name="data.csv"
    >
      Download CSV
    </download-csv>
    <ForecastBySkuTable
      v-if="isFilteredForecast"
      :tableHeading="'Revenue'"
      :forecast_attribute="'retail_sales'"
      :topTenSkusData="topTenSkusData"
    />
    <ForecastBySkuTable
      v-if="isFilteredForecast"
      :tableHeading="'Units Sales'"
      :forecast_attribute="'units_sales'"
      :topTenSkusData="topTenSkusData"
    />
    <ForecastBySkuTable
      v-if="isFilteredForecast"
      :tableHeading="'AUR'"
      :forecast_attribute="'aur'"
      :topTenSkusData="topTenSkusData"
    />
    <!-- </div> -->
  </div>
</template>

<script>
import RegularFilters from "../components/Filters/RegularFilter.vue";
import ProgramFilters from "../components/Filters/ProgramFilter.vue";
import StatsWidget from "../components/StatsWidget.vue";
import AdjustmentTable from "../components/Adjustments/AdjustmentTable.vue";
import ForecastBySkuTable from "../components/Forecast/ForecastBySkuTable.vue";
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
    ForecastBySkuTable,
    Card,
    FilteredWeeklyMetricsTable,
    FilteredMonthlyMetricsTable,
    FilteredStatsWidget,
    Tags,
  },

  data() {
    return {
      isFilteredForecast: false,
      isFilteredPageDataLoading: false,
      isFilteredWeeklyMetricsLoaded: false,
      isFilteredStatsLoaded: false,
      isTopSkuDataLoaded: false,
      activeFilterType: "Regular",
      activeTab: "Weekly",
      filteredActiveTab: "Weekly",
      baseAdjustmentsList: [],
      baseMetricsList: [],
      topTenSkusData: [],
      showManualAdj: false,
      changeMABtnText: false,
      disbleAdjustment: false,
      callToIntervalAjax: true,
      adustments: {},
      type: ["", "info", "success", "warning", "danger"],
      filteredForecastMetrics: [],
      filterMonthly: false,
      filterWeekly: false,
      filterPayload: {},
      filteredStatsWidgetData: {},
      showDiscardBtn: false,
      refreshWidget: false,
      allAppliedFilters: [],
      regularFiltersComponentKey: Math.random(),
      filteredStatsComponentKey: Math.random(),
      programFiltersComponentKey: Math.random(),
      skusJsonData: [],
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

      let requestedFilterOption = this.emptyFieldCleaner(this.filterPayload);

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
      this.$store.commit("updateRegularFilter", []);
      this.resetFilterPayloadOptions();
    },
    async getFilteredWeeklyMetrics(requestedFilterOption) {
      requestedFilterOption["filterType"] = "week";

      const filteredWeeklyforecast = await this.$axios.$post(
        `/get-filtered-forecast-metrics`,
        requestedFilterOption
      );
      this.filteredForecastMetrics = filteredWeeklyforecast;
    },
    async getFilteredTopSkus() {
      const topTenSkusData = await this.$axios.$post(
        `/get-filtered-forecast-data`,
        this.filterPayload
      );
      this.topTenSkusData = topTenSkusData;
      const csvJsonData = await this.$axios.$post(
        "/download-all-skus-data",
        this.filterPayload
      );
      this.skusJsonData = csvJsonData.parsedWeeklyData/* .map(item => {
        return {
          sku: item.sku,
          title: item.title,
          units: Object.assign({}, item.data.map(skuDetail => skuDetail.units_sales))
        }
      }); */
      console.log(this.skusJsonData);
    },
    async downloadAllSkusData() {},

    // async getFilteredForecastData(requestedFilterOption) {
    //   requestedFilterOption["filterType"] = "week";
    //   this.filterMonthly = false;
    //   this.filterWeekly = true;
    //   this.$store.commit("updateLoadingstate", true);
    //   const [weeklyforecast, filteredForecastMetrics] = await Promise.all([
    //     this.$axios.$post(`/get-filtered-forecast-data`, this.regularFilters),
    //     this.$axios.$post(
    //       `/get-filtered-forecast-metrics`,
    //       requestedFilterOption
    //     ),
    //   ]);

    //   this.weeklyforecast = weeklyforecast;
    //   this.filteredForecastMetrics = filteredForecastMetrics;

    //   this.$store.commit("toggleCTAState");
    //   this.$store.commit("toggleProgramFilterCTAState");
    //   this.$store.commit("updateLoadingstate", false);
    // },
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
      // for (let key in reqBody) {

      //   if (reqBody[key] == null || reqBody[key] == undefined) {
      //     delete reqBody[key];
      //     console.log("reqBody,", reqBody);
      //   }
      // }
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
        is_active: false,
        adjusted_metrics_name: this.adustments.metrics_name,
        adjusted_metrics_cell_date: new Date(this.adustments.weekend_date),
        before_adjustment_value: parseFloat(this.adustments.old_value),
        new_adjusted_value: parseFloat(this.adustments.new_value),
        status: "Pending",
      });
      this.baseAdjustmentsList.adjustmentsResponse.unshift(res.manualAjustment);
      this.baseMetricsList = JSON.parse(
        localStorage.getItem("adjustmentTableData")
      );
      res.manualAjustment.status == "Pending"
        ? this.notifyVue(
            "top",
            "right",
            '"Adjustment" submitted for processing with model. Please check "Base Model Adjustments" section for updates'
          )
        : "";
      this.showDiscardBtn = false;
      this.showManualAdj = false;
      this.callToIntervalAjax = true;
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
      if (this.callToIntervalAjaxCom) {
        const adjustmentsJson = await this.$axios.$get(
          `/get-adjustment-status/${this.$auth.user.user_id}`,
          {
            progress: true,
          }
        );
        if (adjustmentsJson) {
          if (adjustmentsJson.adjustment) {
            if (
              adjustmentsJson &&
              ["Completed", "Failed", "Error"].includes(
                adjustmentsJson.adjustment.status
              )
            ) {
              this.callToIntervalAjax = false;
              this.disbleAdjustment = false;
              if (
                this.baseAdjustmentsList &&
                this.baseAdjustmentsList.adjustmentsResponse[0]
              ) {
                this.baseAdjustmentsList.adjustmentsResponse[0].status =
                  adjustmentsJson.adjustment.status;
              }
            } else {
              this.disbleAdjustment = true;
              this.callToIntervalAjax = true;
              if (
                this.baseAdjustmentsList &&
                this.baseAdjustmentsList.adjustmentsResponse[0]
              ) {
                this.baseAdjustmentsList.adjustmentsResponse[0].status =
                  adjustmentsJson.adjustment.status;
              }
            }
          }
        }
      }
    },
    resetFilter() {
      this.forceRerender();
      this.isFilteredForecast = false;
      this.$store.commit("updateRegularFilter", []);
      this.allAppliedFilters = [];
      this.resetFilterPayloadOptions();
    },
    resetFilterPayloadOptions() {
      this.productSourceValues = [];
      this.brandTypeValues = [];
      this.lifeCycleValues = [];
      this.newNessValues = [];
      this.brandValues = [];
      this.channelValues = [];
      this.subChannelsValues = [];
      this.categoriesValues = [];
      this.collectionValues = [];
      this.skuValues = [];
      this.filter_classes = [];
      this.filter_sub_classes = [];
      this.filter_programs = [];
    },
    async appliedFilters() {
      this.isFilteredForecast = true;
      this.isFilteredPageDataLoading = true;
      this.filterPayload = {
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
      // this.resetFilterPayloadOptions();
      let requestedFilterOption = this.emptyFieldCleaner(this.filterPayload);
      this.allAppliedFilters = [];
      for (let [key, value] of Object.entries(this.filterPayload)) {
        this.allAppliedFilters.push(
          key.replace("filter_", "").replace("_", " ") + ": " + value.join(", ")
        );
      }
      // await this.getFilteredForecastData(requestedFilterOption);
      this.filteredStatsComponentKey += 1;
      this.getFilteredTopSkus();
      await this.getFilteredWeeklyMetrics(requestedFilterOption);
      this.isFilteredPageDataLoading = false;
      this.$store.commit("toggleCTAState");
      this.$store.commit("toggleProgramFilterCTAState");
      // this.filteredStatsComponentKey += 1;
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
      this.baseAdjustmentsList.adjustments = this.baseAdjustmentsList
        .adjustments
        ? this.baseAdjustmentsList.adjustments
        : [];
    },
    forceRerender() {
      this.regularFiltersComponentKey += 1;
      this.filteredStatsComponentKey += 1;
      this.programFiltersComponentKey += 1;
    },
  },
  computed: {
    baseMetricsListCom() {
      return this.baseMetricsList;
    },
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
    showRegularResetFilter() {
      return this.$store.state.appliedRegularFilter.length > 0 ? true : false;
    },
    showProgramResetFilter() {
      return this.$store.state.appliedRegularFilter.length > 0 ? true : false;
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
