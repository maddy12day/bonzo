<template>
  <div class="row">
    <div class="col-lg-12">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          {{ tableHeading }}
        </h4>
        <el-table v-if="loadTable" :data="scenarioTableDataForTable">
          <el-table-column
            min-width="180"
            sortable
            label="Name"
            property="scenario_name"
          >
            <a
              tabindex="0"
              @click="handleScenarioClick(scope.row)"
              slot-scope="scope"
            >
              {{ scope.row.scenario_name }}</a
            >
          </el-table-column>

          <el-table-column
            min-width="115"
            sortable
            label="Status"
            property="status"
          ></el-table-column>

          <el-table-column
            min-width="180"
            sortable
            label="Created At"
            property="created_at"
          >
            <template slot-scope="scope">{{
              scope.row.created_at | dateYMDHMSFormat
            }}</template>
          </el-table-column>

          <el-table-column
            min-width="130"
            sortable
            label="Shared By"
            property="sharedBy"
            v-if="type == 'sharedScenarios'"
          >
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Type"
            property="scenario_types.scenario_type"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Filter Level"
            property="filter_level"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Source"
            property="filter_product_sources"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Life Cycle"
            property="filter_life_cycles"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Newness"
            property="filter_newness"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Brands"
            property="filter_brands"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Channels"
            property="filter_channels"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Sub Channels"
            property="filter_sub_channels"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Collections"
            property="filter_collections"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Skus"
            property="filter_skus"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Amount"
            property="amount"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Programs"
            property="filter_programs"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Categories"
            property="filter_categories"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Classes"
            property="filter_classes"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Sub Classes"
            property="filter_sub_classes"
          ></el-table-column>
        </el-table>
      </card>
    </div>

    <!-- Scenario Forecast Preview -->
    <el-dialog :visible.sync="dialogVisible" width="90%">
      <span slot="title"
        ><i class="el-icon-info"></i>Scenario Forecast Preview</span
      >
      <card card-body-classes="table-full-width">
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

      <card card-body-classes="table-full-width">
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
        <div class="text-right">
          <button class="btn btn-primary" @click="dialogVisible = false">
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
  props: ["tableHeading", "scenarioTableData", "type"],
  data() {
    return {
      scenarioTableDataForTable: [],
      loadTable: false,
      dialogVisible: false,
      scenarioSalesSummary: [],
      scenarioUnitSalesComparison: [],
      scenarioCategorySalesComparison: [],
      scenarioCategoryComparison: [],
    };
  },
  computed: {},
  methods: {
    async handleScenarioClick(data) {
      console.log("data--", data);
      this.scenarioSalesSummary = await this.$axios.$get(
        `/get-scenario-sales-summary/${data.id}`
      );
      this.scenarioUnitSalesComparison = await this.$axios.$get(
        `/get-scenario-unit-sales-comparison/${data.id}`
      );
      this.scenarioCategorySalesComparison = await this.$axios.$get(
        `/get-scenario-category-sales-comparison/${data.id}`
      );
      this.scenarioCategoryComparison = await this.$axios.$get(
        `/get-scenario-category-comparison/${data.id}`
      );
      this.dialogVisible = true;
    },
    getUserName: function(id) {
      let allUserInfo = JSON.parse(window.localStorage.getItem("allUsersInfo"));
      let userName = allUserInfo.users.filter((user) => (user.id = id))[0]
        .first_name;
      return userName;
    },
    addUserToScenarioTableData: function(scenarioTableData, type) {
      if ((type = "sharedScenarios")) {
        this.scenarioTableDataForTable = scenarioTableData.map((v) => ({
          ...v,
          sharedBy: this.getUserName(v.demand_planner_user_id),
        }));
        this.loadTable = true;
      } else {
        this.scenarioTableDataForTable = scenarioTableData;
        this.loadTable = true;
      }
    },
  },
  created() {
    this.addUserToScenarioTableData(this.scenarioTableData, this.type);
  },
};
</script>
<style lang="scss">
.fixedHeightScrollTable {
  height: 550px;
  overflow: scroll;
}

.el-dialog {
  background: #f5f6fa;
}

.el-table__row {
  a {
    text-decoration: underline;
    cursor: pointer;
    color: #1d8cf8 !important;
  }
}
</style>
