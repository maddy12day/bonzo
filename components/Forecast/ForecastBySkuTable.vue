<template>
  <card card-body-classes="table-full-width">
    <h4 class="card-title text-bold font-weight-bold">
      {{ tableHeading }}
    </h4>
    <div class="applied-filter-container" v-if="allAppliedFilters.length > 0">
      <h5 class="text-bold font-weight-bold">Applied Filters</h5>
      <Tags :allAppliedFilters="allAppliedFilters" />
    </div>
    {{topTenSkusData}}
    <el-table :data="topTenSkusData.parsedWeeklyData">
      <template v-if="topTenSkusData && topTenSkusData.parsedWeeklyData && topTenSkusData.parsedWeeklyData.length=='0'">
        <div slot="append">
        </div>
      </template>
      <template v-else>
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
          :class-name="checkIfPastWeek(1)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[0][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w2 ${getWeekendDates(2)}`"
          :class-name="checkIfPastWeek(2)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[1][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w2 ${getWeekendDates(3)}`"
          :class-name="checkIfPastWeek(3)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[2][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :class-name="checkIfPastWeek(4)"
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
          :class-name="checkIfPastWeek(5)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[4][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w6 ${getWeekendDates(6)}`"
          :class-name="checkIfPastWeek(6)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[5][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w7 ${getWeekendDates(7)}`"
          :class-name="checkIfPastWeek(7)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[6][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w8 ${getWeekendDates(8)}`"
          :class-name="checkIfPastWeek(8)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[7][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :class-name="checkIfPastWeek(9)"
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
          :class-name="checkIfPastWeek(10)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[9][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w11 ${getWeekendDates(11)}`"
          :class-name="checkIfPastWeek(11)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[10][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w12 ${getWeekendDates(12)}`"
          :class-name="checkIfPastWeek(12)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[11][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w13 ${getWeekendDates(13)}`"
          :class-name="checkIfPastWeek(3)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[12][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w14 ${getWeekendDates(14)}`"
          :class-name="checkIfPastWeek(14)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[13][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w15 ${getWeekendDates(15)}`"
          :class-name="checkIfPastWeek(15)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[14][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w16 ${getWeekendDates(16)}`"
          :class-name="checkIfPastWeek(16)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[15][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :class-name="checkIfPastWeek(17)"
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
          :class-name="checkIfPastWeek(18)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[17][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w19 ${getWeekendDates(19)}`"
          :class-name="checkIfPastWeek(19)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[18][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w20 ${getWeekendDates(20)}`"
          :class-name="checkIfPastWeek(20)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[19][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w21 ${getWeekendDates(21)}`"
          :class-name="checkIfPastWeek(21)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[20][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w22 ${getWeekendDates(22)}`"
          :class-name="checkIfPastWeek(22)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[21][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w23 ${getWeekendDates(23)}`"
          :class-name="checkIfPastWeek(23)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[22][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w24 ${getWeekendDates(24)}`"
          :class-name="checkIfPastWeek(24)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[23][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w25 ${getWeekendDates(25)}`"
          :class-name="checkIfPastWeek(25)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[24][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w26 ${getWeekendDates(26)}`"
          :class-name="checkIfPastWeek(26)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[25][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w27 ${getWeekendDates(27)}`"
          :class-name="checkIfPastWeek(27)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[26][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w28 ${getWeekendDates(28)}`"
          :class-name="checkIfPastWeek(28)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[27][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w29 ${getWeekendDates(29)}`"
          :class-name="checkIfPastWeek(29)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[28][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w30 ${getWeekendDates(30)}`"
          :class-name="checkIfPastWeek(30)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[29][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w31 ${getWeekendDates(31)}`"
          :class-name="checkIfPastWeek(31)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[30][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w32 ${getWeekendDates(32)}`"
          :class-name="checkIfPastWeek(32)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[31][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w33 ${getWeekendDates(33)}`"
          :class-name="checkIfPastWeek(33)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[32][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w34 ${getWeekendDates(34)}`"
          :class-name="checkIfPastWeek(34)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[33][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w35 ${getWeekendDates(35)}`"
          :class-name="checkIfPastWeek(35)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[34][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w36 ${getWeekendDates(36)}`"
          :class-name="checkIfPastWeek(36)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[35][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w37 ${getWeekendDates(37)}`"
          :class-name="checkIfPastWeek(37)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[36][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w38 ${getWeekendDates(38)}`"
          :class-name="checkIfPastWeek(38)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[37][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w39 ${getWeekendDates(39)}`"
          :class-name="checkIfPastWeek(39)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[38][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w40 ${getWeekendDates(40)}`"
          :class-name="checkIfPastWeek(40)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[39][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w41 ${getWeekendDates(41)}`"
          :class-name="checkIfPastWeek(41)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[40][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w42 ${getWeekendDates(42)}`"
          :class-name="checkIfPastWeek(42)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[41][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w43 ${getWeekendDates(43)}`"
          :class-name="checkIfPastWeek(43)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[42][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w44 ${getWeekendDates(44)}`"
          :class-name="checkIfPastWeek(44)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[43][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w45 ${getWeekendDates(45)}`"
          :class-name="checkIfPastWeek(45)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[44][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w46 ${getWeekendDates(46)}`"
          :class-name="checkIfPastWeek(46)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[45][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w47 ${getWeekendDates(47)}`"
          :class-name="checkIfPastWeek(47)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[46][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w48 ${getWeekendDates(48)}`"
          :class-name="checkIfPastWeek(48)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[47][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w49 ${getWeekendDates(49)}`"
          :class-name="checkIfPastWeek(49)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[48][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w50 ${getWeekendDates(50)}`"
          :class-name="checkIfPastWeek(50)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[49][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w51 ${getWeekendDates(51)}`"
          :class-name="checkIfPastWeek(51)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[50][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          :label="`w52 ${getWeekendDates(52)}`"
          :class-name="checkIfPastWeek(52)"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.data[51][`${forecast_attribute}`] | toLocaleStr }}
          </template>
        </el-table-column>
      </template>
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
    async getFilteredForecastData(forecastYear) {
      const data = await this.$axios.$get(`/get-filtered-forecast-data/${forecastYear}`);
      this.forecastData = data;
    },
    getWeekendDates(index) {
      return JSON.parse(window.localStorage.getItem("weekendDates"))
        ? `(${moment(
            JSON.parse(window.localStorage.getItem("weekendDates"))[index - 1]
          ).format("MM/DD/YYYY")})`
        : "";
    },
    checkIfPastWeek(index) {
      let className = "";
      if (moment(new Date()).week() > index) {
        className = "disableWeek";
      }
      return className;
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
.disableWeek {
  background: #e8e8e8;
}
</style>
