<template>
  <div class="row">
    <el-dialog :visible.sync="showDialog" width="80%" class="scenario-dialog">
      <h3 slot="title" class="mb-0">
        <i class="el-icon-info"></i>&nbsp;Scenario Preview
      </h3>
      <card class="overflow-auto scenario-details-table">
        Scenario Details
        <table
          class="table table-bordered preview-table"
          style="word-break: break-word;"
        >
          <thead style="word-wrap: break-word;">
            <tr class="scenario-details-header">
              <th v-if="scenarioDetails.scenario_name">Name</th>
              <th v-if="scenarioDetails.status">Status</th>
              <th v-if="scenarioDetails.scenario_type">Type</th>
              <th v-if="scenarioDetails.amount">Amount</th>
              <th v-if="scenarioDetails.start_date">Start Date</th>
              <th v-if="scenarioDetails.end_date">End Date</th>
              <th v-if="scenarioDetails.filter_level">Filter Level</th>
              <th v-if="scenarioDetails.filter_product_sources">
                Product Sources
              </th>
              <th v-if="scenarioDetails.filter_brand_types">Brand Types</th>
              <th v-if="scenarioDetails.filter_life_cycles">Life Cycles</th>
              <th v-if="scenarioDetails.filter_newness">Newness</th>
              <th v-if="scenarioDetails.filter_brands">Brand</th>
              <th v-if="scenarioDetails.filter_channels">Channels</th>
              <th v-if="scenarioDetails.filter_sub_channels">Sub Channels</th>
              <th v-if="scenarioDetails.filter_collections">Collections</th>
              <th v-if="scenarioDetails.filter_programs">Programs</th>
              <th v-if="scenarioDetails.filter_categories">Categories</th>
              <th v-if="scenarioDetails.filter_classes">Classes</th>
              <th v-if="scenarioDetails.filter_sub_classes">Sub Classes</th>
              <th v-if="scenarioDetails.filter_skus">Skus</th>
              <th v-if="scenarioDetails.created_at">created at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-if="scenarioDetails.scenario_name">
                {{ scenarioDetails.scenario_name }}
              </td>
              <td v-if="scenarioDetails.status">
                {{ scenarioDetails.status }}
              </td>
              <td v-if="scenarioDetails.scenario_type">
                {{ scenarioDetails.scenario_type }}
              </td>
              <td v-if="scenarioDetails.amount">
                {{ scenarioDetails.amount }}
              </td>
              <td v-if="scenarioDetails.start_date">
                {{ formatDate(scenarioDetails.start_date) }}
              </td>
              <td v-if="scenarioDetails.end_date">
                {{ formatDate(scenarioDetails.end_date) }}
              </td>
              <td v-if="scenarioDetails.filter_level">
                {{ scenarioDetails.filter_level }}
              </td>
              <td v-if="scenarioDetails.filter_product_sources">
                {{ scenarioDetails.filter_product_sources }}
              </td>
              <td v-if="scenarioDetails.filter_brand_types">
                {{ scenarioDetails.filter_brand_types }}
              </td>
              <td v-if="scenarioDetails.filter_life_cycles">
                {{ scenarioDetails.filter_life_cycles }}
              </td>
              <td v-if="scenarioDetails.filter_newness">
                {{ scenarioDetails.filter_newness }}
              </td>
              <td v-if="scenarioDetails.filter_brands">
                {{ scenarioDetails.filter_brands }}
              </td>
              <td v-if="scenarioDetails.filter_channels">
                {{ scenarioDetails.filter_channels }}
              </td>
              <td v-if="scenarioDetails.filter_sub_channels">
                {{ scenarioDetails.filter_sub_channels }}
              </td>
              <td v-if="scenarioDetails.filter_collections">
                {{ scenarioDetails.filter_collections }}
              </td>
              <td v-if="scenarioDetails.filter_programs">
                {{ scenarioDetails.filter_programs }}
              </td>
              <td v-if="scenarioDetails.filter_categories">
                {{ scenarioDetails.filter_categories }}
              </td>
              <td v-if="scenarioDetails.filter_classes">
                {{ scenarioDetails.filter_classes }}
              </td>
              <td v-if="scenarioDetails.filter_sub_classes">
                {{ scenarioDetails.filter_sub_classes }}
              </td>
              <td v-if="scenarioDetails.filter_skus">
                {{ scenarioDetails.filter_skus }}
              </td>
              <td v-if="scenarioDetails.created_at">
                {{ formatDate(scenarioDetails.created_at) }}
              </td>
            </tr>
          </tbody>
        </table>
        <span slot="footer" class="dialog-footer">
          <div class="text-right" v-if="!isSystemLocked">
            <button
              class="btn btn-primary"
              @click="shareScenario"
              v-if="
               !lockSystem &&
                !currentScenarioStatus.is_shared &&
                  currentScenarioStatus.status == 'Completed'
              "
            >
              Share Scenario
            </button>
            <button
              class="btn btn-primary"
              @click="unshareScenario"
              v-if="
              !lockSystem &&
                currentScenarioStatus.is_shared &&
                  currentScenarioStatus.status == 'Completed' &&
                  previewBtnText == 'Share Scenario'
              "
            >
              Unshare Scenario
            </button>

            <button
              class="btn btn-primary"
              @click="shareScenario"
              v-if="
              !lockSystem &&
                currentScenarioStatus.is_shared &&
                  currentScenarioStatus.status == 'Completed' &&
                  previewBtnText == 'Merge Scenario'
              "
            >
              Merge Scenario
            </button>
            <button
              class="btn btn-primary"
              @click="activateMergedScenario"
              v-if="
              !lockSystem &&
                currentScenarioStatus.is_shared &&
                  currentScenarioStatus.status == 'Merge Completed' &&
                  previewBtnText == 'Merge Scenario' &&
                  !scenarioDetails.is_part_of_base
              "
            >
              Activate as New Base
            </button>
            <!-- <button
            class="btn btn-primary"
            @click="shareScenario"
            v-if="
              currentScenarioStatus.status == 'Merge Completed' &&
              currentScenarioStatus.status !== 'Completed' &&
              previewBtnText == 'Merge Scenario' &&
              currentScenarioStatus.is_shared
            "
          >
            Unmerge Scenario
          </button> -->
            <!-- <button class="btn btn-primary" @click="showDialog = false">
            Close
          </button> -->
          </div>
        </span>
      </card>
      <card
        card-body-classes="table-full-width"
        v-if="scenarioSalesSummary.result.length > 0"
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Sales Summary Revenue
        </h4>
        <el-table :data="scenarioSalesSummary.result">
          <el-table-column
            min-width="150"
            label="Planned TY"
            property="planned_revenue"
            align="right"
          >
            <template slot-scope="scope">
              ${{
                scope.row.planned_revenue
                  ? scope.row.planned_revenue.toFixed()
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Forecast TY"
            property="forecasted_revenue"
            align="right"
          >
            <template slot-scope="scope">
              ${{
                scope.row.forecasted_revenue
                  ? scope.row.forecasted_revenue.toFixed()
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Adjusted TY"
            property="adjusted_revenue"
            align="right"
          >
            <template slot-scope="scope">
              ${{
                scope.row.adjusted_revenue
                  ? scope.row.adjusted_revenue.toFixed()
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Planned GM(%)"
            property="planned_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_gm_percent
                  ? scope.row.planned_gm_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Forecast GM(%)"
            property="forecasted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.forecasted_gm_percent
                  ? scope.row.forecasted_gm_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Adjusted GM(%)"
            property="adjusted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_gm_percent
                  ? scope.row.adjusted_gm_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
        </el-table>
      </card>

      <card
        card-body-classes="table-full-width"
        v-if="scenarioSalesSummary.result.length > 0"
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Sales Summary Units
        </h4>
        <el-table :data="scenarioSalesSummary.result">
          <el-table-column
            min-width="150"
            label="Planned TY"
            property="planned_units"
            align="right"
          >
            <template slot-scope="scope">
              {{ parseInt(scope.row.planned_units.toFixed(0)) | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Forecast TY"
            property="forecasted_units"
            align="right"
          >
            <template slot-scope="scope">
              {{ parseInt(scope.row.forecasted_units.toFixed(0)) | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Adjusted TY"
            property="adjusted_units"
            align="right"
          >
            <template slot-scope="scope">
              {{ parseInt(scope.row.adjusted_units.toFixed(0)) | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Planned GM(%)"
            property="planned_gm_percent"
            align="right"
            ><template slot-scope="scope">
              {{
                scope.row.planned_gm_percent
                  ? scope.row.planned_gm_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Forecast GM(%)"
            property="forecasted_gm_percent"
            align="right"
            ><template slot-scope="scope">
              {{
                scope.row.forecasted_gm_percent
                  ? scope.row.forecasted_gm_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Adjusted GM(%)"
            property="adjusted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_gm_percent
                  ? scope.row.adjusted_gm_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
        </el-table>
      </card>

      <card
        card-body-classes="table-full-width"
        v-if="
          scenarioCategorySalesComparison.result &&
            scenarioCategorySalesComparison.result.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Category Total Sales Comparison
        </h4>
        <el-table :data="scenarioCategorySalesComparison.result">
          <el-table-column
            min-width="180"
            sortable
            label="Name"
            property="level_value"
          >
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Planned"
            property="planned_revenue"
            align="right"
          >
            <template slot-scope="scope">
              ${{
                scope.row.planned_revenue
                  ? scope.row.planned_revenue.toFixed()
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Forecast"
            property="forecasted_revenue"
            align="right"
          >
            <template slot-scope="scope">
              ${{
                scope.row.forecasted_revenue
                  ? scope.row.forecasted_revenue.toFixed(0)
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Adjusted"
            property="adjusted_revenue"
            align="right"
          >
            <template slot-scope="scope">
              ${{
                scope.row.adjusted_revenue
                  ? scope.row.adjusted_revenue.toFixed(0)
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Planned(%)"
            property="planned_revenue_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_revenue_percent
                  ? scope.row.planned_revenue_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="190"
            sortable
            label="Forecast(%)"
            property="forecasted_revenue_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.forecasted_revenue_percent
                  ? scope.row.forecasted_revenue_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="190"
            sortable
            label="Adjusted(%)"
            property="adjusted_revenue_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_revenue_percent
                  ? scope.row.adjusted_revenue_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="170"
            sortable
            label="Planned GM(%)"
            property="planned_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_gm_percent
                  ? scope.row.planned_gm_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="170"
            sortable
            label="Forecast GM(%)"
            property="forecasted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.forecasted_gm_percent
                  ? scope.row.forecasted_gm_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="170"
            sortable
            label="Adjusted GM(%)"
            property="adjusted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_gm_percent
                  ? scope.row.adjusted_gm_percent.toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
        </el-table>
      </card>
       <card
        card-body-classes="table-full-width preview-table"
        v-if="
          scenarioUnitSalesComparison.parsedData &&
            scenarioUnitSalesComparison.parsedData.Revenue.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
           Revenue Comparison
        </h4>
        <table
          class="bg-danger table table-bordered bg-white preview-table overflow-auto"
          style="overflow-x: scroll"
        >
          <thead v-if="scenarioUnitSalesComparison.parsedData">
            <tr>
              <th
                v-for="(col, index2) in Object.keys(
                  this.scenarioUnitSalesComparison.parsedData.Revenue[0]
                )"
                :key="Math.random(index2, 300)"
                :class="{ fixedWidth: index2 === 0 }"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody v-if="scenarioUnitSalesComparison.parsedData">
            <tr
              v-for="(col2, index) in scenarioUnitSalesComparison.parsedData
                .Revenue"
              :key="Math.random(index, 100)"
            >
              <td
                v-for="(col2, index) in Object.values(col2)"
                :key="Math.random(index, 200)"
              >
                {{ index > 0 ? col2.toFixed() : col2 }}
              </td>
            </tr>
          </tbody>
        </table>
      </card>

      <card
        card-body-classes="table-full-width preview-table"
        v-if="
          scenarioUnitSalesComparison.parsedData &&
            scenarioUnitSalesComparison.parsedData.Units.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
           Units Comparison
        </h4>
        <table
          class="bg-danger table table-bordered bg-white preview-table overflow-scroll"
          style="overflow-x: scroll"
        >
          <thead>
            <tr>
              <th
                v-for="(col, index2) in Object.keys(
                  this.scenarioUnitSalesComparison.parsedData.Units[0]
                )"
                :key="Math.random(index2, 300)"
                :class="{ fixedWidth: index2 === 0 }"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody v-if="scenarioUnitSalesComparison.parsedData">
            <tr
              v-for="(col2, index) in scenarioUnitSalesComparison.parsedData
                .Units"
              :key="Math.random(index, 100)"
            >
              <td
                v-for="(col2, index) in Object.values(col2)"
                :key="Math.random(index, 200)"
              >
                {{ index > 0 ? parseInt(col2) : col2 }}
              </td>
            </tr>
          </tbody>
        </table>
      </card>
     
    </el-dialog>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog } from "element-ui";
import moment from "moment";

export default {
  name: "dashboard",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dialog.name]: Dialog,
  },
  props: [
    "scenarioSalesSummary",
    "scenarioUnitSalesComparison",
    "scenarioCategorySalesComparison",
    "scenarioCategoryComparison",
    "dialogVisible",
    "previewBtnText",
    "scenarioDetails",
    "currentScenarioStatus",
  ],
  data() {
    return {
      showDialog: false,
      typeColor: ["", "info", "success", "warning", "danger"],
      lockSystem:JSON.parse(localStorage.getItem("isSystemLock")),
    };
  },
  mounted(){
   this.lockSystem=JSON.parse(localStorage.getItem("isSystemLock"));
    console.log(typeof(this.lockSystem));
  },

  methods: {
    formatDate(date) {
      return moment(date).format("MM-DD-YYYY");
    },
    notifyVue(verticalAlign, horizontalAlign, message) {
      let color = 2;
      this.$notify({
        message: message,
        timeout: 12000,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.typeColor[color],
      });
    },
    async activateMergedScenario() {
      //activate-is-part-of-base
      this.activateIsPartOfBase = await this.$axios.$get(
        `/activate-is-part-of-base/${this.scenarioDetails.id}`
      );
      this.showDialog = false;
      this.notifyVue(
        "top",
        "right",
        "Submitted scenario to model for merging with base. Check Scenario table for updates."
      );
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    unshareScenario() {
      this.$emit("unshareScenarioEvt");
      this.showDialog = false;
    },
    shareScenario() {
      this.$emit("shareScenarioEvt");
      this.showDialog = false;
    },
  },
  computed: {
    isSystemLocked(){
      return this.$store.state.isSystemLocked;
    },  
  },
  watch: {
    showDialog: function() {
      if (!this.showDialog) {
        this.$emit("dialogVisible", false);
      }
    },
  },
  created() {
    this.showDialog = this.dialogVisible;
  },
};
</script>
<style lang="scss" scoped>
.el-dialog {
  background: #f5f6fa;
}
.scenario-details-header th {
  font-size: 12px !important;
}

.scenario-details-table {
  position: sticky;
  top: 0;
  z-index: 100;
}

.preview-table {
  display: inline-table;
  overflow-x: auto;
  white-space: nowrap;
}

.scenario-dialog {
  .el-dialog {
    height: 95%;
    overflow-y: auto;
    margin-top: 20px !important;
  }
}

.fixedWidth {
  width: 200px;
}
</style>

<style>
[card-body-classes="table-full-width preview-table"] .card-body {
  overflow-x: auto;
  width: 100%;
}
</style>
