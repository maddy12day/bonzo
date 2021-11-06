<template>
  <div :key="reRender">
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
      <div class="applied-filter-container" v-if="selectedFilters.length > 0">
        <br />
        <h4 class="text-bold font-weight-bold">Selected Filters</h4>
        <Tags :allAppliedFilters="selectedFilters" />
      </div>
    </card>
    <!-- Applied filters pills (Vishal) -->

    <!-- Base Year/Quarter Stats / Filtered Year/Quarter Stats (Vishal) -->
    <StatsWidget
      v-if="!isFilteredForecast"
      @getSelectedYear="getSelectedYear"
    />
    <FilteredStatsWidget
      :filterPayload="filterPayload"
      ref="filterWidgets"
      v-if="isFilteredForecast"
      :allAppliedFilters="allAppliedFilters"
      :key="filteredStatsComponentKey"
      @getSelectedYear="getSelectedFilteredYear"
    />
    <ChartWidget v-if="!isFilteredForecast" ref="chartWidget" />
    <FilteredChartWidget
      ref="filteredChartWidget"
      v-if="isFilteredForecast"
      :requestedFilterOption="requestedFilterOption"
      :key="filterChartComponentKey"
    />

    <!-- Adjustments Table -->
    <AdjustmentTable
      v-if="[...baseAdjustmentsListCom.adjustmentsResponse].length > 0"
      class="mt-4"
      tableHeading="Base Model Adjustments"
      :adjustmentTableData="baseAdjustmentsListCom.adjustmentsResponse"
    />

    <card card-body-classes="table-full-width" v-if="!isFilteredForecast">
      <div class="row mt-1">
        <div class="col-md-2 text-right offset-md-10">
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
      </div>

      <ManualAdjustmentTable
        v-if="activeTab == 'Weekly' && showManualAdj"
        :metricsTableData="baseMetricsListCom"
        tableHeading="Edit Forecast Metrics"
        @EvtAdjValues="getAdjustedValues"
      />

      <client-only>
        <WeeklyMetricsTable
          v-if="activeTab == 'Weekly' && !showManualAdj"
          :metricsTableData="baseMetricsListCom"
          tableHeading="Base Weekly Forecast Metrics"
        />
      </client-only>

      <MonthlyMetricsTable
        v-if="activeTab == 'Monthly'"
        :metricsTableData="baseMetricsListCom"
        tableHeading="Base Monthly Forecast Metrics"
      />
      <div class="col-md-12 text-right" v-if="!isSystemLocked">
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
          @click="() => createManualAdjustment('base')"
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
      <div class="row mt-1">
        <div class="col-md-2 text-right offset-md-10">
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
      </div>

      <FilteredWeeklyMetricsTable
        :key="filterMetricsCompKey"
        v-if="
          filteredActiveTab == 'Weekly' && !showManualAdj && !showDiscardBtn
        "
        :filteredForecastMetrics="filteredForecastMetrics"
        tableHeading="Filtered Weekly Forecast Metrics"
        :allAppliedFilters="allAppliedFilters"
        :filterArray="filterArray"
      />
      <client-only>
        <FilterWeeklyManualAdjustment
          v-if="
            filteredActiveTab == 'Weekly' && showManualAdj && showDiscardBtn
          "
          :filteredForecastMetrics="filteredForecastMetrics"
          tableHeading="Filtered Weekly Forecast Metrics"
          :allAppliedFilters="allAppliedFilters"
          :filterArray="filterArray"
          @EvtAdjValues="getAdjustedValues"
        />
      </client-only>
      <FilteredMonthlyMetricsTable
        v-if="filteredActiveTab == 'Monthly'"
        :filteredForecastMetrics="filteredForecastMetrics"
        tableHeading="Filtered Monthly Forecast Metrics"
        :allAppliedFilters="allAppliedFilters"
        :filterArray="filterArray"
      />
      <!-- v-if="!isSystemLocked" -->
      <div class="col-md-12 text-right">
        <button
          :class="
            `btn btn-primary btn-sm text-left ${
              disbledCom || showManualAdj ? 'disabled' : ''
            }`
          "
          @click="switchToManualAdj"
          :disabled="disbledCom || showManualAdj"
          v-if="!changeMABtnText && filteredActiveTab == 'Weekly'"
        >
          Manual Adjustment
        </button>
        <button
          :class="
            `btn btn-primary btn-sm text-left ${disbledCom ? 'disabled' : ''}`
          "
          @click="() => createManualAdjustment('base')"
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
    <!--  <ComparisonTable
      :tableData="comparisonCollnData"
      v-if="!isFilteredForecast"
    /> -->
    <div class="row sku-component">
      <div class="col-md-2">
        <h4 class="font-weight-bold" v-if="isFilteredForecast">
          Top {{ topSKUsCountLable }} SKUs Forecast
        </h4>
      </div>
      <div class="col-md-3">
        <a>
          <button
            v-if="isFilteredForecast"
            class="mt-1 btn btn-sm"
            style="line-height: 1"
            @click="exportToExcel"
            :disabled="isDownloadCsvDisbled"
          >
            Download Excel
          </button>
        </a>
      </div>
      <template>
        <el-select
          v-if="isFilteredForecast"
          v-model="topSkusLimit"
          placeholder="Select"
          @change="setUpdatedSKUsLimit"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
    </div>
    <ForecastBySkuTable
      v-if="isFilteredForecast"
      ref="filterChartWidget"
      :tableHeading="'Revenue'"
      :forecast_attribute="'retail_sales'"
      :topSkusData="topSkusData"
      :allAppliedFilters="allAppliedFilters"
      @descardChanges="descardFilterChanges"
      @getAdjustmentChanges="getFilterAdjustmentValues"
      @createFilterAdjustment="createManualAdjustment('sku')"
    />
    <ForecastBySkuTable
      v-if="isFilteredForecast"
      ref="filterChartWidget"
      :tableHeading="'Units Sales'"
      :forecast_attribute="'units_sales'"
      :topSkusData="topSkusData"
      :allAppliedFilters="allAppliedFilters"
      @descardChanges="descardFilterChanges"
      @getAdjustmentChanges="getFilterAdjustmentValues"
      @createFilterAdjustment="createManualAdjustment('sku')"
    />
    <ForecastBySkuTable
      ref="filterChartWidget"
      v-if="isFilteredForecast"
      :tableHeading="'AUR'"
      :forecast_attribute="'aur'"
      :topSkusData="topSkusData"
      :allAppliedFilters="allAppliedFilters"
      @descardChanges="descardFilterChanges"
      @getAdjustmentChanges="getFilterAdjustmentValues"
      @createFilterAdjustment="createManualAdjustment('sku')"
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
import { Select, Option } from "element-ui";
import ChartWidget from "../components/ChartWidget.vue";
import FilteredChartWidget from "../components/FilterChartWidget.vue";
import moment from "moment";
import XLSX from "xlsx";
import ComparisonTable from "../components/ComparisionTables/ComparisonTable.vue";
import Timeline from "../components/Timeline/Timeline.vue";
import FilterWeeklyManualAdjustment from "../components/Metrics/FilterWeeklyManualAdjustment.vue";

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
    FilterWeeklyManualAdjustment,
    Card,
    Timeline,
    FilteredWeeklyMetricsTable,
    FilteredMonthlyMetricsTable,
    FilteredStatsWidget,
    FilteredChartWidget,
    Tags,
    ChartWidget,
    [Select.name]: Select,
    [Option.name]: Option,
    ComparisonTable,
  },

  data() {
    return {
      options: [
        {
          value: "top_10",
          label: "Top 10",
          limit: 10,
        },
        {
          value: "top_25",
          label: "Top 25",
          limit: 25,
        },
        {
          value: "top_50",
          label: "Top 50",
          limit: 50,
        },
      ],
      topSkusLimit: "top_10",
      topSKUsCountLable: 10,
      isFilteredForecast: false,
      isFilteredPageDataLoading: false,
      isFilteredWeeklyMetricsLoaded: false,
      isFilteredStatsLoaded: false,
      isTopSkuDataLoaded: false,
      activeFilterType: "Regular",
      activeTab: "Monthly",
      filteredActiveTab: "Monthly",
      baseAdjustmentsList: [],
      baseMetricsList: [],
      topSkusData: [],
      topLimitedSkuData: [],
      showManualAdj: false,
      changeMABtnText: false,
      disbleAdjustment: false,
      callToIntervalAjax: true,
      requestedFilterOption: {},
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
      filterChartComponentKey: Math.random(),
      selectedFilterOptions: [],
      skusJsonData: [],
      isDownloadCsvDisbled: true,
      filterMetricsCompKey: Math.random(),
      forecastedYear: "2021",
      filteredForecastedYear: "2021",
      filterArray: [],
      oldFilterMetricsData: [],
      csvFileName: `Filtered SKUs - ${moment().format(
        "YYYY-MM-DD HH:MM:SS"
      )}.xlsx`,
      comparisonCollnData: [],
      filteredQuerySetterData: {},
      skuLevelAdjustmentObj: [],
    };
  },

  methods: {
    descardFilterChanges() {
      console.log("descard changes are working");
    },
    getFilterAdjustmentValues(data) {
      this.skuLevelAdjustmentObj.push(data);
      console.log("adjustment data", data);
      console.log(this.skuLevelAdjustmentObj);
    },
    setUpdatedSKUsLimit() {
      let selectedOption = this.options.filter(
        (o) => o.value == this.topSkusLimit
      );
      this.topSKUsCountLable = selectedOption[0].limit;

      let topLimitedSkuData = {};
      topLimitedSkuData["parsedWeeklyData"] = [];
      for (let i = 0; i < this.topSKUsCountLable; i++) {
        if (this.topLimitedSkuData.parsedWeeklyData[i]) {
          topLimitedSkuData["parsedWeeklyData"].push(
            this.topLimitedSkuData.parsedWeeklyData[i]
          );
        }
      }
      this.topSkusData = topLimitedSkuData;
    },
    async comparisonTableDataGenerator() {
      const collectionForecast = await this.$axios(
        `/collection-forecast/${this.forecastedYear}`
      );
      const collectionForecastByEcomm = await this.$axios(
        `/collection-forecast-by-ecomm/${this.forecastedYear}`
      );
      const collectionForecastByRetail = await this.$axios(
        `/collection-forecast-by-retail/${this.forecastedYear}`
      );
      this.comparisonCollnData = [];
      for (let collection of collectionForecast.data.collections) {
        for (let ecolln of collectionForecastByEcomm.data.collections) {
          for (let rcolln of collectionForecastByRetail.data.collections) {
            if (
              collection.collection == ecolln.collection &&
              collection.collection == rcolln.collection
            ) {
              this.comparisonCollnData.push({
                total: {
                  ...collection,
                },
                ecomm: {
                  ...ecolln,
                },
                retail: {
                  ...rcolln,
                },
              });
            }
          }
        }
      }
    },
    exportToExcel() {
      let filterPayload = XLSX.utils.json_to_sheet(this.filterArray);
      let skus = XLSX.utils.json_to_sheet(this.skusJsonData);
      let wb = XLSX.utils.book_new(); // make Workbook of Excel
      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, filterPayload, "Applied Filters"); // sheetAName is name of Worksheet
      XLSX.utils.book_append_sheet(wb, skus, "SKUs");
      // export Excel file
      XLSX.writeFile(wb, this.csvFileName); // name of the file is 'book.xlsx'
    },
    getSelectedYear(value) {
      this.forecastedYear = value;
      this.showMetricsByDuration(this.activeTab);
      this.getWeekendDates(value);
      this.$refs.chartWidget.chartInit(value);
      this.comparisonTableDataGenerator();
    },
    getSelectedFilteredYear(value) {
      this.filteredForecastedYear = value;

      this.$refs.filteredChartWidget.initChart(value);
      this.$refs.filterChartWidget.getFilteredForecastData(value);
      this.showFilteredMetricsByDuration(this.filteredActiveTab);
      this.getFilteredTopSkus();
      this.getFilteredWeeklyMetrics(this.requestedFilterOption);
      this.getWeekendDates(value);
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
      this.brandValues = values;
      this.getSelectedFilters();
    },
    getChannelValues(values) {
      this.channelValues = values;
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
      this.scenarioTypeValue = values.id;
      this.getSelectedFilters();
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
      selectedFilter = this.emptyFieldCleaner(selectedFilter);
      this.selectedFilterOptions = [];
      for (let [key, value] of Object.entries(selectedFilter)) {
        this.selectedFilterOptions.push(
          key.replace("filter_", "").replace("_", " ") + ": " + value.join(", ")
        );
      }
    },
    // manual adjustments
    discardChanges() {
      this.showManualAdj = false;
      this.showDiscardBtn = false;
      this.changeMABtnText = false;
      this.filteredForecastMetrics = JSON.parse(
        localStorage.getItem("filterMetricsOldTableData")
      );
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
          `/base-weekly-metrics/${this.forecastedYear}`,
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
          `/base-monthly-metrics/${this.forecastedYear}`,
          {
            progress: true,
          }
        );
        this.baseMetricsList = JSON.parse(
          baseMonthlyMetricsListString.baseMonthlyMetrics
        );
        localStorage.setItem(
          "baseVersionId",
          this.baseMetricsList[0].demand_forecast_run_log_id
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
      this.filteredForecastMetrics = [];
      const result = await this.$axios.$post(
        `/get-filtered-forecast-metrics/${this.filteredForecastedYear}`,
        requestedFilterOption
      );
      this.filteredForecastMetrics = result;
      localStorage.setItem("filterMetricsOldTableData", JSON.stringify(result));
    },
    showFilterType(type) {
      this.activeFilterType = type;
      this.$store.commit("updateRegularFilter", []);
      this.resetFilterPayloadOptions();
      this.selectedFilterOptions = [];
    },
    async getFilteredWeeklyMetrics(requestedFilterOption) {
      requestedFilterOption["filterType"] = "month";
      this.requestedFilterOption = requestedFilterOption;
      const filteredWeeklyforecast = await this.$axios.$post(
        `/get-filtered-forecast-metrics/${this.filteredForecastedYear}`,
        requestedFilterOption
      );
      this.filteredForecastMetrics = filteredWeeklyforecast;
    },
    // retail weeekends
    async getWeekendDates(value) {
      const weekendDates = await this.$axios.$get(
        `/get-weekend-dates/${value}`
      );
      window.localStorage.setItem(
        "allUsersInfo",
        JSON.stringify(this.userInfo)
      );

      localStorage.setItem(
        "weekendDates",
        JSON.stringify(weekendDates.weekends)
      );
    },
    async getFilteredTopSkus() {
      this.skusJsonData = [];
      this.isDownloadCsvDisbled = true;
      const topSkusData = await this.$axios.$post(
        `/get-filtered-forecast-data/${this.filteredForecastedYear}`,
        this.filterPayload
      );
      localStorage.setItem(
        "topSkuLevelData",
        JSON.stringify(topSkusData.parsedWeeklyData)
      );
      let topLimitedSkuData = {};
      topLimitedSkuData["parsedWeeklyData"] = [];
      for (let i = 0; i < this.topSKUsCountLable; i++) {
        if (topSkusData.parsedWeeklyData[i]) {
          topLimitedSkuData["parsedWeeklyData"].push(
            topSkusData.parsedWeeklyData[i]
          );
        }
      }
      this.topSkusData = topLimitedSkuData;
      this.topLimitedSkuData = topSkusData;
      const csvJsonData = await this.$axios.$post(
        `/download-all-skus-data-by-month/${this.filteredForecastedYear}`,
        this.filterPayload
      );
      this.skusJsonData = csvJsonData.parsedWeeklyData;
      this.isDownloadCsvDisbled = false;
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
    async createManualAdjustment(level) {
      let filterObject = {
        filter_product_sources:
          this.productSourceValues && this.productSourceValues.length > 0
            ? this.productSourceValues.join(",")
            : null,
        filter_brand_types:
          this.brandTypeValues && this.brandTypeValues > 0
            ? this.brandTypeValues.join(",")
            : null,
        filter_life_cycles:
          this.lifeCycleValues && this.lifeCycleValues.length > 0
            ? this.lifeCycleValues.join(",")
            : null,
        filter_newness:
          this.newNessValues && this.newNessValues.length > 0
            ? this.newNessValues.join(",")
            : null,
        filter_brands:
          this.brandValues && this.brandValues.length > 0
            ? this.brandValues.join(",")
            : null,
        filter_channels:
          this.channelValues && this.channelValues.length > 0
            ? this.channelValues.join(",")
            : null,
        filter_sub_channels:
          this.subChannelsValues && this.subChannelsValues.length > 0
            ? this.subChannelsValues.join(",")
            : null,
        filter_categories:
          this.categoriesValues && this.categoriesValues.length > 0
            ? this.categoriesValues.join(",")
            : null,
        filter_collections:
          this.collectionValues && this.collectionValues.length > 0
            ? this.collectionValues.join(",")
            : null,
        filter_skus:
          this.skuValues && this.skuValues.length > 0
            ? this.skuValues.join(",")
            : null,
        filter_classes:
          this.classesValues && this.classesValues.length > 0
            ? this.classesValues.join(",")
            : null,
        filter_sub_classes:
          this.subClassesValues && this.subClassesValues.length > 0
            ? this.subClassesValues.join(",")
            : null,
        filter_programs:
          this.programValues && this.programValues.length > 0
            ? this.programValues.join(",")
            : null,
      };
      let res;
      if (level == "sku") {
        console.log({
          adjusted_by_user_id: parseInt(this.$auth.user.user_id),
          demand_forecast_run_log_id: parseInt(
            localStorage.getItem("baseVersionId")
          ),
          filter_level: "baseVersion",
          is_active: false,
          ...filterObject,
          filterSkuObject: this.skuLevelAdjustmentObj,
        });
        this.skuLevelAdjustmentObj = [];
        /*         res = await this.$axios.$post(`/create-manualadjustment`, {
          adjusted_by_user_id: parseInt(this.$auth.user.user_id),
          demand_forecast_run_log_id: parseInt(
            localStorage.getItem("baseVersionId")
          ),
          filter_level: "baseVersion",
          is_active: false,
          ...filterObject,
          filterSkuObject: this.skuLevelAdjustmentObj
        }); */
      } else {
        res = await this.$axios.$post(`/create-manualadjustment`, {
          adjusted_by_user_id: parseInt(this.$auth.user.user_id),
          demand_forecast_run_log_id: parseInt(
            localStorage.getItem("baseVersionId")
          ),
          filter_level: "baseVersion",
          is_active: false,
          adjusted_metrics_name: this.adustments.metrics_name,
          adjusted_metrics_cell_date: new Date(this.adustments.weekend_date),
          before_adjustment_value: Number(this.adustments.old_value),
          new_adjusted_value: Number(this.adustments.new_value),
          status: "Pending",
          ...filterObject,
        });
      }
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
      filterObject = {};
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
              ["Completed", "Failed", "Error", "Deprecated"].includes(
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
      this.selectedFilterOptions = [];
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

      this.filterArray = [];
      for (let [key, value] of Object.entries(this.filterPayload)) {
        let jsonKey = `${key
          .replace("filter_", "")
          .replace("_", " ")
          .toLowerCase()
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")}`;
        this.filterArray.push({
          "Filter Name": jsonKey,
          "Filter Value": value.join(","),
        });
      }

      this.requestedFilterOption = requestedFilterOption;

      delete this.requestedFilterOption["filterType"];
      // await this.getFilteredForecastData(requestedFilterOption);

      await this.setFilteredSKUsAndWhereQuery();
      this.isFilteredForecast = true;
      this.filteredStatsComponentKey += 1;
      this.filterChartComponentKey += 1;
      this.getFilteredTopSkus();
      await this.getFilteredWeeklyMetrics(requestedFilterOption);
      this.isFilteredPageDataLoading = false;
      this.$store.commit("toggleCTAState");
      this.$store.commit("toggleProgramFilterCTAState");
      // this.filteredStatsComponentKey += 1;
    },
    async setFilteredSKUsAndWhereQuery() {
      this.filteredQuerySetterData = await this.$axios.$post(
        `/set-filtered-sku-and-where-query`,
        this.filterPayload
      );
      this.filterPayload.filteredQuerySetterData = this.filteredQuerySetterData;
      // console.log("this.filterPayload00=--",this.filterPayload);
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
      this.filterChartComponentKey += 1;
    },
  },
  computed: {
    isSystemLocked() {
      return this.$store.state.isSystemLocked;
    },
    getTopSkusCount() {
      return this.topSKUsCountLable;
    },
    reRender() {
      this.getBaseAdjustments();
      this.showMetricsByDuration(this.activeTab);
      return this.$store.state.key;
    },
    selectedFilters() {
      return this.selectedFilterOptions;
    },
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
    this.showMetricsByDuration("Monthly");
    /*  this.comparisonTableDataGenerator(); */
    setInterval(() => {
      this.checkManualAdjustmentStatus();
    }, 10000);
  },
};
</script>

<style lang="scss">
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
.sku-component {
  position: relative;
  margin-right: 0;
  .el-select {
    position: absolute;
    right: 0;

    .el-input:hover .el-input__icon,
    .el-input:hover input {
      color: black;
    }
  }
}
</style>
