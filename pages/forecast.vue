<template>
  <div>
    <!-- Filters component (Vishal) -->
    <card card-body-classes="table-full-width">
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
      />
    </card>
    <!-- Applied filters pills (Vishal) -->

    <!-- Base Year/Quarter Stats / Filtered Year/Quarter Stats (Vishal) -->
    <StatsWidget />

    <!-- Base Metrics / Filtered Metrics (Jubin) -->
    <!-- Filter: Revenue table (Jubin) -->
    <!-- Filter: Units table (Jubin) -->
    <!-- Filter: AUR table (Jubin) -->

    <card card-body-classes="table-full-width">
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
            <span class="d-block d-sm-none">
              <i :class="option.icon"></i>
            </span>
          </label>
        </div>
      </div>
      <WeeklyMetricsTable
        v-if="activeTab == 'Weekly'"
        :metricsTableData="baseMetricsList"
        tableHeading="Weekly Forecast Metrics"
      />
      <MonthlyMetricsTable
        v-if="activeTab == 'Monthly'"
        :metricsTableData="baseMetricsList"
        tableHeading="Monthly Forecast Metrics"
      />
    </card>

    <h4 v-if="isFilteredForecast" class="font-weight-bold">
      Top 10 SKUs Forecast
    </h4>
    <WeeklyForecast
      v-if="isFilteredForecast"
      :tableHeading="'Revenue'"
      :forecast_attribute="'retail_sales'"
      :weeklyforecast="weeklyforecast"
    />
    <WeeklyForecast
      v-if="isFilteredForecast"
      :tableHeading="'Units Sales'"
      :forecast_attribute="'units_sales'"
      :weeklyforecast="weeklyforecast"
    />
    <WeeklyForecast
      v-if="isFilteredForecast"
      :tableHeading="'AUR'"
      :forecast_attribute="'aur'"
      :weeklyforecast="weeklyforecast"
    />
  </div>
</template>

<script>
import RegularFilters from "../components/Filters/RegularFilter.vue";
import ProgramFilters from "../components/Filters/ProgramFilter.vue";
import StatsWidget from "../components/StatsWidget.vue";
import WeeklyForecast from "../components/Forecast/ForecastBySkuTable.vue";
import Card from "~/components/Cards/Card.vue";
import WeeklyMetricsTable from "../components/Metrics/WeeklyMetricsTable.vue";
import MonthlyMetricsTable from "../components/Metrics/MonthlyMetricsTable.vue";

export default {
  name: "Forecast",
  components: {
    MonthlyMetricsTable,
    WeeklyMetricsTable,
    StatsWidget,
    RegularFilters,
    ProgramFilters,
    WeeklyForecast,
    Card,
  },

  data() {
    return {
      activeFilterType: "Regular",
      isFilteredForecast: false,
      activeTab: "Weekly",
      baseMetricsList: [],
      weeklyforecast: [],
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
    },
    getScenarioType(values) {
      this.scenarioTypeValue = values.id;
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
    showFilterType(type) {
      this.activeFilterType = type;
    },
    async getFilteredForecastData(requestedFilterOption) {
      this.weeklyforecast = await this.$axios.$post(
        `/get-filtered-forecast-data`,
        requestedFilterOption
      );
      // this.forecastData = data;
      // this.loadFilteredData = true;
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
    async appliedFilters() {
      const regularFilters = {
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
      let requestedFilterOption = this.emptyFieldCleaner(regularFilters);
      await this.getFilteredForecastData(requestedFilterOption);
      this.isFilteredForecast = true;
    },
  },
  computed: {
    Durations() {
      return [
        { name: "Monthly", icon: "tim-icons icon-single-02" },
        {
          name: "Weekly",
          icon: "tim-icons icon-gift-2",
        },
      ];
    },
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
  mounted() {
    this.showMetricsByDuration("Weekly");
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  h4 {
    margin: 0;
  }
}
</style>
