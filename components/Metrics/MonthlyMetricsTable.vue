<template>
  <div class="row">
    <select name="monthName" id="monthName" v-on:change="valueChange()">
      <option value="0" selected disabled>FROM</option>
      <option value="1">Jan</option>
      <option value="2">Feb</option>
      <option value="3">Mar</option>
      <option value="4">Apr</option>
      <option value="5">May</option>
      <option value="6">Jun</option>
      <option value="7">Jul</option>
      <option value="8">Aug</option>
      <option value="9">Sep</option>
      <option value="10">Oct</option>
      <option value="11">Nov</option>
      <option value="12">Dec</option>
    </select>
    <select name="monthName" id="monthNameTill" v-on:change="valueChangeTill()">
      <option value="0" selected disabled>TILL</option>
      <option value="1">Jan</option>
      <option value="2">Feb</option>
      <option value="3">Mar</option>
      <option value="4">Apr</option>
      <option value="5">May</option>
      <option value="6">Jun</option>
      <option value="7">Jul</option>
      <option value="8">Aug</option>
      <option value="9">Sep</option>
      <option value="10">Oct</option>
      <option value="11">Nov</option>
      <option value="12">Dec</option>
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
            sortable
            label="Metrics Name"
            property="metrics_master.title"
            class-name="metrics-fix-header"
            cell-class-name="el-table-custom-background-cell"
            :editablecontent="true"
            fixed
          >
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Yearly"
            property="yearly_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.yearly_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q1"
            property="q1_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.q1_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q2"
            property="q2_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.q2_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q3"
            property="q3_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.q3_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q4"
            property="q4_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.q4_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jan"
            property="jan"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(0)"
          >
            <template slot-scope="scope">{{
              scope.row.jan | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Feb"
            property="feb"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(1)"
          >
            <template slot-scope="scope">{{
              scope.row.feb | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Mar"
            property="mar"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(2)"
          >
            <template slot-scope="scope">{{
              scope.row.mar | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Apr"
            property="apr"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(3)"
          >
            <template slot-scope="scope">{{
              scope.row.apr | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="May"
            property="may"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(4)"
          >
            <template slot-scope="scope">{{
              scope.row.may | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jun"
            property="jun"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(5)"
          >
            <template slot-scope="scope">{{
              scope.row.jun | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jul"
            property="jul"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(6)"
          >
            <template slot-scope="scope">{{
              scope.row.jul | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Aug"
            property="aug"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(7)"
          >
            <template slot-scope="scope">{{
              scope.row.aug | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Sep"
            property="sep"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(8)"
          >
            <template slot-scope="scope">{{
              scope.row.sep | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Oct"
            property="oct"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(9)"
          >
            <template slot-scope="scope">{{
              scope.row.oct | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Nov"
            property="nov"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(10)"
          >
            <template slot-scope="scope">{{
              scope.row.nov | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Dec"
            property="dec"
            align="right"
            class="monthOfYear"
            :class-name="checkIfPastMonth(11)"
          >
            <template slot-scope="scope">{{
              scope.row.dec | toLocaleStr
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
      monthIndex: null,
      monthIndexTill: 12,
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
      XLSX.utils.book_append_sheet(wb, metricTableDataExportData, 'Monthly Metrics') // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, this.getCSVName()) // name of the file is 'book.xlsx'
    },
    valueChange() {
      this.monthIndex = $("#monthName").val();
      let option =  document.getElementById("monthNameTill").getElementsByTagName("option");
      for (let index = 1; index < this.monthIndex; index++) {
        option[index].disabled = true;
      }
    },
    valueChangeTill() {
      this.monthIndexTill = $("#monthNameTill").val();
      let option =  document.getElementById("monthName").getElementsByTagName("option");
      for (let index = this.monthIndexTill; index < 13 ; index++) {
        option[index].disabled = true;
      }
    },
      resetVal(){
        this.monthIndex = 0;
        this.monthIndexTill =12;
        let dropdown1 = $("#monthName")[0];
        let dropdown2 = $("#monthNameTill")[0];
        dropdown1.selectedIndex = 0; 
        dropdown2.selectedIndex = 0; 
      let option =  document.getElementById("monthNameTill").getElementsByTagName("option");
        for (let index = 1; index < 13; index++) {
        option[index].disabled = false;
      }
      let option1 =  document.getElementById("monthName").getElementsByTagName("option");
        for (let index = 1; index < 13; index++) {
        option1[index].disabled = false;
      }
      },
    checkIfPastMonth(index) {
      let className = "";
      let className1 = "";
      let className2 = "";
      if (this.monthIndex - 1 > index) {
        // document.getElementsByClassName("monthOfYear")[0].classList.add("disappearMonth");
        className1 = "disappearMonth";
        console.log("num");
      }
      if (this.monthIndexTill - 1 < index) {
        className2 = "disappearMonth";
        console.log("num");
      }
      if (new Date().getMonth() > index) {
        className = "disablemonth ";
      }
      return `${className} ${className1} ${className2}`;
    },
    getCSVName() {
      return `Monthly Metrics Table ${moment().format("MM-DD-YYYY")}.xlsx`;
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
          January: data.jan,
          February: data.feb,
          March: data.mar,
          April: data.apr,
          May: data.may,
          June: data.jun,
          July: data.jul,
          August: data.aug,
          September: data.sep,
          October: data.oct,
          November: data.nov,
          December: data.dec,
        };
        return metricTableRow;
      });
    },
    classChecker({ row, column }) {
      return "custom-background-metrics-title";
    },
  },
  mounted() {},
};
</script>
<style scope>
.custom-background-metrics-title {
  background: white !important;
}
.disablemonth {
  background: #e8e8e8;
}
.disappearMonth {
  display: none;
}
#monthName {
  position: absolute;
  top: 9px;
  border: 1px solid rgb(168 156 156);
  width: 150px;
  height: 35px;
  border-radius: 6px;
  margin-left: 15px;
  text-align: justify;
}
#monthNameTill {
  position: absolute;
  top: 9px;
  left: 157px;
  border: 1px solid rgb(168 156 156);
  width: 150px;
  height: 35px;
  border-radius: 6px;
  margin-left: 15px;
  text-align: justify;
}
.resetbtn{
  position: absolute;
  top: 12px;
  left: 315px;
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
