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
              <span class="d-block d-sm-none">
                <i :class="option.icon"></i>
              </span>
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
      <h4 class="font-weight-bold">
        Top 10 SKUs Forecast
      </h4>
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
import WeeklyForecast from "../components/Forecast/ForecastBySkuTable.vue";
import Card from "~/components/Cards/Card.vue";
import WeeklyMetricsTable from "../components/Metrics/WeeklyMetricsTable.vue";
import MonthlyMetricsTable from "../components/Metrics/MonthlyMetricsTable.vue";
import FilteredMonthlyMetricsTable from "../components/Metrics/FilteredMonthlyMetricsTable.vue";
import FilteredWeeklyMetricsTable from "../components/Metrics/FilteredWeeklyMetricsTable.vue";

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
    FilteredWeeklyMetricsTable,
    FilteredMonthlyMetricsTable,
  },

  data() {
    return {
      activeFilterType: "Regular",
      isFilteredForecast: false,
      activeTab: "Weekly",
      filteredActiveTab: "Weekly",
      baseMetricsList: [],
      weeklyforecast: [],
      filteredForecastMetrics: [],
      filterMonthly: false,
      filterWeekly: false,
      regularFilters: {},
      testData: {
        parsedFilteredForecastData: [
          {
            "Metrics Name": "Sales",
            w1: 3279997,
            w2: 2489288,
            w3: 2897922,
            w4: 2922264,
            w5: 1949532,
            w6: 2299103,
            w7: 2295182,
            w8: 2125125,
            w9: 2302427,
            w10: 2837483,
            w11: 2128012,
            w12: 3814498,
            w13: 2863575,
            w14: 2861023,
            w15: 3107009,
            w16: 2681971,
            w17: 3206322,
            w18: 2830823,
            w19: 2821733,
            w20: 5584221,
            w21: 2848571,
            w22: 5428511,
            w23: 4132988,
            w24: 2871710,
            w25: 2824096,
            w26: 2481192,
            w27: 2985411,
            w28: 3918344,
            w29: 3986185,
            w30: 3495658,
            w31: 3313336,
            w32: 3256865,
            w33: 3673052,
            w34: 3495473,
            w35: 3038313,
            w36: 3492066,
            w37: 3597351,
            w38: 2921254,
            w39: 3450895,
            w40: 3052923,
            w41: 3595343,
            w42: 5872967,
            w43: 4293784,
            w44: 4779264,
            w45: 4245493,
            w46: 4038160,
            w47: 4610349,
            w48: 11249939,
            w49: 9507288,
            w50: 7923155,
            w51: 7870450,
            w52: 5898256,
          },
          {
            "Metrics Name": "Sales Build",
            w1: 1,
            w2: 0.76,
            w3: 1.16,
            w4: 1.01,
            w5: 0.67,
            w6: 1.18,
            w7: 1,
            w8: 0.93,
            w9: 1.08,
            w10: 1.23,
            w11: 0.75,
            w12: 1.79,
            w13: 0.75,
            w14: 1,
            w15: 1.09,
            w16: 0.86,
            w17: 1.2,
            w18: 0.88,
            w19: 1,
            w20: 1.98,
            w21: 0.51,
            w22: 1.91,
            w23: 0.76,
            w24: 0.69,
            w25: 0.98,
            w26: 0.88,
            w27: 1.2,
            w28: 1.31,
            w29: 1.02,
            w30: 0.88,
            w31: 0.95,
            w32: 0.98,
            w33: 1.13,
            w34: 0.95,
            w35: 0.87,
            w36: 1.15,
            w37: 1.03,
            w38: 0.81,
            w39: 1.18,
            w40: 0.88,
            w41: 1.18,
            w42: 1.63,
            w43: 0.73,
            w44: 1.11,
            w45: 0.89,
            w46: 0.95,
            w47: 1.14,
            w48: 2.44,
            w49: 0.85,
            w50: 0.83,
            w51: 0.99,
            w52: 0.75,
          },
          {
            "Metrics Name": "Units Sales",
            w1: 237961,
            w2: 183150,
            w3: 228018,
            w4: 244881,
            w5: 142678,
            w6: 147207,
            w7: 180853,
            w8: 158313,
            w9: 187014,
            w10: 177217,
            w11: 157886,
            w12: 245477,
            w13: 214427,
            w14: 187088,
            w15: 184486,
            w16: 163661,
            w17: 199765,
            w18: 172928,
            w19: 178476,
            w20: 272993,
            w21: 174615,
            w22: 217389,
            w23: 250389,
            w24: 181574,
            w25: 185938,
            w26: 163443,
            w27: 197410,
            w28: 233475,
            w29: 226559,
            w30: 223032,
            w31: 212151,
            w32: 208543,
            w33: 239089,
            w34: 221954,
            w35: 196835,
            w36: 217926,
            w37: 214658,
            w38: 185624,
            w39: 214252,
            w40: 189329,
            w41: 217124,
            w42: 254430,
            w43: 212007,
            w44: 246718,
            w45: 230198,
            w46: 251484,
            w47: 283688,
            w48: 650464,
            w49: 512946,
            w50: 459289,
            w51: 468097,
            w52: 356061,
          },
          {
            "Metrics Name": "Units Sales Build",
            w1: 1,
            w2: 0.77,
            w3: 1.24,
            w4: 1.07,
            w5: 0.58,
            w6: 1.03,
            w7: 1.23,
            w8: 0.88,
            w9: 1.18,
            w10: 0.9500000000000001,
            w11: 0.89,
            w12: 1.55,
            w13: 0.87,
            w14: 0.87,
            w15: 0.99,
            w16: 0.89,
            w17: 1.22,
            w18: 0.87,
            w19: 1.03,
            w20: 1.53,
            w21: 0.64,
            w22: 1.24,
            w23: 1.1500000000000001,
            w24: 0.73,
            w25: 1.02,
            w26: 0.88,
            w27: 1.21,
            w28: 1.18,
            w29: 0.97,
            w30: 0.98,
            w31: 0.9500000000000001,
            w32: 0.98,
            w33: 1.1500000000000001,
            w34: 0.93,
            w35: 0.89,
            w36: 1.11,
            w37: 0.99,
            w38: 0.86,
            w39: 1.1500000000000001,
            w40: 0.88,
            w41: 1.1500000000000001,
            w42: 1.17,
            w43: 0.8300000000000001,
            w44: 1.16,
            w45: 0.93,
            w46: 1.09,
            w47: 1.1300000000000001,
            w48: 2.29,
            w49: 0.79,
            w50: 0.9,
            w51: 1.02,
            w52: 0.76,
          },
          {
            "Metrics Name": "AUR",
            w1: 13.78,
            w2: 13.59,
            w3: 12.71,
            w4: 11.93,
            w5: 13.66,
            w6: 15.62,
            w7: 12.69,
            w8: 13.42,
            w9: 12.31,
            w10: 16.01,
            w11: 13.48,
            w12: 15.54,
            w13: 13.35,
            w14: 15.29,
            w15: 16.84,
            w16: 16.39,
            w17: 16.05,
            w18: 16.37,
            w19: 15.81,
            w20: 20.46,
            w21: 16.31,
            w22: 24.97,
            w23: 16.51,
            w24: 15.82,
            w25: 15.19,
            w26: 15.18,
            w27: 15.12,
            w28: 16.78,
            w29: 17.59,
            w30: 15.67,
            w31: 15.62,
            w32: 15.62,
            w33: 15.36,
            w34: 15.75,
            w35: 15.44,
            w36: 16.02,
            w37: 16.76,
            w38: 15.74,
            w39: 16.11,
            w40: 16.12,
            w41: 16.56,
            w42: 23.08,
            w43: 20.25,
            w44: 19.37,
            w45: 18.44,
            w46: 16.06,
            w47: 16.25,
            w48: 17.3,
            w49: 18.53,
            w50: 17.25,
            w51: 16.81,
            w52: 16.57,
          },
          {
            "Metrics Name": "GM$",
            w1: 2611159,
            w2: 1990963,
            w3: 2241537,
            w4: 2254216,
            w5: 1550294,
            w6: 1859939,
            w7: 1756787,
            w8: 1665271,
            w9: 1783246,
            w10: 2297671,
            w11: 1722688,
            w12: 3207993,
            w13: 2259974,
            w14: 2296135,
            w15: 2621390,
            w16: 2229919,
            w17: 2649111,
            w18: 2358132,
            w19: 2325110,
            w20: 5046702,
            w21: 2395685,
            w22: 4480240,
            w23: 3427761,
            w24: 2345196,
            w25: 2271134,
            w26: 2011834,
            w27: 2373533,
            w28: 3382952,
            w29: 3341294,
            w30: 2903584,
            w31: 2662929,
            w32: 2598932,
            w33: 3025680,
            w34: 2868745,
            w35: 2492378,
            w36: 2790208,
            w37: 3110896,
            w38: 2443314,
            w39: 2780490,
            w40: 2578169,
            w41: 3043426,
            w42: 4876498,
            w43: 3551717,
            w44: 3918381,
            w45: 3625332,
            w46: 3489402,
            w47: 3885292,
            w48: 9564707,
            w49: 8300924,
            w50: 6782907,
            w51: 6730705,
            w52: 4986699,
          },
          {
            "Metrics Name": "GM%",
            w1: 79.61,
            w2: 79.98,
            w3: 77.35,
            w4: 77.14,
            w5: 79.52,
            w6: 80.9,
            w7: 76.54,
            w8: 78.36,
            w9: 77.45,
            w10: 80.98,
            w11: 80.95,
            w12: 84.1,
            w13: 78.92,
            w14: 80.26,
            w15: 84.37,
            w16: 83.14,
            w17: 82.62,
            w18: 83.3,
            w19: 82.4,
            w20: 90.37,
            w21: 84.1,
            w22: 82.53,
            w23: 82.94,
            w24: 81.67,
            w25: 80.42,
            w26: 81.08,
            w27: 79.5,
            w28: 86.34,
            w29: 83.82,
            w30: 83.06,
            w31: 80.37,
            w32: 79.8,
            w33: 82.38,
            w34: 82.07,
            w35: 82.03,
            w36: 79.9,
            w37: 86.48,
            w38: 83.64,
            w39: 80.57,
            w40: 84.45,
            w41: 84.65,
            w42: 83.03,
            w43: 82.72,
            w44: 81.99,
            w45: 85.39,
            w46: 86.41,
            w47: 84.27,
            w48: 85.02,
            w49: 87.31,
            w50: 85.61,
            w51: 85.52,
            w52: 84.55,
          },
          {
            "Metrics Name": "WOS",
            w1: 3,
            w2: 3.03,
            w3: 3.3,
            w4: 3.35,
            w5: 3.48,
            w6: 3.63,
            w7: 3.78,
            w8: 3.88,
            w9: 3.91,
            w10: 4.04,
            w11: 4.1,
            w12: 4.22,
            w13: 4.34,
            w14: 4.45,
            w15: 4.53,
            w16: 4.6,
            w17: 4.71,
            w18: 4.92,
            w19: 5.12,
            w20: 5.18,
            w21: 5.31,
            w22: 5.44,
            w23: 5.46,
            w24: 5.58,
            w25: 5.69,
            w26: 5.73,
            w27: 5.79,
            w28: 5.68,
            w29: 5.58,
            w30: 5.48,
            w31: 5.39,
            w32: 5.3,
            w33: 5.21,
            w34: 5.13,
            w35: 5.06,
            w36: 4.99,
            w37: 4.92,
            w38: 4.86,
            w39: 4.8,
            w40: 4.74,
            w41: 4.69,
            w42: 4.64,
            w43: 4.59,
            w44: 4.55,
            w45: 4.51,
            w46: 4.47,
            w47: 4.43,
            w48: 4.4,
            w49: 4.38,
            w50: 4.36,
            w51: 4.35,
            w52: 4.34,
          },
          {
            "Metrics Name": "Sell Through %",
            w1: 169.35,
            w2: 84.83,
            w3: 77.04,
            w4: 106.78,
            w5: 55.1,
            w6: 43.6,
            w7: 54.54,
            w8: 72.08,
            w9: 108.53,
            w10: 71.28,
            w11: 75.16,
            w12: 63.61,
            w13: 91.07000000000001,
            w14: 93.97,
            w15: 119.94,
            w16: 92.10000000000001,
            w17: 141.41,
            w18: 91.10000000000001,
            w19: 68.18,
            w20: 148.38,
            w21: 122.31,
            w22: 137.23,
            w23: 212.74,
            w24: 135.19,
            w25: 147.62,
            w26: 212.75,
            w27: 201.54,
            w28: 14350.03,
            w29: null,
            w30: null,
            w31: null,
            w32: null,
            w33: null,
            w34: null,
            w35: null,
            w36: null,
            w37: null,
            w38: null,
            w39: null,
            w40: null,
            w41: null,
            w42: null,
            w43: null,
            w44: null,
            w45: null,
            w46: null,
            w47: null,
            w48: null,
            w49: null,
            w50: null,
            w51: null,
            w52: null,
          },
          {
            "Metrics Name": "Inventory INS Units",
            w1: 1162186,
            w2: 1196688,
            w3: 1251984,
            w4: 1211766,
            w5: 1313392,
            w6: 1443661,
            w7: 1495525,
            w8: 1535314,
            w9: 1512689,
            w10: 1554314,
            w11: 1555197,
            w12: 1585513,
            w13: 1621511,
            w14: 1682264,
            w15: 1714900,
            w16: 1730060,
            w17: 1755727,
            w18: 1831640,
            w19: 1950702,
            w20: 2015714,
            w21: 2054888,
            w22: 2093035,
            w23: 2100469,
            w24: 2126044,
            w25: 2144109,
            w26: 2137787,
            w27: 2133075,
            w28: 2066846,
            w29: 2002354,
            w30: 1933037,
            w31: 1870116,
            w32: 1810085,
            w33: 1740250,
            w34: 1678137,
            w35: 1623726,
            w36: 1571784,
            w37: 1526090,
            w38: 1478665,
            w39: 1432252,
            w40: 1387774,
            w41: 1341343,
            w42: 1293304,
            w43: 1249690,
            w44: 1189714,
            w45: 1142583,
            w46: 1098131,
            w47: 1049377,
            w48: 953702,
            w49: 910702,
            w50: 856910,
            w51: 793838,
            w52: 748330,
          },
          {
            "Metrics Name": "Inventory INS Cost",
            w1: 2552052,
            w2: 2608113,
            w3: 2685782,
            w4: 2651207,
            w5: 2909274,
            w6: 3281759,
            w7: 3368570,
            w8: 3442195,
            w9: 3345250,
            w10: 3482750,
            w11: 3491655,
            w12: 3638929,
            w13: 3745605,
            w14: 3942650,
            w15: 4099012,
            w16: 4151225,
            w17: 4248149,
            w18: 4381871,
            w19: 4775441,
            w20: 5058536,
            w21: 5201579,
            w22: 5353757,
            w23: 5432257,
            w24: 5531644,
            w25: 5584377,
            w26: 5544793,
            w27: 5479746,
            w28: 5316492,
            w29: 5157886,
            w30: 4991033,
            w31: 4839731,
            w32: 4695856,
            w33: 4531245,
            w34: 4387052,
            w35: 4260954,
            w36: 4142738,
            w37: 4040069,
            w38: 3933954,
            w39: 3828444,
            w40: 3728202,
            w41: 3622754,
            w42: 3513410,
            w43: 3413549,
            w44: 3277994,
            w45: 3170871,
            w46: 3065583,
            w47: 2944238,
            w48: 2701418,
            w49: 2591742,
            w50: 2455246,
            w51: 2297312,
            w52: 2182831,
          },
          {
            "Metrics Name": "Inventory DC Units",
            w1: 0,
            w2: 0,
            w3: 0,
            w4: 0,
            w5: 0,
            w6: 0,
            w7: 0,
            w8: 0,
            w9: 0,
            w10: 0,
            w11: 0,
            w12: 0,
            w13: 0,
            w14: 0,
            w15: 0,
            w16: 0,
            w17: 0,
            w18: 0,
            w19: 0,
            w20: 0,
            w21: 0,
            w22: 0,
            w23: 0,
            w24: 0,
            w25: 0,
            w26: 0,
            w27: 0,
            w28: 0,
            w29: 0,
            w30: 0,
            w31: 0,
            w32: 0,
            w33: 0,
            w34: 0,
            w35: 0,
            w36: 0,
            w37: 0,
            w38: 0,
            w39: 0,
            w40: 0,
            w41: 0,
            w42: 0,
            w43: 0,
            w44: 0,
            w45: 0,
            w46: 0,
            w47: 0,
            w48: 0,
            w49: 0,
            w50: 0,
            w51: 0,
            w52: 0,
          },
          {
            "Metrics Name": "Inventory DC Cost",
            w1: 0,
            w2: 0,
            w3: 0,
            w4: 0,
            w5: 0,
            w6: 0,
            w7: 0,
            w8: 0,
            w9: 0,
            w10: 0,
            w11: 0,
            w12: 0,
            w13: 0,
            w14: 0,
            w15: 0,
            w16: 0,
            w17: 0,
            w18: 0,
            w19: 0,
            w20: 0,
            w21: 0,
            w22: 0,
            w23: 0,
            w24: 0,
            w25: 0,
            w26: 0,
            w27: 0,
            w28: 0,
            w29: 0,
            w30: 0,
            w31: 0,
            w32: 0,
            w33: 0,
            w34: 0,
            w35: 0,
            w36: 0,
            w37: 0,
            w38: 0,
            w39: 0,
            w40: 0,
            w41: 0,
            w42: 0,
            w43: 0,
            w44: 0,
            w45: 0,
            w46: 0,
            w47: 0,
            w48: 0,
            w49: 0,
            w50: 0,
            w51: 0,
            w52: 0,
          },
          {
            "Metrics Name": "Receipt Units",
            w1: 140515,
            w2: 215915,
            w3: 295973,
            w4: 229332,
            w5: 258959,
            w6: 337636,
            w7: 331590,
            w8: 219628,
            w9: 172312,
            w10: 248621,
            w11: 210072,
            w12: 385900,
            w13: 235443,
            w14: 199098,
            w15: 153813,
            w16: 177690,
            w17: 141262,
            w18: 189826,
            w19: 261789,
            w20: 183987,
            w21: 142759,
            w22: 158412,
            w23: 117697,
            w24: 134310,
            w25: 125959,
            w26: 76824,
            w27: 97953,
            w28: 1627,
            w29: 0,
            w30: 0,
            w31: 0,
            w32: 0,
            w33: 0,
            w34: 0,
            w35: 0,
            w36: 0,
            w37: 0,
            w38: 0,
            w39: 0,
            w40: 0,
            w41: 0,
            w42: 0,
            w43: 0,
            w44: 0,
            w45: 0,
            w46: 0,
            w47: 0,
            w48: 0,
            w49: 0,
            w50: 0,
            w51: 0,
            w52: 0,
          },
          {
            "Metrics Name": "Receipt Cost",
            w1: 327757,
            w2: 475895,
            w3: 794161,
            w4: 663316,
            w5: 652090,
            w6: 969231,
            w7: 895150,
            w8: 532017,
            w9: 392282,
            w10: 771145,
            w11: 595383,
            w12: 1086071,
            w13: 599715,
            w14: 616552,
            w15: 528607,
            w16: 459970,
            w17: 423180,
            w18: 429644,
            w19: 802792,
            w20: 593073,
            w21: 412505,
            w22: 472587,
            w23: 374854,
            w24: 395994,
            w25: 334535,
            w26: 165753,
            w27: 194481,
            w28: 18,
            w29: 0,
            w30: 0,
            w31: 0,
            w32: 0,
            w33: 0,
            w34: 0,
            w35: 0,
            w36: 0,
            w37: 0,
            w38: 0,
            w39: 0,
            w40: 0,
            w41: 0,
            w42: 0,
            w43: 0,
            w44: 0,
            w45: 0,
            w46: 0,
            w47: 0,
            w48: 0,
            w49: 0,
            w50: 0,
            w51: 0,
            w52: 0,
          },
          {
            "Metrics Name": "APS",
            w1: 0,
            w2: 0,
            w3: 0,
            w4: 0,
            w5: 0,
            w6: 0,
            w7: 0,
            w8: 0,
            w9: 0,
            w10: 0,
            w11: 0,
            w12: 0,
            w13: 0,
            w14: 0,
            w15: 0,
            w16: 0,
            w17: 0,
            w18: 0,
            w19: 0,
            w20: 0,
            w21: 0,
            w22: 0,
            w23: 0,
            w24: 0,
            w25: 0,
            w26: 0,
            w27: 0,
            w28: 0,
            w29: 0,
            w30: 0,
            w31: 0,
            w32: 0,
            w33: 0,
            w34: 0,
            w35: 0,
            w36: 0,
            w37: 0,
            w38: 0,
            w39: 0,
            w40: 0,
            w41: 0,
            w42: 0,
            w43: 0,
            w44: 0,
            w45: 0,
            w46: 0,
            w47: 0,
            w48: 0,
            w49: 0,
            w50: 0,
            w51: 0,
            w52: 0,
          },
        ],
      },
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
      this.weeklyforecast = await this.$axios.$post(
        `/get-filtered-forecast-data`,
        requestedFilterOption
      );

      requestedFilterOption["filterType"] = "week";
      this.filterMonthly = false;
      this.filterWeekly = true;
      this.filteredForecastMetrics = await this.$axios.$post(
        `/get-filtered-forecast-metrics`,
        requestedFilterOption
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
    async appliedFilters() {
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
      let requestedFilterOption = this.emptyFieldCleaner(this.regularFilters);
      await this.getFilteredForecastData(requestedFilterOption);
      this.isFilteredForecast = true;
      this.filteredActiveTab = "Weekly";
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
    FilteredDurations() {
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
    // this.filteredForecastMetrics = this.testData;
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
