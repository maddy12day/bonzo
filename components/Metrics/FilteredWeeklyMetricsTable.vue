<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="col-md-12 text-right p-0">
        <br />
        <a>
          <download-csv
            v-if="metricTableDataExportDataProp.length > 0"
            class="mt-1 btn btn-sm"
            style="line-height:1;"
            :data="metricTableDataExportData"
            :name="getCSVName()"
            :disabled="metricTableDataExportDataProp.length < 0"
          >
            Download CSV
          </download-csv>
        </a>
      </div>
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
            label="Q1"
            property="Q1"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.Q1 | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="185"
            label="Q2"
            property="Q2"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.Q2 | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="185"
            label="Q3"
            property="Q3"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.Q3 | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="185"
            label="Q4"
            property="Q4"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.Q4 | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :label="`w1 ${getWeekendDates(1)}`"
            :class-name="checkIfPastWeek(1)"
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
            :class-name="checkIfPastWeek(2)"
            property="w2"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w2 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :class-name="checkIfPastWeek(3)"
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
            :class-name="checkIfPastWeek(4)"
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
            :class-name="checkIfPastWeek(5)"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w5 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="185"
            :class-name="checkIfPastWeek(6)"
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
            :class-name="checkIfPastWeek(7)"
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
            :class-name="checkIfPastWeek(8)"
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
            :class-name="checkIfPastWeek(9)"
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
            :class-name="checkIfPastWeek(10)"
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
            :class-name="checkIfPastWeek(11)"
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
            :class-name="checkIfPastWeek(12)"
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
            :class-name="checkIfPastWeek(13)"
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
            :class-name="checkIfPastWeek(14)"
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
            :class-name="checkIfPastWeek(15)"
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
            :class-name="checkIfPastWeek(16)"
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
            :class-name="checkIfPastWeek(17)"
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
            :class-name="checkIfPastWeek(18)"
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
            :class-name="checkIfPastWeek(19)"
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
            :class-name="checkIfPastWeek(20)"
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
            :class-name="checkIfPastWeek(21)"
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
            :class-name="checkIfPastWeek(22)"
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
            :class-name="checkIfPastWeek(23)"
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
            :class-name="checkIfPastWeek(24)"
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
            :class-name="checkIfPastWeek(25)"
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
            :class-name="checkIfPastWeek(26)"
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
            :class-name="checkIfPastWeek(27)"
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
            :class-name="checkIfPastWeek(28)"
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
            :class-name="checkIfPastWeek(29)"
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
            :class-name="checkIfPastWeek(30)"
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
            :class-name="checkIfPastWeek(31)"
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
            :class-name="checkIfPastWeek(32)"
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
            :class-name="checkIfPastWeek(33)"
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
            :class-name="checkIfPastWeek(34)"
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
            :class-name="checkIfPastWeek(35)"
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
            :class-name="checkIfPastWeek(36)"
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
            :class-name="checkIfPastWeek(37)"
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
            :class-name="checkIfPastWeek(38)"
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
            :class-name="checkIfPastWeek(39)"
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
            :class-name="checkIfPastWeek(40)"
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
            :class-name="checkIfPastWeek(41)"
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
            :class-name="checkIfPastWeek(42)"
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
            :class-name="checkIfPastWeek(43)"
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
            :class-name="checkIfPastWeek(44)"
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
            :class-name="checkIfPastWeek(45)"
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
            :class-name="checkIfPastWeek(46)"
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
            :class-name="checkIfPastWeek(47)"
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
            :class-name="checkIfPastWeek(48)"
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
            :class-name="checkIfPastWeek(49)"
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
            :class-name="checkIfPastWeek(50)"
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
            :class-name="checkIfPastWeek(51)"
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
            :class-name="checkIfPastWeek(52)"
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
  data() {
    return {
      metricTableDataExportData: [],
    };
  },
  props: ["tableHeading", "filteredForecastMetrics", "allAppliedFilters"],
  computed: {
    metricTableDataExportDataProp() {
      return this.metricTableDataExportData;
    },
  },
  watch: {
    filteredForecastMetrics: function() {
      this.createExportCSV();
    },
  },
  methods: {
    getCSVName() {
      return `Filtered Weekly Metrics Table ${moment().format(
        "MM-DD-YYYY"
      )}.csv`;
    },
    createExportCSV() {
      this.metricTableDataExportData = this.filteredForecastMetrics.parsedFilteredForecastData.map(
        (data) => {
          let metricTableRow = {
            "Metrics Name": data["Metrics Name"],
            Yearly: data.yearly_aggregate,
            Q1: data.Q1,
            Q2: data.Q2,
            Q3: data.Q3,
            Q4: data.Q4,
          };
          metricTableRow[`W1 ${this.getWeekendDates(1)}`] = data.w1;
          metricTableRow[`W2 ${this.getWeekendDates(2)}`] = data.w2;
          metricTableRow[`W3 ${this.getWeekendDates(3)}`] = data.w3;
          metricTableRow[`W4 ${this.getWeekendDates(4)}`] = data.w4;
          metricTableRow[`W5 ${this.getWeekendDates(5)}`] = data.w5;
          metricTableRow[`W6 ${this.getWeekendDates(6)}`] = data.w6;
          metricTableRow[`W7 ${this.getWeekendDates(7)}`] = data.w7;
          metricTableRow[`W8 ${this.getWeekendDates(8)}`] = data.w8;
          metricTableRow[`W9 ${this.getWeekendDates(9)}`] = data.w9;
          metricTableRow[`W10 ${this.getWeekendDates(10)}`] = data.w10;
          metricTableRow[`W11 ${this.getWeekendDates(11)}`] = data.w11;
          metricTableRow[`W12 ${this.getWeekendDates(12)}`] = data.w12;
          metricTableRow[`W13 ${this.getWeekendDates(13)}`] = data.w13;
          metricTableRow[`W14 ${this.getWeekendDates(14)}`] = data.w14;
          metricTableRow[`W15 ${this.getWeekendDates(15)}`] = data.w15;
          metricTableRow[`W16 ${this.getWeekendDates(16)}`] = data.w16;
          metricTableRow[`W17 ${this.getWeekendDates(17)}`] = data.w17;
          metricTableRow[`W18 ${this.getWeekendDates(18)}`] = data.w18;
          metricTableRow[`W19 ${this.getWeekendDates(19)}`] = data.w19;
          metricTableRow[`W20 ${this.getWeekendDates(20)}`] = data.w20;
          metricTableRow[`W21 ${this.getWeekendDates(21)}`] = data.w21;
          metricTableRow[`W22 ${this.getWeekendDates(22)}`] = data.w22;
          metricTableRow[`W23 ${this.getWeekendDates(23)}`] = data.w23;
          metricTableRow[`W24 ${this.getWeekendDates(24)}`] = data.w24;
          metricTableRow[`W25 ${this.getWeekendDates(25)}`] = data.w25;
          metricTableRow[`W26 ${this.getWeekendDates(26)}`] = data.w26;
          metricTableRow[`W27 ${this.getWeekendDates(27)}`] = data.w27;
          metricTableRow[`W28 ${this.getWeekendDates(28)}`] = data.w28;
          metricTableRow[`W29 ${this.getWeekendDates(29)}`] = data.w29;
          metricTableRow[`W30 ${this.getWeekendDates(30)}`] = data.w30;
          metricTableRow[`W31 ${this.getWeekendDates(31)}`] = data.w31;
          metricTableRow[`W32 ${this.getWeekendDates(32)}`] = data.w32;
          metricTableRow[`W33 ${this.getWeekendDates(33)}`] = data.w33;
          metricTableRow[`W34 ${this.getWeekendDates(34)}`] = data.w34;
          metricTableRow[`W35 ${this.getWeekendDates(35)}`] = data.w35;
          metricTableRow[`W36 ${this.getWeekendDates(36)}`] = data.w36;
          metricTableRow[`W37 ${this.getWeekendDates(37)}`] = data.w37;
          metricTableRow[`W38 ${this.getWeekendDates(38)}`] = data.w38;
          metricTableRow[`W39 ${this.getWeekendDates(39)}`] = data.w39;
          metricTableRow[`W40 ${this.getWeekendDates(40)}`] = data.w40;
          metricTableRow[`W41 ${this.getWeekendDates(41)}`] = data.w41;
          metricTableRow[`W42 ${this.getWeekendDates(42)}`] = data.w42;
          metricTableRow[`W43 ${this.getWeekendDates(43)}`] = data.w43;
          metricTableRow[`W44 ${this.getWeekendDates(44)}`] = data.w44;
          metricTableRow[`W45 ${this.getWeekendDates(45)}`] = data.w45;
          metricTableRow[`W46 ${this.getWeekendDates(46)}`] = data.w46;
          metricTableRow[`W47 ${this.getWeekendDates(47)}`] = data.w47;
          metricTableRow[`W48 ${this.getWeekendDates(48)}`] = data.w48;
          metricTableRow[`W49 ${this.getWeekendDates(49)}`] = data.w49;
          metricTableRow[`W50 ${this.getWeekendDates(50)}`] = data.w50;
          metricTableRow[`W51 ${this.getWeekendDates(51)}`] = data.w51;
          metricTableRow[`W52 ${this.getWeekendDates(52)}`] = data.w52;
          return metricTableRow;
        }
      );
      console.log(
        "this.metricTableDataExportData0---",
        this.metricTableDataExportData
      );
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

<style>
.disableWeek {
  background: #e8e8e8;
}
</style>
