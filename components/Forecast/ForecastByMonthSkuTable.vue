<template>
  <card card-body-classes="table-full-width">
    <h4 class="card-title text-bold font-weight-bold">
      {{ tableHeading }}
    </h4>
    <div class="applied-filter-container" v-if="allAppliedFilters.length > 0">
      <h5 class="text-bold font-weight-bold">Applied Filters</h5>
      <Tags :allAppliedFilters="allAppliedFilters" />
    </div>
    <el-table :data="topMonthSkusData.parsedWeeklyData">
      <template
        v-if="
          topMonthSkusData &&
            topMonthSkusData.parsedWeeklyData &&
            topMonthSkusData.parsedWeeklyData.length == '0'
        "
      >
        <div slot="append"></div>
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
          label="jan"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(1) == true"
              autofocus
              v-model="scope.row.data[0][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[0][`${forecast_attribute}`],
                    scope.$index,
                    0
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[0][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[0]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="feb"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(2) == true"
              autofocus
              v-model="scope.row.data[1][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[1][`${forecast_attribute}`],
                    scope.$index,
                    1
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[1][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[1]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="mar"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(3) == true"
              autofocus
              v-model="scope.row.data[2][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[2][`${forecast_attribute}`],
                    scope.$index,
                    2
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[2][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[2]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="apr"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(4) == true"
              autofocus
              v-model="scope.row.data[3][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[3][`${forecast_attribute}`],
                    scope.$index,
                    3
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[3][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[3]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="may"
           
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(5) == true"
              autofocus
              v-model="scope.row.data[4][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[4][`${forecast_attribute}`],
                    scope.$index,
                    4
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[4][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[4]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="jun"
           
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(6) == true"
              autofocus
              v-model="scope.row.data[5][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[5][`${forecast_attribute}`],
                    scope.$index,
                    5
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[5][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[5]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="jul"
           
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(7) == true"
              autofocus
              v-model="scope.row.data[6][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[6][`${forecast_attribute}`],
                    scope.$index,
                    6
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[6][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[6]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="aug"
           
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(8) == true"
              autofocus
              v-model="scope.row.data[7][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[7][`${forecast_attribute}`],
                    scope.$index,
                    7
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[7][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[7]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="sep"
           
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(9) == true"
              autofocus
              v-model="scope.row.data[8][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[8][`${forecast_attribute}`],
                    scope.$index,
                    8
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[8][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[8]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="oct"
           
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(10) == true"
              autofocus
              v-model="scope.row.data[9][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[9][`${forecast_attribute}`],
                    scope.$index,
                    9
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[9][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[9]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="nov"
           
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(11) == true"
              autofocus
              v-model="scope.row.data[10][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[10][`${forecast_attribute}`],
                    scope.$index,
                    10
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[10][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[10]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="dec"
           
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment &&  monthNo(12) == true"
              autofocus
              v-model="scope.row.data[11][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[11][`${forecast_attribute}`],
                    scope.$index,
                    11
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[11][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[11]) }}
            </p>
          </template>
        </el-table-column>

      </template>
    </el-table>
    <button
      class="btn btn-primary pull-right btn-sm"
      @click="handleManualAdjustment"
      v-if="!isManualAdjustment &&
      allowManualAdjustment"
      :disabled="getDisabledAdjustment"
    >
      Manually Adjustment
    </button>
    <button
      @click="submitManualAdjustment"
      class="btn btn-primary pull-right btn-sm"
      v-if="isValueChanged"
    >
      Submitiing Adjustment
    </button>
    <button
      class="btn btn-primary pull-right btn-sm"
      @click="discardSkuChanges"
      v-if="isManualAdjustment"
    >
      Discarding
    </button>
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
    "allowManualAdjustment",
    "forecast_attribute",
    "topMonthSkusData",
    "allAppliedFilters",
    "disbleAdjustment",
    "checkYear"
  ],
  data() {
    return {
      forecastData: [],
      isManualAdjustment: false,
      isDisble: false,
      isValueChanged: false,
      topSkusDataState: localStorage.getItem("topMonthlySkuWiseData"),
      
    };
  },
  computed: {
    getDisabledAdjustment() {
      return this.disbleAdjustment
    }
  },
  methods: {
    submitManualAdjustment() {
      this.isManualAdjustment = false;
      this.isDisble = true;
      this.$emit("createFilterAdjustment");
      this.isValueChanged = false;
    },

    handleManualAdjustment() {
      this.isManualAdjustment = true;
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

    discardSkuChanges() {
      this.$emit("discardSkuChanges");
      this.isManualAdjustment = false;
      this.isValueChanged = false;
      const elements = document.querySelectorAll(".filter-changed");
      elements.forEach(function(item) {
        item.classList.remove("filter-changed");
      });
    },

    handleDataChange(e, forecast_attribute, data, index, innerIndex) {
      console.log("inner", innerIndex);
      console.log("data",data)
      console.log("index",index) 
      this.$store.commit("updateManualAdjustment",`${this.checkYear}-${innerIndex+1}-02`);
      const oldData = JSON.parse(localStorage.getItem("topMonthlySkuWiseData"))[index]
        .data[innerIndex];
      console.log(oldData,"oldData");
      console.log("forecast_attribute",forecast_attribute);
      if (Number(data) !== Number(oldData[`${forecast_attribute}`])) {  
        this.isValueChanged = true;
        e.target.classList.add("filter-changed");
        e.target.style.border = "none";
        e.target.parentNode.parentNode.classList.add(
          "filter-changed"
        );
        this.$emit("getMonthAdjustmentChanges", {
          adjusted_metrics_name: forecast_attribute,
          weekend:new Date(`${this.checkYear}-${innerIndex+1}-02`),
          before_adjustment_value: parseFloat(oldData[`${forecast_attribute}`]),
          new_adjusted_value: parseFloat(data),
          filter_skus: oldData?.sku,
        });
         console.log("olddata",oldData[`${forecast_attribute}`]);
        console.log("olddatafA",[`${forecast_attribute}`]);
        console.log("newvalue",data)
      }
    },

        getPercent(forecast_attribute, rowData) {
      if (forecast_attribute != "aur" && rowData[forecast_attribute] != 0) {  
        if(rowData[`total_${forecast_attribute}`]!=0) {
           let percent =
          (rowData[forecast_attribute] /
            rowData[`total_${forecast_attribute}`]) *
          100;
        return `(${percent.toFixed(2)}%)`;
        } else{
          return `(0%)`
        }
      } else {
        return "";
      }
    },
    async getFilteredForecastData(forecastYear) {
      // const data = await this.$axios.$get(`/get-filtered-forecast-data/${forecastYear}`);
      // this.forecastData = data;
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
.filter-changed {
  background-color: rgb(233, 206, 140);
}
</style>
