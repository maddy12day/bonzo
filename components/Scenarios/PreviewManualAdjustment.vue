<template>
  <div class="row">
    <el-dialog :visible.sync="showDialog" width="90%">
      <span slot="title"
        ><i class="el-icon-info"></i>Manual Adjustment Preview</span
      >
      <div class="card p-2 overflow-auto scenario-details-table">
        <h5 class="text-bold font-weight-bold mb-0">Adjustment Details</h5>
        <table class="table table-bordered " style="word-break: break-word;">
          <thead style="word-wrap: break-word;">
            <tr class="scenario-details-header">
              <th v-if="adjustmentDetails.adjusted_metrics_name">
                Ajusted Name
              </th>
              <th v-if="adjustmentDetails.adjusted_metrics_cell_date">
                Adjusted Metrics Sale Date
              </th>
              <th v-if="adjustmentDetails.before_adjustment_value">
                Before Adjusted Value
              </th>
              <th v-if="adjustmentDetails.new_adjusted_value">
                New Adjusted Value
              </th>
              <th v-if="adjustmentDetails.status">Status</th>
              <th v-if="adjustmentDetails.created_at">created at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-if="adjustmentDetails.adjusted_metrics_name">
                {{ adjustmentDetails.adjusted_metrics_name }}
              </td>
              <td v-if="adjustmentDetails.adjusted_metrics_cell_date">
                {{ formatDate(adjustmentDetails.adjusted_metrics_cell_date) }}
              </td>
              <td v-if="adjustmentDetails.before_adjustment_value">
                {{ adjustmentDetails.before_adjustment_value }}
              </td>
              <td v-if="adjustmentDetails.new_adjusted_value">
                {{ adjustmentDetails.new_adjusted_value }}
              </td>
              <td v-if="adjustmentDetails.status">
                {{ adjustmentDetails.status }}
              </td>
              <td v-if="adjustmentDetails.created_at">
                {{ formatDate(adjustmentDetails.created_at) }}
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-right">
          <button
            class="btn btn-primary"
            @click="(showDialog = false), activateAjustment()"
            v-if="!lockSystem && status && Object.keys(status).length == 0"
          >
            Activate
          </button>
        </p>
      </div>
      <!--   </div>
      </div> -->
      <card
        card-body-classes="table-full-width"
        v-if="
          adjustmentSalesSummary.result &&
            adjustmentSalesSummary.result.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Sales Summary Revenue
        </h4>
        <el-table :data="adjustmentSalesSummary.result">
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
                  ? scope.row.planned_gm_percen.toFixed(2)
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
        v-if="
          adjustmentSalesSummary.result &&
            adjustmentSalesSummary.result.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Sales Summary Units
        </h4>
        <el-table :data="adjustmentSalesSummary.result">
          <el-table-column
            min-width="150"
            label="Planned TY"
            property="planned_revenue"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_units
                  ? parseInt(scope.row.planned_units)
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
              {{
                scope.row.forecasted_units
                  ? parseInt(scope.row.forecasted_units)
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
              {{
                scope.row.adjusted_units
                  ? parseInt(scope.row.adjusted_units)
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
        v-if="adjustmentUnitSalesCategoryComparison.parsedData"
        class="preview-table-div"
      >
        <h4 class="font-weight-bold">Category Summary Comparison</h4>
        <table
          class="table table-bordered bg-white overflow-auto preview-table"
        >
          <thead v-if="adjustmentUnitSalesCategoryComparison.parsedData">
            <tr>
              <th class="theader">Category</th>
              <th class="theader">Planned Units</th>
              <th class="theader">Forecast Units</th>
              <th class="theader">Adjusted Units</th>
              <th class="theader">Planned Revenue</th>
              <th class="theader">Forecast Revenue</th>
              <th class="theader">Adjusted Revenue</th>
              <th class="theader">planned Revenue(%)</th>
              <th class="theader">Forecast Revenue(%)</th>
              <th class="theader">Adjusted Revenue(%)</th>
              <th class="theader">Planned GM(%)</th>
              <th class="theader">Forecast GM(%)</th>
              <th class="theader">Ajusted GM(%)</th>
            </tr>
          </thead>
          <tbody v-if="categorySummery.result">
            <tr
              v-for="(col2, index) in categorySummery.result"
              :key="Math.random(index, 100)"
            >
              <td>{{ col2.level_value }}</td>
              <td>{{ col2.planned_units | toLocaleStr }}</td>
              <td>
                {{ col2.forecasted_units | toLocaleStr }}
              </td>
              <td>
                {{
                  col2.adjusted_units
                    ? parseInt(col2.adjusted_units)
                    : 0 | toLocaleStr
                }}
              </td>
              <td>
                ${{
                  col2.planned_revenue
                    ? parseInt(col2.planned_revenue.toFixed())
                    : 0 | toLocaleStr
                }}
              </td>
              <td>
                ${{
                  col2.forecasted_revenue
                    ? parseInt(col2.forecasted_revenue.toFixed())
                    : 0 | toLocaleStr
                }}
              </td>
              <td>
                ${{
                  col2.adjusted_revenue
                    ? parseInt(col2.adjusted_revenue.toFixed())
                    : 0 | toLocaleStr
                }}
              </td>
              <td>
                {{
                  col2.planned_revenue_percent
                    ? col2.planned_revenue_percent.toFixed(2)
                    : 0
                }}
              </td>
              <td>
                {{
                  col2.forecasted_revenue_percent
                    ? col2.forecasted_revenue_percent.toFixed(2)
                    : 0
                }}
              </td>
              <td>
                {{
                  col2.adjusted_revenue_percent
                    ? col2.adjusted_revenue_percent.toFixed(2)
                    : 0
                }}
              </td>
              <td>
                {{
                  col2.planned_gm_percent
                    ? col2.planned_gm_percent.toFixed(2)
                    : 0
                }}
              </td>
              <td>
                {{
                  col2.forecasted_gm_percent
                    ? col2.forecasted_gm_percent.toFixed(2)
                    : 0
                }}
              </td>
              <td>
                {{
                  col2.adjusted_gm_percent
                    ? col2.adjusted_gm_percent.toFixed(2)
                    : 0
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </card>
      <card v-if="adjustmentUnitSalesCategoryComparison.parsedData">
        <h4 class="font-weight-bold">Category Revenue Comparison</h4>
        <table
          class="bg-danger table table-bordered bg-white preview-table overflow-scroll"
          style="overflow-x: scroll"
        >
          <thead
            v-if="
              adjustmentUnitSalesCategoryComparison &&
                adjustmentUnitSalesCategoryComparison.parsedData
            "
          >
            <tr>
              <th
                v-for="(col, index2) in Object.keys(
                  this.adjustmentUnitSalesCategoryComparison.parsedData
                    .Revenue[0]
                )"
                :key="Math.random(index2, 300)"
                :class="{ fixedWidth: index2 === 0 }"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody v-if="adjustmentUnitSalesCategoryComparison.parsedData">
            <tr
              v-for="(col2, index) in adjustmentUnitSalesCategoryComparison
                .parsedData.Revenue"
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
      <card v-if="adjustmentUnitSalesCategoryComparison.parsedData">
        <h4 class="font-weight-bold">Category Units Comparison</h4>
        <table
          class="bg-danger table table-bordered bg-white preview-table overflow-scroll"
          style="overflow-x: scroll"
        >
          <thead>
            <tr>
              <th
                v-for="(col, index2) in Object.keys(
                  this.adjustmentUnitSalesCategoryComparison.parsedData.Units[0]
                )"
                :key="Math.random(index2, 300)"
                :class="{ fixedWidth: index2 === 0 }"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody v-if="adjustmentUnitSalesCategoryComparison.parsedData">
            <tr
              v-for="(col2, index) in adjustmentUnitSalesCategoryComparison
                .parsedData.Units"
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
      <!--    <span slot="footer" class="dialog-footer"> </span>
      <span slot="footer" class="dialog-footer">
        <div class="text-right">
        </div>
      </span> -->
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
  props: ["dialogVisible", "adjustmentId", "adjustmentDetails"],
  data() {
    return {
      showDialog: false,
      typeColor: ["", "info", "success", "warning", "danger"],
      adjustmentSalesSummary: {},
      adjustmentUnitSalesComparison: {},
      adjustmentCategorySalesComparison: {},
      adjustmentCategoryComparison: {},
      adjustmentUnitSalesCategoryComparison: {},
      categoriesCol: [],
      categorySummery: [],
      status: {},
      lockSystem: false,
    };
  },
  computed: {},
  watch: {
    showDialog: function() {
      if (!this.showDialog) {
        this.$emit("dialogVisibleEvt", false);
        this.$store.commit("reRender");
      }
    },
  },
  methods: {
    async activateAjustment() {
      await this.$axios.$get(
        `/activate-manual-adjustment/${this.adjustmentId}`
      );
      this.$store.commit("reRender");
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
    formatDate(date) {
      return moment(date).format("MM-DD-YYYY");
    },
    async adjustmentStatus() {
      this.status = await this.$axios.$get(
        `/check-adjustment-status/${this.adjustmentId}`
      );
    },
    async getAdjustmentSalesSummary() {
      this.adjustmentSalesSummary = await this.$axios.$get(
        `/get-adjustment-sales-summary/${this.adjustmentId}`
      );
    },
    async getAdjustmentUnitSalesComparison() {
      this.adjustmentUnitSalesComparison = await this.$axios.$get(
        `/get-adjustment-unit-sales-comparison/${this.adjustmentId}`
      );
    },
    async getAdjustmentUnitSalesCategoryComparison() {
      this.adjustmentUnitSalesCategoryComparison = await this.$axios.$get(
        `/get-adjustment-category-comparison/${this.adjustmentId}`
      );
    },
    async getCategorySummery() {
      this.categorySummery = await this.$axios.$get(
        `/get-adjustment-category-sales-comparison/${this.adjustmentId}`
      );
    },
    async activateManualAdjustment() {
      await this.$axios.$post(`/activate-adjustments`, {
        id: this.adjustmentId,
      });
      this.notifyVue("top", "right", "Manual Adjustment is Activated");
    },
  },
  created() {
    this.showDialog = this.dialogVisible;
  },
  mounted() {
    this.getAdjustmentSalesSummary();
    this.getAdjustmentUnitSalesComparison();
    this.getAdjustmentUnitSalesCategoryComparison();
    this.getCategorySummery();
    this.adjustmentStatus();
    this.lockSystem = JSON.parse(localStorage.getItem("isSystemLock"));
  },
};
</script>
<style lang="scss" scoped>
.el-dialog {
  background: #f5f6fa;
}
.theader {
  font-size: 10px !important;
}
table,
tr td {
  padding: 5px 10px !important;
}
.el-dialog {
  background: #f5f6fa;
}
.scenario-details-header th {
  font-size: 10px !important;
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

.preview-table-div {
  overflow-x: auto;
  width: 100%;

  th,
  td {
    min-width: 150px !important;
  }
}

.fixedWidth {
  width: 200px;
}
</style>
