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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.jan"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.jan, scope.$index, 1)"
              >
              </el-input>
              <p v-else>{{ scope.row.jan | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Feb"
            property="feb"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.feb"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.feb, scope.$index, 2)"
              >
              </el-input>
              <p v-else>{{ scope.row.feb | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Mar"
            property="mar"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.mar"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.mar, scope.$index, 3)"
              >
              </el-input>
              <p v-else>{{ scope.row.mar | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Apr"
            property="apr"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.apr"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.apr, scope.$index, 4)"
              >
            </el-input>
              <p v-else>{{ scope.row.apr | toLocaleStr }}</p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="May"
            property="may"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.may"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.may, scope.$index, 5)"
              >
            </el-input>
              <p v-else>{{ scope.row.may | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jun"
            property="jun"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.jun"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.jun, scope.$index, 6)"
              >
            </el-input>
              <p v-else>{{ scope.row.jun | toLocaleStr }}</p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jul"
            property="jul"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.jul"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.jul, scope.$index, 7)"
              >
            </el-input>
              <p v-else>{{ scope.row.jul | toLocaleStr }}</p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Aug"
            property="aug"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.aug"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.aug, scope.$index, 8)"
              >
            </el-input>
              <p v-else>{{ scope.row.aug | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Sep"
            property="sep"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.sep"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.sep, scope.$index, 9)"
              >
            </el-input>
              <p v-else>{{ scope.row.sep | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Oct"
            property="oct"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.oct"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.oct, scope.$index, 10)"
              >
            </el-input>
              <p v-else>{{ scope.row.oct | toLocaleStr }}</p></template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Nov"
            property="nov"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.nov"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.nov, scope.$index, 11)"
              >
            </el-input>
              <p v-else>{{ scope.row.nov | toLocaleStr }}</p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Dec"
            property="dec"
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
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.dec"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.dec, scope.$index, 12)"
              >
            </el-input>
              <p v-else>{{ scope.row.dec | toLocaleStr }}</p></template>
          </el-table-column>
        </el-table>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import moment from "moment";
import XLSX from "xlsx";
export default {
  name: "dashboard",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  props: ["tableHeading", "metricsTableData","checkYear"],
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
      //  this.focusMonth =[innerIndex-1]
      console.log(index,"innerIndex==",innerIndex);
      let month = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
       this.$store.commit("updateManualAdjustment",`${this.checkYear}-${innerIndex}-02`);
       
      const oldTableData = JSON.parse(
        localStorage.getItem("monthlyAdjustmentTableData")
      );
      // console.log("oldTableData[index]::",oldTableData[index][month[innerIndex-1]]);
      if (oldTableData[index][month[innerIndex-1]] !== value) {
        // console.log("oldTableData[index]::",oldTableData[index]);
        this.$emit("EvtAdjValues", {
          new_value: value,
          weekend_date: "2021-12-01",
          old_value: oldTableData[index][month[innerIndex-1]],
          metrics_name: oldTableData[index]["metrics_name"],
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
      let wb = XLSX.utils.book_new(); // make Workbook of Excel
      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(
        wb,
        metricTableDataExportData,
        "Monthly Metrics"
      ); // sheetAName is name of Worksheet
      // export Excel file
      XLSX.writeFile(wb, this.getCSVName()); // name of the file is 'book.xlsx'
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
  mounted() {
  },
};
</script>
<style scope>
.custom-background-metrics-title {
  background: white !important;
}
</style>