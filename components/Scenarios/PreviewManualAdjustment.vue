<template>
  <div class="row">
    <el-dialog :visible.sync="showDialog" width="90%">
      <span slot="title"
        ><i class="el-icon-info"></i>Manual Adjustment Preview</span
      >
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
            sortable
            label="Planned TY"
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
            label="Forecast TY"
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
            label="Adjusted TY"
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
            label="Planned GM(%)"
            property="planned_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_gm_percent
                  ? (scope.row.planned_gm_percen).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast GM(%)"
            property="forecasted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.forecasted_gm_percent
                  ? (scope.row.forecasted_gm_percent).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted GM(%)"
            property="adjusted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_gm_percent
                  ? (scope.row.adjusted_gm_percent).toFixed(2)
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
            sortable
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
            sortable
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
            sortable
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
            sortable
            label="Planned GM(%)"
            property="planned_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.planned_gm_percent
                  ? (scope.row.planned_gm_percent).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast GM(%)"
            property="forecasted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.forecasted_gm_percent
                  ?( scope.row.forecasted_gm_percent).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted GM(%)"
            property="adjusted_gm_percent"
            align="right"
          >
            <template slot-scope="scope">
              {{
                scope.row.adjusted_gm_percent
                  ? (scope.row.adjusted_gm_percent).toFixed(2)
                  : 0 | toTwoDigitsFloat
              }}
            </template>
          </el-table-column>
        </el-table>
      </card>
      <card v-if="adjustmentUnitSalesCategoryComparison.parsedData">
        <h4 class="font-weight-bold">Category Summary Comparison</h4>
        <table class="table table-bordered bg-white overflow-auto">
          <thead v-if="adjustmentUnitSalesCategoryComparison.parsedData">
            <tr>
              <th class="theader">Category</th>
              <th class="theader">Planned Units</th>
              <th class="theader">Forecast Units</th>
              <th class="theader">Adjusted Units</th>
              <th class="theader">Planned</th>
              <th class="theader">Forecast</th>
              <th class="theader">Adjusted</th>
              <th class="theader">planned(%)</th>
              <th class="theader">Forecast(%)</th>
              <th class="theader">Adjusted(%)</th>
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
              <td class="text-right">{{ col2.level_value }}</td>
              <td class="text-right">{{ col2.planned_units | toLocaleStr }}</td>
              <td class="text-right">
                {{ col2.forecasted_units | toLocaleStr }}
              </td>
              <td class="text-right">
                {{
                  col2.adjusted_units
                    ? parseInt(col2.adjusted_units)
                    : 0 | toLocaleStr
                }}
              </td>
              <td class="text-right">
                {{
                  col2.planned_revenue
                    ? parseInt(col2.planned_revenue)
                    : 0 | toLocaleStr
                }}
              </td>
              <td class="text-right">
                {{
                  col2.forecasted_revenue
                    ? parseInt(col2.forecasted_revenue)
                    : 0 | toLocaleStr
                }}
              </td>
              <td class="text-right">
                {{
                  col2.adjusted_revenue
                    ? parseInt(col2.adjusted_revenue)
                    : 0 | toLocaleStr
                }}
              </td>
              <td class="text-right">
                {{
                  col2.planned_revenue_percent
                    ? (col2.planned_revenue_percent).toFixed(2)
                    : 0
                }}
              </td>
              <td class="text-right">
                {{
                  col2.forecasted_revenue_percent
                    ? (col2.forecasted_revenue_percent).toFixed(2)
                    : 0
                }}
              </td>
              <td class="text-right">
                {{
                  col2.adjusted_revenue_percent
                    ? (col2.adjusted_revenue_percent).toFixed(2)
                    : 0
                }}
              </td>
              <td class="text-right">
                {{
                  col2.planned_gm_percent
                    ? (col2.planned_gm_percent).toFixed(2)
                    : 0
                }}
              </td>
              <td class="text-right">
                {{
                  col2.forecasted_gm_percent
                    ? (col2.forecasted_gm_percent).toFixed(2)
                    : 0
                }}
              </td>
              <td class="text-right">
                {{
                  col2.adjusted_gm_percent
                    ? (col2.adjusted_gm_percent).toFixed(2)
                    : 0
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </card>
      <card v-if="adjustmentUnitSalesCategoryComparison.parsedData">
        <h4 class="font-weight-bold">Category Revenue Comparision</h4>
        <table
          class="bg-danger table table-bordered bg-white overflow-scroll"
          style="overflow-x: scroll"
        >
          <thead v-if="adjustmentUnitSalesCategoryComparison.parsedData">
            <tr>
              <th
                v-for="(col, index2) in Object.keys(
                  this.adjustmentUnitSalesCategoryComparison.parsedData
                    .Revenue[0]
                )"
                :key="Math.random(index2, 300)"
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
                {{ index > 0 ? col2.toFixed(2) : col2 }}
              </td>
            </tr>
          </tbody>
        </table>
      </card>
      <card v-if="adjustmentUnitSalesCategoryComparison.parsedData">
        <h4 class="font-weight-bold">Category Units Comparision</h4>
        <table
          class="bg-danger table table-bordered bg-white overflow-scroll"
          style="overflow-x: scroll"
        >
          <thead>
            <tr>
              <th
                v-for="(col, index2) in Object.keys(
                  this.adjustmentUnitSalesCategoryComparison.parsedData.Units[0]
                )"
                :key="Math.random(index2, 300)"
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
      <span slot="footer" class="dialog-footer"> </span>
      <span slot="footer" class="dialog-footer">
        <div class="text-right">
          <button class="btn btn-primary" @click="showDialog = false">
            Activate
          </button>
       <!--    <button class="btn btn-primary" @click="showDialog = false">
            Close
          </button> -->
        </div>
      </span>
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
  props: ["dialogVisible", "adjustmentId"],
  data() {
    return {
      showDialog: false,
      adjustmentSalesSummary: {},
      adjustmentUnitSalesComparison: {},
      adjustmentCategorySalesComparison: {},
      adjustmentCategoryComparison: {},
      adjustmentUnitSalesCategoryComparison: {},
      categoriesCol: [],
      categorySummery: [],
    };
  },
  computed: {},
  watch: {
    showDialog: function() {
      if (!this.showDialog) {
        this.$emit("dialogVisibleEvt", false);
      }
    },
  },
  methods: {
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
  },
  created() {
    console.log("inisde");
    this.showDialog = this.dialogVisible;
  },
  mounted() {
    this.getAdjustmentSalesSummary();
    this.getAdjustmentUnitSalesComparison();
    this.getAdjustmentUnitSalesCategoryComparison();
    this.getCategorySummery();
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
</style>
