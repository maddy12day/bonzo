<template>
  <div class="row">
    <el-dialog :visible.sync="showDialog" width="90%">
      <span slot="title"
        ><i class="el-icon-info"></i>Scenario Forecast Preview</span
      >
      <card
        card-body-classes="table-full-width"
        v-if="scenarioSalesSummary.result.length > 0"
      >
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Sales Summary Revenue
        </h4>
        <el-table :data="scenarioSalesSummary.result">
          <el-table-column
            min-width="180"
            sortable
            label="Planned Sales TY"
            property="planned_revenue"
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
          >
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast Sales GM"
            property="forecasted_gm_percent"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted Sales GM"
            property="adjusted_gm_percent"
          ></el-table-column>
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
            min-width="180"
            sortable
            label="Planned Sales TY"
            property="planned_units"
          >
            <template slot-scope="scope">
              {{ scope.row.planned_units | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast Sales TY"
            property="forecasted_units"
          >
            <template slot-scope="scope">
              {{ scope.row.forecasted_units | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted Sales TY"
            property="adjusted_units"
          >
            <template slot-scope="scope">
              {{ scope.row.adjusted_units | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Planned  Sales GM"
            property="planned_gm_percent"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast Sales GM"
            property="forecasted_gm_percent"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted Sales GM"
            property="adjusted_gm_percent"
          ></el-table-column>
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
          <el-table-column min-width="150" sortable label="W1" property="W-1">
            <template slot-scope="scope">
              {{ scope.row["W-1"] | toLocaleStr }}
            </template></el-table-column
          >
          <el-table-column min-width="150" sortable label="W2" property="W-2">
            <template slot-scope="scope">
              {{ scope.row["W-2"] | toLocaleStr }}
            </template>
          </el-table-column>
        </el-table>
      </card>

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
        <el-table
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
          <el-table-column min-width="150" sortable label="W1" property="W-1">
            <template slot-scope="scope">
              {{ scope.row["W-1"] | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="W2" property="W-2">
            <template slot-scope="scope">
              {{ scope.row["W-2"] | toLocaleStr }}
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
          >
            <template slot-scope="scope">
              {{ scope.row.planned_revenue | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Forecast Sales"
            property="forecasted_revenue"
          >
            <template slot-scope="scope">
              {{ scope.row.forecasted_revenue | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Adjusted Sales"
            property="adjusted_revenue"
          >
            <template slot-scope="scope">
              {{ scope.row.adjusted_revenue | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Planned Sales(%)"
            property="planned_revenue_percent"
          ></el-table-column>
          <el-table-column
            min-width="190"
            sortable
            label="Forecast Sales(%)"
            property="forecasted_revenue_percent"
          ></el-table-column>
          <el-table-column
            min-width="190"
            sortable
            label="Adjusted Sales(%)"
            property="adjusted_revenue_percent"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Planned GM"
            property="planned_gm_percent"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Forecast GM"
            property="forecasted_gm_percent"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjusted GM"
            property="adjusted_gm_percent"
          ></el-table-column>
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
        <el-table
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
          <el-table-column min-width="150" sortable label="W1" property="W-1">
            <template slot-scope="scope">
              {{ scope.row["W-1"] | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="W2" property="W-2">
            <template slot-scope="scope">
              {{ scope.row["W-2"] | toLocaleStr }}
            </template></el-table-column
          >
        </el-table>
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
        <el-table
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
          <el-table-column min-width="150" sortable label="W1" property="W-1">
            <template slot-scope="scope">
              {{ scope.row["W-1"] | toLocaleStr }}
            </template></el-table-column
          >
          <el-table-column min-width="150" sortable label="W2" property="W-2">
            <template slot-scope="scope">
              {{ scope.row["W-2"] | toLocaleStr }}
            </template></el-table-column
          >
        </el-table>
      </card>

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
  ],
  data() {
    return {
      showDialog: false,
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
  created() {
    this.showDialog = this.dialogVisible;
  },
};
</script>
<style lang="scss">
.el-dialog {
  background: #f5f6fa;
}
</style>
