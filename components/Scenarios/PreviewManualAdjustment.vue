<template>
  <div class="row">
    <el-dialog :visible.sync="showDialog" width="90%">
      <span slot="title"
        ><i class="el-icon-info"></i>Manual AdjustmentTable Preview</span
      >

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
            label="Planned Sales TY"
            property="planned_revenue"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row.planned_revenue | toLocaleStr }}
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
              {{ scope.row.forecasted_revenue | toLocaleStr }}
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
              {{ scope.row.adjusted_revenue | toLocaleStr }}
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
              {{ scope.row.planned_gm_percent | toTwoDigitsFloat }}
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
              {{ scope.row.forecasted_gm_percent | toTwoDigitsFloat }}
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
              {{ scope.row.adjusted_gm_percent | toTwoDigitsFloat }}
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
        {{ adjustmentSalesSummary.result }}
        [[[[]]]]
        <el-table>
          <div v-for="(column, index) in adjustmentSalesSummary.result">
            {{ column }} ===
            <el-table-column
              v-bind="column"
              :label="column.id"
              :prop="column.prop"
              :key="index"
            >
              <template slot-scope="scope">
                <template v-if="!column.render">
                  <template v-if="column.formatter">
                    <span v-html="column.formatter(scope.row, column)" />
                  </template>
                  <template v-else>
                    <span>{{ scope.row[column.prop] }}</span>
                  </template>
                </template>
                <template v-else>
                  <render-dom
                    :column="column"
                    :row="scope.row"
                    :render="column.render"
                    :index="index"
                  />
                </template>
              </template>
            </el-table-column>
          </div>
        </el-table>
      </card>
      <!-- 
      <card
        card-body-classes="table-full-width"
        v-if="
          adjustmentUnitSalesComparison.parsedData &&
            adjustmentUnitSalesComparison.parsedData.Units.length > 0
        "
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Units Comparision
        </h4>
        <el-table :data="adjustmentUnitSalesComparison.parsedData.Units">
          <el-table-column
            min-width="180"
            sortable
            label="Comparision"
            property="Comparision"
          >
          </el-table-column>
           <template
            v-for="(column, index) in adjustmentUnitSalesComparison.parsedData
              .Units"
          >
            <el-table-column
              v-bind="column"
              :label="column.label"
              :prop="column.prop"
              :key="index"
            >
            </el-table-column>
          </template> 
        </el-table>
      </card> -->

      <!-- <template v-for="(column, index) in columns">
      <el-table-column
        v-bind="column"
        :label="column.label"
        :prop="column.prop"
        :key="index"
        :show-overflow-tooltip="options.showOverflowTooltip"
      >
        <template slot-scope="scope">
          <template v-if="!column.render">
            <template v-if="column.formatter">
              <span v-html="column.formatter(scope.row, column)" />
            </template>
            <template v-else>
              <span>{{ scope.row[column.prop] }}</span>
            </template>
          </template>
          <template v-else>
            <render-dom :column="column" :row="scope.row" :render="column.render" :index="index" />
          </template>
        </template>
      </el-table-column>
    </template> -->

      <span slot="footer" class="dialog-footer">
        <div class="text-right ">
          <button class="btn btn-primary " @click="showDialog = false">
            Close
          </button>
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
  props: ["dialogVisible"],
  data() {
    return {
      showDialog: false,
      adjustmentSalesSummary: {},
      adjustmentUnitSalesComparison: {},
      adjustmentCategorySalesComparison: {},
      adjustmentCategoryComparison: {},
    };
  },
  computed: {},
  watch: {
    showDialog: function() {
      if (!this.showDialog) {
        this.$emit("dialogVisible", false);
      }
    },
  },
  methods: {
    weekNO(weekend) {
      moment;
    },
    async getAdjustmentSalesSummary() {
      this.adjustmentSalesSummary = await this.$axios.$get(
        `/get-adjustment-sales-summary/1`
      );
      console.log("scenarioSalesSummary---", this.adjustmentSalesSummary);
    },
    async getAdjustmentUnitSalesComparison() {
      this.adjustmentUnitSalesComparison = await this.$axios.$get(
        `/get-adjustment-unit-sales-comparison/1`
      );
    },
  },
  created() {
    console.log("inisde");
    this.showDialog = true;
  },
  mounted() {
    this.getAdjustmentSalesSummary();
    this.getAdjustmentUnitSalesComparison();
  },
};
</script>
<style lang="scss">
.el-dialog {
  background: #f5f6fa;
}
</style>
