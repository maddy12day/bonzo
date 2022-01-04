<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="col-md-12 text-right p-0">
        <br />
        <a>
          <button
            v-if="metricTableDataExportDataProp.length > 0"
            class="mt-1 btn btn-sm"
            style="line-height: 1"
            @click="exportToExcel"
          >
            Download Excel
          </button>
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
          <template
            v-if="
              filteredForecastMetrics &&
              !filteredForecastMetrics.parsedFilteredForecastData
            "
          >
            <div slot="append" :style="'text-align: center;'">
              Loading {{ tableHeading }} ...
            </div>
          </template>
          <el-table-column
            min-width="185"
            label="Metrics Name"
            property="Metrics Name"
            class-name="metrics-fix-header"
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
            property="Q1"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.Q1 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q2"
            property="Q2"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.Q2 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q3"
            property="Q3"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.Q3 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q4"
            property="Q4"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.Q4 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jan"
            property="w1"
            align="right"
          >
            <template slot-scope="scope">
                <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                  monthNo(1) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w1"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w1, scope.$index, 1)"
              >
              </el-input>
              <p v-else>{{ scope.row.w1 | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Feb"
            property="w2"
            align="right"
          >
            <template slot-scope="scope">   
                <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                  monthNo(2) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w2"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w2, scope.$index, 2)"
              >
              </el-input>
              <p v-else>{{ scope.row.w2 | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Mar"
            property="w3"
            align="right"
          >
            <template slot-scope="scope">         
                <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                  monthNo(3) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w3"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w3, scope.$index, 3)"
              >
              </el-input>
              <p v-else>{{ scope.row.w3 | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Apr"
            property="w4"
            align="right"
          >
            <template slot-scope="scope">
            <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                  monthNo(4) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w4"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w4, scope.$index, 4)"
              >
            </el-input>
              <p v-else>{{ scope.row.w4 | toLocaleStr }}</p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="May"
            property="w5"
            align="right"
          >
            <template slot-scope="scope">  
                <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                 monthNo(5) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w5"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w5, scope.$index, 5)"
              >
            </el-input>
              <p v-else>{{ scope.row.w5 | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jun"
            property="w6"
            align="right"
          >
            <template slot-scope="scope">
            <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                 monthNo(6) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w6"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w6, scope.$index, 6)"
              >
            </el-input>
              <p v-else>{{ scope.row.w6 | toLocaleStr }}</p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jul"
            property="w7"
            align="right"
          >
            <template slot-scope="scope">
           <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                 monthNo(7) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w7"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w7, scope.$index, 7)"
              >
            </el-input>
              <p v-else>{{ scope.row.w7 | toLocaleStr }}</p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Aug"
            property="w8"
            align="right"
          >
            <template slot-scope="scope">           
                <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                 monthNo(8) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w8"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w8, scope.$index, 8)"
              >
            </el-input>
              <p v-else>{{ scope.row.w8 | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Sep"
            property="w9"
            align="right"
          >
            <template slot-scope="scope">  
                <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                  monthNo(9) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w9"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w9, scope.$index, 9)"
              >
            </el-input>
              <p v-else>{{ scope.row.w9 | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Oct"
            property="w10"
            align="right"
          >
            <template slot-scope="scope">
                <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                 monthNo(10) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w10"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w10, scope.$index, 10)"
              >
            </el-input>
              <p v-else>{{ scope.row.w10 | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Nov"
            property="w11"
            align="right"
          >
            <template slot-scope="scope">
            <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                 monthNo(11) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w11"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w11, scope.$index, 11)"
              >
            </el-input>
              <p v-else>{{ scope.row.w11 | toLocaleStr }}</p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Dec"
            property="w12"
            align="right"
          >
            <template slot-scope="scope">
                <el-input
                autofocus
                :class="`weekend-${monthNo()}`"
                type="number"
                v-if="
                 monthNo(12) == true &&
                    !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',  
                      'Units Sales Build',
                    ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w12"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w12, scope.$index, 12)"
              >
            </el-input>
              <p v-else>{{ scope.row.w12 | toLocaleStr }}</p></template>
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
import XLSX from "xlsx";
export default {
  name: "FilterMonthlyManualAdjustment",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Tags,
  },
  props: ["tableHeading","checkYear","allAppliedFilters","filteredForecastMetrics","filterArray"],
  data() {
    return {
      metricTableDataExportData: [],
       isDisble: false,
       focusMonth:null,
    };
  },
  computed: {
    metricTableDataExportDataProp() {
      return this.metricTableDataExportData;
    },
  },
  watch: {
    metricsTableData: function () {
      this.createExportCSV();
    },
  },
  methods: {
         onFocus() {
      document.querySelector(`.weekend-${this.monthNo()}`).focus();
    },
    monthNo(num) {
    const d = new Date();
    let year = d.getFullYear();
      if(year>=this.checkYear){ 
          return (moment(new Date()).month())<num;
      } else{
        return true;
      }
    },
     onDataChange(e, value, index, innerIndex) {
     let month = ['w1','w2','w3','w4','w5','w6','w7','w8','w9','w10','w11','w12'];
       this.$store.commit("updateManualAdjustment",`${this.checkYear}-${innerIndex}-02`);
      const oldTableData = JSON.parse(
        localStorage.getItem("filterMetricsOldTableDataMWM")
      );
      console.log("olddata",oldTableData)
      if (oldTableData.parsedFilteredForecastData[index][month[innerIndex-1]] !== value) {
        this.$emit("EvtAdjValues", {
          new_value: value,
          weekend_date: `${this.checkYear}-${innerIndex}-02`,
          old_value: oldTableData.parsedFilteredForecastData[index][month[innerIndex-1]],
          metrics_name: oldTableData.parsedFilteredForecastData[index]["Metrics Slug"],
          ele: e.target.parentNode.parentNode.parentNode,
        });
        e.target.parentNode.parentNode.parentNode.style.background = "#ffeacb";
        this.isDisble = true;
      } else {
        this.isDisble = false;
      }
    },
    exportToExcel() {
      let metricTableDataExportData = XLSX.utils.json_to_sheet(
        this.metricTableDataExportData
      );
       let filterArray = XLSX.utils.json_to_sheet(this.filterArray);
      let wb = XLSX.utils.book_new(); // make Workbook of Excel
      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(
        wb,
        filterArray,
        "Monthly Metrics"
      );
        XLSX.utils.book_append_sheet(
        wb,
        metricTableDataExportData,
        "Filtered Weekly Metrics"
      ); // sheetAName is name of Worksheet
      // export Excel file
      XLSX.writeFile(wb, this.getCSVName()); // name of the file is 'book.xlsx'
    },
    getCSVName() {
      return `Monthly Metrics Table ${moment().format("MM-DD-YYYY")}.xlsx`;
    },
    createExportCSV() {
      this.metricTableDataExportData = this.filteredForecastMetrics.parsedFilteredForecastData.map((data) => {
        let metricTableRow = {
          "Metrics Name":data["Metrics Name"],
          Yearly: data.yearly_aggregate,
          Q1: data.Q1,
          Q2: data.Q1,
          Q3: data.Q1,
          Q4: data.Q1,
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
      });
    },
    classChecker({ row, column }) {
      return "custom-background-metrics-title";
    },
  },
  mounted() {
  },
};
</script>
<style scope>
.custom-background-metrics-title {
  background: white !important;
}
</style>