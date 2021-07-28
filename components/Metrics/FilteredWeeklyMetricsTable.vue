<template>
  <div class="row">
    <div class="col-lg-12">
      <card card-body-classes="table-full-width">
        <h4 class="card-title text-bold font-weight-bold">
          {{ tableHeading }}
        </h4>
        <div
          class="applied-filter-container"
          v-if="allAppliedFilters.length > 0"
        >
          <h5 class="text-bold font-weight-bold">Applied Filters</h5>
          <Tags :allAppliedFilters="allAppliedFilters" />
        </div>
        <el-table :data="filteredForecastMetrics.parsedFilteredForecastData">
          <el-table-column
            min-width="185"
            label="Metrics Name"
            property="Metrics Name"
            class-name="metrics-fix-header"
            fixed
          >
          </el-table-column>
          <el-table-column
            min-width="185"
            label="Yearly"
            property="yearly_aggregate"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.yearly_aggregate | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w1 ${getWeekendDates(1)}`"
            property="w1"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w1 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w2 ${getWeekendDates(2)}`"
            property="w2"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w2 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w3 ${getWeekendDates(3)}`"
            property="w3"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w3 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w4 ${getWeekendDates(4)}`"
            property="w4"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w4 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w5 ${getWeekendDates(5)}`"
            property="w5"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w5 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w6 ${getWeekendDates(6)}`"
            property="w6"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w6 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w7 ${getWeekendDates(7)}`"
            property="w7"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w7 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w8 ${getWeekendDates(8)}`"
            property="w8"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w8 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w9 ${getWeekendDates(9)}`"
            property="w9"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w9 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w10 ${getWeekendDates(10)}`"
            property="w10"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w10 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w11 ${getWeekendDates(11)}`"
            property="w11"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w11 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w12 ${getWeekendDates(12)}`"
            property="w12"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w12 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w13 ${getWeekendDates(13)}`"
            property="w13"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w13 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w14 ${getWeekendDates(14)}`"
            property="w14"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w14 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w15 ${getWeekendDates(15)}`"
            property="w15"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w15 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w16 ${getWeekendDates(16)}`"
            property="w16"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w16 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w17 ${getWeekendDates(17)}`"
            property="w17"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w17 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w18 ${getWeekendDates(18)}`"
            property="w18"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w18 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w19 ${getWeekendDates(19)}`"
            property="w19"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w19 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w20 ${getWeekendDates(20)}`"
            property="w20"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w20 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w21 ${getWeekendDates(21)}`"
            property="w21"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w21 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w22 ${getWeekendDates(22)}`"
            property="w22"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w22 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w23 ${getWeekendDates(23)}`"
            property="w23"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w23 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w24 ${getWeekendDates(24)}`"
            property="w24"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w24 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w25 ${getWeekendDates(25)}`"
            property="w25"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w25 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w26 ${getWeekendDates(26)}`"
            property="w26"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w26 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w27 ${getWeekendDates(27)}`"
            property="w27"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w27 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w28 ${getWeekendDates(28)}`"
            property="w28"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w28 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w29 ${getWeekendDates(29)}`"
            property="w29"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w29 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w30 ${getWeekendDates(30)}`"
            property="w30"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w30 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w31 ${getWeekendDates(31)}`"
            property="w31"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w31 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w32 ${getWeekendDates(32)}`"
            property="w32"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w32 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w33 ${getWeekendDates(33)}`"
            property="w33"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w33 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w34 ${getWeekendDates(34)}`"
            property="w34"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w34 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w35 ${getWeekendDates(35)}`"
            property="w35"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w35 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="180"
            :label="`w36 ${getWeekendDates(36)}`"
            property="w36"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w36 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w37 ${getWeekendDates(37)}`"
            property="w37"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w37 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w38 ${getWeekendDates(38)}`"
            property="w38"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w38 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w39 ${getWeekendDates(39)}`"
            property="w39"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w39 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w40 ${getWeekendDates(40)}`"
            property="w40"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w40 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w41 ${getWeekendDates(41)}`"
            property="w41"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w41 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w42 ${getWeekendDates(42)}`"
            property="w42"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w42 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w43 ${getWeekendDates(43)}`"
            property="w43"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w43 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w44 ${getWeekendDates(44)}`"
            property="w44"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w44 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w45 ${getWeekendDates(45)}`"
            property="w45"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w45 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w46 ${getWeekendDates(46)}`"
            property="w46"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w46 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w47 ${getWeekendDates(47)}`"
            property="w47"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w47 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w48 ${getWeekendDates(48)}`"
            property="w48"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w48 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w49 ${getWeekendDates(49)}`"
            property="w49"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w49 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w50 ${getWeekendDates(50)}`"
            property="w50"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w50 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w51 ${getWeekendDates(51)}`"
            property="w51"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w51 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w52 ${getWeekendDates(52)}`"
            property="w52"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w52 | toLocaleStr
            }}</template>
          </el-table-column>
        </el-table>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import Tags from "../../components/Tags.vue";
import moment from "moment";

export default {
  name: "FilteredWeeklyMetricsTable",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Tags,
  },
  props: ["tableHeading", "filteredForecastMetrics", "allAppliedFilters"],
  methods: {
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
