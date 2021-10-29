<template>
  <div class="row filteredForecastMetrics">
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
        <div
          class="applied-filter-container"
          v-if="allAppliedFilters.length > 0"
        >
          <h5 class="text-bold font-weight-bold">Applied Filters</h5>
          <Tags :allAppliedFilters="allAppliedFilters" />
        </div>
        <el-table :data="filteredForecastMetrics.parsedFilteredForecastData">
          <template v-if="filteredForecastMetrics && !filteredForecastMetrics.parsedFilteredForecastData">
            <div slot="append" :style="'text-align: center;'">
              Loading {{ tableHeading }} ...
            </div>
          </template>
          <template v-else>
            <el-table-column
              min-width="170"
              sortable
              label="Metrics Name"
              property="Metrics Name"
              class-name="metrics-fix-header"
              fixed
            >
            </el-table-column>
            <el-table-column
              min-width="170"
              sortable
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
              min-width="150"
              sortable
              label="Jan"
              property="w1"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(0)"
            >
              <template slot-scope="scope">{{
                scope.row.w1 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Feb"
              property="w2"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(1)"
            >
              <template slot-scope="scope">{{
                scope.row.w2 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Mar"
              property="w3"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(2)"
            >
              <template slot-scope="scope">{{
                scope.row.w3 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Apr"
              property="w4"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(3)"
            >
              <template slot-scope="scope">{{
                scope.row.w4 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="May"
              property="w5"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(4)"
            >
              <template slot-scope="scope">{{
                scope.row.w5 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Jun"
              property="w6"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(5)"
            >
              <template slot-scope="scope">{{
                scope.row.w6 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Jul"
              property="w7"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(6)"
            >
              <template slot-scope="scope">{{
                scope.row.w7 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Aug"
              property="w8"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(7)"
            >
              <template slot-scope="scope">{{
                scope.row.w8 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Sep"
              property="w9"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(8)"
            >
              <template slot-scope="scope">{{
                scope.row.w9 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Oct"
              property="w10"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(9)"
            >
              <template slot-scope="scope">{{
                scope.row.w10 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Nov"
              property="w11"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(10)"
            >
              <template slot-scope="scope">{{
                scope.row.w11 | toLocaleStr
              }}</template>
            </el-table-column>
            <el-table-column
              min-width="150"
              sortable
              label="Dec"
              property="w12"
              align="right"
              class="monthOfYear"
              :class-name="checkIfPastMonth(11)"
            >
              <template slot-scope="scope">{{
                scope.row.w12 | toLocaleStr
              }}</template>
            </el-table-column>
          </template>  
        </el-table>
      </card>
    </div>
  </div>
</template>
<script>
// import $ from "jQuery";
import { Table, TableColumn } from "element-ui";
import Tags from "../../components/Tags.vue";
import moment from "moment";
import XLSX from "xlsx";

export default {
  name: "FilteredMonthlyMetricsTable",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Tags,
  },
  props: ["tableHeading", "filteredForecastMetrics", "allAppliedFilters", "filterArray"],
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
    filteredForecastMetrics: function() {
      this.createExportCSV();
    },
  },
  methods: {
    exportToExcel() { 
      
      let metricTableDataExportData = XLSX.utils.json_to_sheet(this.metricTableDataExportData);
      let filterArray = XLSX.utils.json_to_sheet(this.filterArray);

      let wb = XLSX.utils.book_new() // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, filterArray, "Applied Filters");
      XLSX.utils.book_append_sheet(wb, metricTableDataExportData, 'Filtered Monthly Metrics') // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, this.getCSVName()) // name of the file is 'book.xlsx'
    },
        valueChange() {
      this.monthIndex = $("#monthName").val();
      console.log(this.monthIndex);
    },
    valueChangeTill() {
      this.monthIndexTill = $("#monthNameTill").val();
      console.log(this.monthIndexTill);
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
      return `Filtered Monthly Metrics Table ${moment().format("MM-DD-YYYY")}.xlsx`;
    },
    createExportCSV() {
      if(this.filteredForecastMetrics && this.filteredForecastMetrics.parsedFilteredForecastData) {
        this.metricTableDataExportData = this.filteredForecastMetrics.parsedFilteredForecastData.map(
          (data) => {
            let metricTableRow = {
              "Metrics Name": data["Metrics Name"],
              Yearly: data.yearly_aggregate,
              Q1: data.Q1,
              Q2: data.Q2,
              Q3: data.Q3,
              Q4: data.Q4,
              January: data.w1,
              February: data.w2,
              March: data.w3,
              April: data.w4,
              May: data.w5,
              June: data.w6,
              July: data.w7,
              August: data.w8,
              September: data.w9,
              October: data.w10,
              November: data.w11,
              December: data.w12,
            };
            return metricTableRow;
          }
        );
      }
    },
  },
};
</script>
<style>
.filteredForecastMetrics .el-table__empty-block {
  display: none!important;
}
.disablemonth {
  background: #e8e8e8;
}
.disappearMonth {
  display: none;
}
#monthName {
  border: none;
  border: 1px solid rgb(168 156 156);
  width: 150px;
  height: 35px;
  border-radius: 6px;
  margin-left: 15px;
  text-align: justify;
}
#monthNameTill {
  border: none;
  border: 1px solid rgb(168 156 156);
  width: 150px;
  height: 35px;
  border-radius: 6px;
  margin-left: 15px;
  text-align: justify;
}
</style>
