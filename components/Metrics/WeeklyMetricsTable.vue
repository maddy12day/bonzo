<template>
  <div class="row">
    <select name="weekOfYear" id="weekOfYear" v-on:change="valueOfWeek()">
      <option value="0" selected disabled>FROM</option>
      <option v-for="weekdate in 52" :key="weekdate" :value="weekdate">
        W{{ weekdate }} {{ getWeekendDates(weekdate) }}
      </option>
    </select>
    <select
      name="weekOfYear"
      id="weekOfYearTill"
      v-on:change="valueOfWeekTill()"
    >
      <option value="0" selected disabled>TILL</option>
      <option v-for="weekdate in 52" :key="weekdate" :value="weekdate">
        W{{ weekdate }} {{ getWeekendDates(weekdate) }}
      </option>
    </select>
    <button class="resetbtn" @click="resetVal()">Reset Filter</button>
    <div class="col-lg-12">
      <div class="col-md-12 text-right p-0">
        <br />
        <a>
          <button
            v-if="metricTableDataExportDataProp.length > 0"
            class="mt-1 btn btn-sm"
            style="line-height:1;"
            @click="exportToExcel"
          >
            Download Excel
          </button>
        </a>
      </div>
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          {{ tableHeading }}
        </h4>
        <el-table :data="metricsTableData">
          <el-table-column
            min-width="170"
            label="Metrics Name"
            property="metrics_master.title"
            class-name="metrics-fix-header"
            fixed
          >
          </el-table-column>

          <el-table-column
            min-width="150"
            label="Yearly"
            property="yearly_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{ scope.row.yearly_aggregate | toLocaleStr }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q1"
            property="q1_aggregate"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row.q1_aggregate | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q2"
            property="q2_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{ scope.row.q2_aggregate | toLocaleStr }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q3"
            property="q3_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{ scope.row.q3_aggregate | toLocaleStr }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q4"
            property="q4_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{ scope.row.q4_aggregate | toLocaleStr }}</template>
          </el-table-column>

          <el-table-column
           min-width="160"
            :label="`w1 ${getWeekendDates(1)}`"
            property="w01"
            align="right"
            :class-name="checkIfPastWeek(1)"
          >
            <template slot-scope="scope">{{
              scope.row.w01 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w2 ${getWeekendDates(2)}`"
            :class-name="checkIfPastWeek(2)"
            property="w02"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w02 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w3 ${getWeekendDates(3)}`"
            :class-name="checkIfPastWeek(3)"
            property="w03"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w03 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w4 ${getWeekendDates(4)}`"
            :class-name="checkIfPastWeek(4)"
            property="w40"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w04 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w5 ${getWeekendDates(5)}`"
            :class-name="checkIfPastWeek(5)"
            property="w05"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w05 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w6 ${getWeekendDates(6)}`"
            :class-name="checkIfPastWeek(6)"
            property="w06"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w06 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w7 ${getWeekendDates(7)}`"
            :class-name="checkIfPastWeek(7)"
            property="w07"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w07 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w8 ${getWeekendDates(8)}`"
            :class-name="checkIfPastWeek(8)"
            property="w08"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w08 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w9 ${getWeekendDates(9)}`"
            :class-name="checkIfPastWeek(9)"
            property="w09"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w09 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w10 ${getWeekendDates(10)}`"
            :class-name="checkIfPastWeek(10)"
            property="w10"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w10 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w11 ${getWeekendDates(11)}`"
            :class-name="checkIfPastWeek(11)"
            property="w11"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w11 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w12 ${getWeekendDates(12)}`"
            :class-name="checkIfPastWeek(12)"
            property="w12"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w12 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w13 ${getWeekendDates(13)}`"
            :class-name="checkIfPastWeek(13)"
            property="w13"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w13 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="165"
            :label="`w14 ${getWeekendDates(14)}`"
            :class-name="checkIfPastWeek(14)"
            property="w14"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w14 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w15 ${getWeekendDates(15)}`"
            :class-name="checkIfPastWeek(15)"
            property="w15"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w15 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w16 ${getWeekendDates(16)}`"
            :class-name="checkIfPastWeek(16)"
            property="w16"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w16 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w17 ${getWeekendDates(17)}`"
            :class-name="checkIfPastWeek(17)"
            property="w17"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w17 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w18 ${getWeekendDates(18)}`"
            :class-name="checkIfPastWeek(18)"
            property="w18"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w18 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w19 ${getWeekendDates(19)}`"
            :class-name="checkIfPastWeek(19)"
            property="w19"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w19 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w20 ${getWeekendDates(20)}`"
            :class-name="checkIfPastWeek(20)"
            property="w20"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w20 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w21 ${getWeekendDates(21)}`"
            :class-name="checkIfPastWeek(21)"
            property="w21"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w21 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w22 ${getWeekendDates(22)}`"
            :class-name="checkIfPastWeek(22)"
            property="w22"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w22 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="165"
            :label="`w23 ${getWeekendDates(23)}`"
            :class-name="checkIfPastWeek(23)"
            property="w23"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w23 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w24 ${getWeekendDates(24)}`"
            :class-name="checkIfPastWeek(24)"
            property="w24"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w24 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="165"
            :label="`w25 ${getWeekendDates(25)}`"
            :class-name="checkIfPastWeek(25)"
            property="w25"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w25 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w26 ${getWeekendDates(26)}`"
            :class-name="checkIfPastWeek(26)"
            property="w26"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w26 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w27 ${getWeekendDates(27)}`"
            :class-name="checkIfPastWeek(27)"
            property="w27"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w27 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w28 ${getWeekendDates(28)}`"
            :class-name="checkIfPastWeek(28)"
            property="w28"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w28 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w29 ${getWeekendDates(29)}`"
            :class-name="checkIfPastWeek(29)"
            property="w29"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w29 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w30 ${getWeekendDates(30)}`"
            :class-name="checkIfPastWeek(30)"
            property="w30"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w30 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w31 ${getWeekendDates(31)}`"
            :class-name="checkIfPastWeek(31)"
            property="w31"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w31 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="165"
            :label="`w32 ${getWeekendDates(32)}`"
            :class-name="checkIfPastWeek(32)"
            property="w32"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w32 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w33 ${getWeekendDates(33)}`"
            :class-name="checkIfPastWeek(33)"
            property="w33"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w33 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="165"
            :label="`w34 ${getWeekendDates(34)}`"
            :class-name="checkIfPastWeek(34)"
            property="w34"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w34 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="165"
            :label="`w35 ${getWeekendDates(35)}`"
            :class-name="checkIfPastWeek(35)"
            property="w35"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w35 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="165"
            :label="`w36 ${getWeekendDates(36)}`"
            :class-name="checkIfPastWeek(36)"
            property="w36"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w36 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w37 ${getWeekendDates(37)}`"
            :class-name="checkIfPastWeek(37)"
            property="w37"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w37 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w38 ${getWeekendDates(38)}`"
            :class-name="checkIfPastWeek(38)"
            property="w38"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w38 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w39 ${getWeekendDates(39)}`"
            :class-name="checkIfPastWeek(39)"
            property="w39"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w39 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w40 ${getWeekendDates(40)}`"
            :class-name="checkIfPastWeek(40)"
            property="w40"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w40 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w41 ${getWeekendDates(41)}`"
            :class-name="checkIfPastWeek(41)"
            property="w41"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w41 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w42 ${getWeekendDates(42)}`"
            :class-name="checkIfPastWeek(42)"
            property="w42"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w42 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w43 ${getWeekendDates(43)}`"
            :class-name="checkIfPastWeek(43)"
            property="w43"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w43 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w44 ${getWeekendDates(44)}`"
            :class-name="checkIfPastWeek(44)"
            property="w44"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w44 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w45 ${getWeekendDates(45)}`"
            :class-name="checkIfPastWeek(45)"
            property="w45"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w45 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w46 ${getWeekendDates(46)}`"
            :class-name="checkIfPastWeek(46)"
            property="w46"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w46 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w47 ${getWeekendDates(47)}`"
            :class-name="checkIfPastWeek(47)"
            property="w47"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w47 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w48 ${getWeekendDates(48)}`"
            :class-name="checkIfPastWeek(48)"
            property="w48"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w48 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w49 ${getWeekendDates(49)}`"
            :class-name="checkIfPastWeek(49)"
            property="w49"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w49 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w50 ${getWeekendDates(50)}`"
            :class-name="checkIfPastWeek(50)"
            property="w50"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w50 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w51 ${getWeekendDates(51)}`"
            :class-name="checkIfPastWeek(51)"
            property="w51"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w51 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
           min-width="160"
            :label="`w52 ${getWeekendDates(52)}`"
            :class-name="checkIfPastWeek(52)"
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
// import $ from "jQuery";
import { Table, TableColumn } from "element-ui";
import moment from "moment";
import XLSX from "xlsx";

export default {
  name: "dashboard",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  props: ["tableHeading", "metricsTableData"],
  data() {
    return {
      metricTableDataExportData: [],
      weekIndex: null,
      weekIndexTill: 52,
    };
  },
  computed: {
    metricTableDataExportDataProp() {
      return this.metricTableDataExportData;
    },
  },
  watch: {
    metricsTableData: function() {
      this.createExportCSV();
    },
  },
  methods: {
    exportToExcel() { 
      
      let metricTableDataExportData = XLSX.utils.json_to_sheet(this.metricTableDataExportData) 

      let wb = XLSX.utils.book_new() // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, metricTableDataExportData, 'Weekly Metrics') // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, this.getCSVName()) // name of the file is 'book.xlsx'
    },
    getCSVName() {
      return `Weekly Metrics Table ${moment().format("MM-DD-YYYY")}.xlsx`;
    },
    getWeekendDates(index) {
      return JSON.parse(window.localStorage.getItem("weekendDates"))
        ? `(${moment(
            JSON.parse(window.localStorage.getItem("weekendDates"))[index - 1]
          ).format("MM/DD/YYYY")})`
        : "";
    },
    valueOfWeek() {
      this.weekIndex = $("#weekOfYear").val();
      let option =  document.getElementById("weekOfYearTill").getElementsByTagName("option");
      for (let index = 1; index < this.weekIndex; index++) {
      if (true) {
        option[index].disabled = true;
      }
      }
    },
    valueOfWeekTill() {
      this.weekIndexTill = $("#weekOfYearTill").val();
    },
    resetVal(){
      this.weekIndex=0;
      this.weekIndexTill=52;
      let dropdown1 = $("#weekOfYear")[0];
      let dropdown2 = $("#weekOfYearTill")[0];
      dropdown1.selectedIndex = 0; 
      dropdown2.selectedIndex = 0; 
      },
    checkIfPastWeek(index) {
      let className = "";
            let className1 = "";
      let className2 = "";
      if (this.weekIndex > index) {
        className1 = "disappearWeek";
      }
      if (this.weekIndexTill < index) {
        className2 = "disappearWeek";
      }
      if (moment(new Date()).week() > index) {
        className = "disableWeek";
      }
      return `${className} ${className1} ${className2}`;
    },
    createExportCSV() {
      this.metricTableDataExportData = this.metricsTableData.map((data) => {
        let metricTableRow = {
          "Metrics Name": data.metrics_master.title,
          Yearly: data.yearly_aggregate,
          Q1: data.q1_aggregate,
          Q2: data.q2_aggregate,
          Q3: data.q3_aggregate,
          Q4: data.q4_aggregate,
        };
        metricTableRow[`W1 ${this.getWeekendDates(1)}`] = data.w01;
        metricTableRow[`W2 ${this.getWeekendDates(2)}`] = data.w02;
        metricTableRow[`W3 ${this.getWeekendDates(3)}`] = data.w03;
        metricTableRow[`W4 ${this.getWeekendDates(4)}`] = data.w04;
        metricTableRow[`W5 ${this.getWeekendDates(5)}`] = data.w05;
        metricTableRow[`W6 ${this.getWeekendDates(6)}`] = data.w06;
        metricTableRow[`W7 ${this.getWeekendDates(7)}`] = data.w07;
        metricTableRow[`W8 ${this.getWeekendDates(8)}`] = data.w08;
        metricTableRow[`W9 ${this.getWeekendDates(9)}`] = data.w09;
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
      });
    },
  },
};
</script>
<style>
.disableWeek {
  background: #e8e8e8;
}
.disappearWeek{
  display: none;
}
#weekOfYear{
  margin-top: -28px;
  border: none;
  border: 1px solid rgb(168 156 156);
  width: 150px;
  height: 35px;
  border-radius: 6px;
  margin-left: 15px;
  text-align: justify;
}
#weekOfYearTill{
  margin-top: -28px;
  border: none;
  border: 1px solid rgb(168 156 156);
  width: 150px;
  height: 35px;
  border-radius: 6px;
  margin-left: 15px;
  text-align: justify;
}
.resetbtn{
  margin-top: -25px;
  border: 1px solid rgb(168 156 156);
  width: 100px;
  height: 28px;
  border-radius: 6px;
  margin-left: 15px;
  text-align: center;
  background-color:#0098f0;
  color: white;
}
</style>
