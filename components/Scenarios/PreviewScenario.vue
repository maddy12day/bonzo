<template>
  <div class="row">
    <el-dialog :visible.sync="showDialog" width="80%">
      <h3 slot="title" class="mb-0">
        <i class="el-icon-info"></i>&nbsp;Scenario Preview
      </h3>
      <card>
        Scenario Details
        <table class="table table-bordered" style="word-break: break-word;">
          <thead style="word-wrap: break-word;">
            <tr class="scenario-details-header">
              <th
                v-for="(value, index) in Object.keys(scenarioDetails)"
                :key="Math.random(index, 100)"
              >
                {{ value && value.includes('filter_')? value.replace(/filter_/g, "").replace(/_/g, " "): value }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-for="(value, index) in scenarioDetails"
                :key="Math.random(index, 100)"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
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
            sortable
            label="Planned Sales TY"
            property="planned_revenue"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_revenue
                  ? scope.row.planned_revenue.toFixed(2)
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast Sales TY"
            property="forecasted_revenue"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.forecasted_revenue
                  ? scope.row.forecasted_revenue.toFixed(2)
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted Sales TY"
            property="adjusted_revenue"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_revenue
                  ? scope.row.adjusted_revenue.toFixed(2)
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Planned  Sales GM"
            property="planned_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_gm_percent
                  ? (scope.row.planned_gm_percent.toFixed(2) * 100).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast Sales GM"
            property="forecasted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.forecasted_gm_percent
                  ? (scope.row.forecasted_gm_percent.toFixed(2) * 100).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted Sales GM"
            property="adjusted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_gm_percent
                  ? (scope.row.adjusted_gm_percent.toFixed(2) * 100).toFixed(2)
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
            sortable
            label="Planned Sales TY"
            property="planned_units"
            align="right"
          >
            <template slot-scope="scope">
              {{ parseInt(scope.row.planned_units) | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast Sales TY"
            property="forecasted_units"
            align="right"
          >
            <template slot-scope="scope">
              {{ parseInt(scope.row.forecasted_units) | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted Sales TY"
            property="adjusted_units"
            align="right"
          >
            <template slot-scope="scope">
              {{ parseInt(scope.row.adjusted_units) | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Planned  Sales GM"
            property="planned_gm_percent"
            align="right"
            ><template slot-scope="scope">
              {{
                scope.row.planned_gm_percent
                  ?( scope.row.planned_gm_percent.toFixed(2) * 100).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast Sales GM"
            property="forecasted_gm_percent"
            align="right"
            ><template slot-scope="scope">
              {{
                scope.row.forecasted_gm_percent
                  ? (scope.row.forecasted_gm_percent.toFixed(2) * 100).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted Sales GM"
            property="adjusted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_gm_percent
                  ? (scope.row.adjusted_gm_percent.toFixed(2) * 100).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
        </el-table>
      </card>

      <!--    <card
        card-body-classes="table-full-width"
        v-if="
          scenarioUnitSalesComparison.parsedData &&
          scenarioUnitSalesComparison.parsedData.Units.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Unit Comparision
        </h4>
        <el-table :data="scenarioUnitSalesComparison.parsedData.Units">
          <el-table-column
            min-width="180"
            sortable
            label="Comparision"
            property="Comparision"
          >
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="W1"
            property="W-1"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row["W-1"] | toLocaleStr }}
            </template></el-table-column
          >
          <el-table-column
            min-width="150"
            sortable
            label="W2"
            property="W-2"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row["W-2"] | toLocaleStr }}
            </template>
          </el-table-column>
        </el-table>
      </card> -->
      <!-- 
      <card
        card-body-classes="table-full-width"
        v-if="
          scenarioUnitSalesComparison.parsedData &&
          scenarioUnitSalesComparison.parsedData.Revenue.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Sales Comparision
        </h4>
        <el-table :data="scenarioUnitSalesComparison.parsedData.Revenue">
          <el-table-column
            min-width="180"
            sortable
            label="Comparision"
            property="Comparision"
          >
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="W1"
            property="W-1"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row["W-1"] | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="W2"
            property="W-2"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row["W-2"] | toLocaleStr }}
            </template>
          </el-table-column>
        </el-table>
      </card> -->

      <card
        card-body-classes="table-full-width"
        v-if="
          scenarioCategorySalesComparison.result &&
            scenarioCategorySalesComparison.result.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Category Total Sales Comparision
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
            label="Planned Sales"
            property="planned_revenue"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_revenue
                  ? scope.row.planned_revenue.toFixed(2)
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Forecast Sales"
            property="forecasted_revenue"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.forecasted_revenue
                  ? scope.row.forecasted_revenue.toFixed(2)
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Adjusted Sales"
            property="adjusted_revenue"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_revenue
                  ? scope.row.adjusted_revenue.toFixed(2)
                  : 0 | toLocaleStr
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Planned Sales(%)"
            property="planned_revenue_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_revenue_percent
                  ? (scope.row.planned_revenue_percent.toFixed(2) * 100).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="190"
            sortable
            label="Forecast Sales(%)"
            property="forecasted_revenue_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.forecasted_revenue_percent
                  ?( scope.row.forecasted_revenue_percent.toFixed(2) * 100).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="190"
            sortable
            label="Adjusted Sales(%)"
            property="adjusted_revenue_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_revenue_percent
                  ? (scope.row.adjusted_revenue_percent.toFixed(2) * 100).toFixed(2)
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
                  ? (scope.row.planned_gm_percent.toFixed(2) * 100).toFixed(2)
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
                  ? (scope.row.forecasted_gm_percent.toFixed(2) * 100).toFixed(2)
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
                  ? (scope.row.adjusted_gm_percent.toFixed(2) * 100).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
        </el-table>
      </card>

      <card
        card-body-classes="table-full-width"
        v-if="
          scenarioUnitSalesComparison.parsedData &&
            scenarioUnitSalesComparison.parsedData.Units.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Category Units Comparision
        </h4>
        <table
          class="bg-danger table table-bordered bg-white overflow-scroll"
          style="overflow-x: scroll"
        >
          <thead>
            <tr>
              <th
                v-for="(col, index2) in Object.keys(
                  this.scenarioUnitSalesComparison.parsedData.Units[0]
                )"
                :key="Math.random(index2, 300)"
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

        <!--   <el-table
          v-if="scenarioUnitSalesComparison.parsedData"
          :data="scenarioUnitSalesComparison.parsedData.Units"
        >
          <el-table-column
            min-width="180"
            sortable
            label="Comparision"
            property="Comparision"
          >
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="W1"
            property="W-1"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row["W-1"] | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="W2"
            property="W-2"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row["W-2"] | toLocaleStr }}
            </template></el-table-column
          >
        </el-table> -->
      </card>

      <!-- 7 -->
      <card
        card-body-classes="table-full-width"
        v-if="
          scenarioUnitSalesComparison.parsedData &&
            scenarioUnitSalesComparison.parsedData.Revenue.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Category Sales Comparision
        </h4>
        <table
          class="bg-danger table table-bordered bg-white overflow-auto"
          style="overflow-x: scroll"
        >
          <thead v-if="scenarioUnitSalesComparison.parsedData">
            <tr>
              <th
                v-for="(col, index2) in Object.keys(
                  this.scenarioUnitSalesComparison.parsedData.Revenue[0]
                )"
                :key="Math.random(index2, 300)"
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
                {{ index > 0 ? col2.toFixed(2) : col2 }}
              </td>
            </tr>
          </tbody>
        </table>
        <!--  <el-table
          v-if="scenarioUnitSalesComparison.parsedData"
          :data="scenarioUnitSalesComparison.parsedData.Revenue"
        >
          <el-table-column
            min-width="180"
            sortable
            label="Comparision"
            property="Comparision"
          >
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="W1"
            property="W-1"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row["W-1"] | toLocaleStr }}
            </template></el-table-column
          >
          <el-table-column
            min-width="150"
            sortable
            label="W2"
            property="W-2"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row["W-2"] | toLocaleStr }}
            </template></el-table-column
          >
        </el-table> -->
      </card>

      <span slot="footer" class="dialog-footer">
        <div class="text-right">
          <button
            class="btn btn-primary"
            @click="shareScenario"
            v-if="
              !currentScenarioStatus.is_shared &&
                currentScenarioStatus.status == 'Completed'
            "
          >
            Share Scenario
          </button>
          <button
            class="btn btn-primary"
            @click="shareScenario"
            v-if="
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
              currentScenarioStatus.is_shared &&
                currentScenarioStatus.status == 'Completed' &&
                previewBtnText == 'Merge Scenario'
            "
          >
            Merge Scenario
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
          <button class="btn btn-primary" @click="showDialog = false">
            Close
          </button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog } from "element-ui";

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
    };
  },
  methods: {
    shareScenario() {
      this.$emit("shareScenarioEvt");
      this.showDialog = false;
    },
  },
  computed: {},
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
<style lang="scss">
.el-dialog {
  background: #f5f6fa;
}
.scenario-details-header th {
  font-size: 10px !important;
}
</style>
