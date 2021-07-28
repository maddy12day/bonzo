<template>
  <card card-body-classes="table-full-width">
    <h4 class="card-title text-bold font-weight-bold">
      {{ tableHeading }}
    </h4>
    <div class="applied-filter-container" v-if="allAppliedFilters.length > 0">
      <h5 class="text-bold font-weight-bold">Applied Filters</h5>
      <Tags :allAppliedFilters="allAppliedFilters" />
    </div>
    <el-table :data="topTenSkusData.parsedWeeklyData">
      <el-table-column
        min-width="150"
        label="SKU"
        property="sku"
        class-name="metrics-fix-header"
        fixed
      >
      </el-table-column>
      <el-table-column
        min-width="250"
        label="Title"
        property="title"
        class-name="metrics-fix-header"
        fixed
      >
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w1 ${getWeekendDates(1)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[0][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w2 ${getWeekendDates(2)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[1][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w2 ${getWeekendDates(3)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[2][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w4 ${getWeekendDates(4)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[3][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w5 ${getWeekendDates(5)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[4][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w6 ${getWeekendDates(6)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[5][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w7 ${getWeekendDates(7)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[6][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w8 ${getWeekendDates(8)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[7][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w9 ${getWeekendDates(9)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[8][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w10 ${getWeekendDates(10)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[9][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w11 ${getWeekendDates(11)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[10][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w12 ${getWeekendDates(12)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[11][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w13 ${getWeekendDates(13)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[12][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w14 ${getWeekendDates(14)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[13][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w15 ${getWeekendDates(15)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[14][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w16 ${getWeekendDates(16)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[15][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w17 ${getWeekendDates(17)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[16][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w18 ${getWeekendDates(18)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[17][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w19 ${getWeekendDates(19)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[18][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w20 ${getWeekendDates(20)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[19][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w21 ${getWeekendDates(2)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[20][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w22 ${getWeekendDates(22)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[21][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w23 ${getWeekendDates(23)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[22][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w24 ${getWeekendDates(24)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[23][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w25 ${getWeekendDates(25)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[24][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w26 ${getWeekendDates(26)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[25][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w27 ${getWeekendDates(27)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[26][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w28 ${getWeekendDates(28)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[27][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w29 ${getWeekendDates(29)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[28][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w30 ${getWeekendDates(30)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[29][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w31 ${getWeekendDates(31)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[30][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w32 ${getWeekendDates(32)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[31][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w33 ${getWeekendDates(33)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[32][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w34 ${getWeekendDates(34)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[33][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w35 ${getWeekendDates(35)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[34][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w36 ${getWeekendDates(36)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[35][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w37 ${getWeekendDates(37)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[36][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w38 ${getWeekendDates(38)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[37][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w39 ${getWeekendDates(39)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[38][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w40 ${getWeekendDates(40)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[39][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w41 ${getWeekendDates(41)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[40][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w42 ${getWeekendDates(42)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[41][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w43 ${getWeekendDates(43)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[42][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w44 ${getWeekendDates(44)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[43][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w45 ${getWeekendDates(45)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[44][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w46 ${getWeekendDates(46)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[45][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w47 ${getWeekendDates(47)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[46][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :label="`w48 ${getWeekendDates(48)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[47][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w49 ${getWeekendDates(49)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[48][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w50 ${getWeekendDates(50)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[49][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w51 ${getWeekendDates(51)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[50][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="150"
        :label="`w52 ${getWeekendDates(52)}`"
        align="right"
      >
        <template slot-scope="scope">
          {{ scope.row.data[51][`${forecast_attribute}`] | toLocaleStr }}
        </template>
      </el-table-column>
    </el-table>
  </card>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import Tags from "/components/Tags.vue";
import moment from "moment";

export default {
  name: "ForecastBySkuTable",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Tags,
  },
  props: [
    "tableHeading",
    "forecast_attribute",
    "topTenSkusData",
    "allAppliedFilters",
  ],
  data() {
    return {
      forecastData: [],
    };
  },
  computed: {},
  methods: {
    async getFilteredForecastData() {
      const data = await this.$axios.$get(`/get-filtered-forecast-data`);
      this.forecastData = data;
    },
    getWeekendDates(index) {
      return JSON.parse(window.localStorage.getItem("weekendDates"))
        ? `(${moment(
            JSON.parse(window.localStorage.getItem("weekendDates"))[index - 1]
          ).format("MM/DD/YYYY")})`
        : "";
    },
  },
};
</script>
<style lang="scss">
.applied-filter-container {
  text-transform: capitalize;
  margin-bottom: 10px;

  h5 {
    margin-bottom: 10px;
  }
}
</style>
