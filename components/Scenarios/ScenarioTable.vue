<template>
  <div class="row">
    <div class="col-lg-12">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title text-bold font-weight-bold mb-0">
          {{ tableHeading }}
        </h4>
        <el-table
          v-if="loadTable"
          :data="pagedTableData"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            min-width="180"
            sortable
            label="Name"
            property="scenario_name"
          >
            <template slot-scope="scope">
              <a
                tabindex="0"
                @click="handleScenarioClick(scope.row)"
                v-if="
                  ['Completed', 'Merge Completed'].includes(scope.row.status)
                "
              >
                {{ scope.row.scenario_name }}</a
              >
              <span v-else>
                {{ scope.row.scenario_name }}
              </span>
            </template>
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
            min-width="350"
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
            min-width="300"
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

          <el-table-column min-width="150" sortable label="Start Date">
            <template slot-scope="scope">
              <p>{{ formatDate(scope.row.start_date) }}</p>
            </template>
          </el-table-column>

          <el-table-column min-width="150" sortable label="End Date">
            <template slot-scope="scope">
              <p>{{ formatDate(scope.row.end_date) }}</p>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          :page-size="3"
          :pager-count="5"
          layout="prev, pager, next"
          :total="this.tableData.length"
          @current-change="setPage"
        >
        </el-pagination>
      </card>
    </div>

    <!-- Scenario Forecast Preview -->
    <PreviewScenario
      v-if="dialogVisible"
      @shareScenarioEvt="shareScenario"
      @dialogVisible="closeDialog"
      :dialogVisible="dialogVisible"
      :scenarioSalesSummary="scenarioSalesSummary"
      :scenarioUnitSalesComparison="scenarioUnitSalesComparison"
      :scenarioCategorySalesComparison="scenarioCategorySalesComparison"
      :scenarioCategoryComparison="scenarioCategoryComparison"
      :previewBtnText="previewBtnText"
      :scenarioDetails="scenarioDetails"
      :currentScenarioStatus="currentScenarioStatus"
      @unshareScenarioEvt="unshareScenario"
    />
  </div>
</template>
<script>
import { Table, TableColumn, Dialog } from "element-ui";
import PreviewScenario from "./PreviewScenario.vue";
import moment from "moment";

export default {
  name: "dashboard",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dialog.name]: Dialog,
    PreviewScenario,
  },
  props: [
    "tableHeading",
    "scenarioTableData",
    "type",
    "useClass",
    "previewBtnText",
  ],
  data() {
    return {
      scenarioTableDataForTable: [],
      loadTable: false,
      dialogVisible: false,
      scenarioSalesSummary: [],
      scenarioUnitSalesComparison: [],
      scenarioCategorySalesComparison: [],
      scenarioCategoryComparison: [],
      currentScenarioId: null,
      currentScenarioStatus: {},
      page: 1,
      pageSize: 3,
      typeColor: ["", "info", "success", "warning", "danger"],
    };
  },
  computed: {
    tableData() {
      return this.scenarioTableData;
    },
    pagedTableData() {
      return this.tableData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
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
    //merge-scenario-with-base
    async mergeScenario() {
      const mergeScenario = await this.$axios.$post(
        `/merge-scenario-with-base`,
        {
          demand_planner_user_id: this.$auth.user.user_id,
          id: this.currentScenarioId,
        }
      );
      if (mergeScenario) {
        this.notifyVue(
          "top",
          "right",
          "Submitted scenario to model for merging with base. Check Scenario table for updates."
        );
        this.$emit("scenarioStatus");
      }
    },
    async shareScenario() {
      //share-scenario
      if (this.previewBtnText == "Merge Scenario") {
        this.mergeScenario();
      } else {
        const scenario = await this.$axios.$get(
          `/share-scenario/${this.currentScenarioId}`
        );

        if (scenario) {
          this.notifyVue(
            "top",
            "right",
            "Scenario shared successfully. It will be visible to others on Dashboard."
          );
        }
      }
    },
    async unshareScenario() {
      //share-scenario
      const scenario = await this.$axios.$get(
        `/unshare-scenario/${this.currentScenarioId}`
      );

      if (scenario) {
        this.notifyVue("top", "right", "Scenario unshared successfully.");
      }
    },

    setPage(val) {
      this.page = val;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    async handleScenarioClick(data) {
      this.currentScenarioId = data.id;
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
      const scenarioDetails = await this.$axios.$get(
        `/get-scenario-detail-by-id/${data.id}`
      );
      console.log("scenarioDetails", this.scenarioDetails);
      const obj = {
        filter_brand_types: scenarioDetails.scenario.filter_brand_types,
        filter_brands: scenarioDetails.scenario.filter_brands,
        filter_categories: scenarioDetails.scenario.filter_categories,
        filter_channels: scenarioDetails.scenario.filter_channels,
        filter_classes: scenarioDetails.scenario.filter_classes,
        filter_collections: scenarioDetails.scenario.filter_collections,
        filter_level: scenarioDetails.scenario.filter_level,
        filter_life_cycles: scenarioDetails.scenario.filter_life_cycles,
        filter_newness: scenarioDetails.scenario.filter_newness,
        filter_product_sources: scenarioDetails.scenario.filter_product_sources,
        filter_programs: scenarioDetails.scenario.filter_programs,
        filter_skus: scenarioDetails.scenario.filter_skus,
        filter_sub_channels: scenarioDetails.scenario.filter_sub_channels,
        filter_sub_classes: scenarioDetails.scenario.filter_sub_classes,
        scenario_name: scenarioDetails.scenario.scenario_name,
      };
      this.scenarioDetails = {
        ...this.emptyFieldCleaner(obj),
        amount: scenarioDetails.scenario.amount,
        startDate: moment(scenarioDetails.scenario.start_date).format(
          "YYYY-MM-DD"
        ),
        endDate: moment(scenarioDetails.scenario.end_date).format("YYYY-MM-DD"),
        id: scenarioDetails.scenario.id,
        is_part_of_base: scenarioDetails.scenario.is_part_of_base,
      };
      this.currentScenarioStatus = scenarioDetails.scenario;
      this.dialogVisible = true;
    },
    emptyFieldCleaner(reqBody) {
      for (let key in reqBody) {
        if (reqBody[key] == "" || reqBody[key] == undefined) {
          delete reqBody[key];
        }
        if (Array.isArray(reqBody[key]) && reqBody[key].length > 1) {
          reqBody[key] = reqBody[key].map((item) => {
            if (item.includes("All") === false) {
              return item.join(",");
            }
          });
        } else if (Array.isArray(reqBody[key]) && reqBody[key].length == 1) {
          reqBody[key] = reqBody[key].map((item) => {
            if (item.includes("All") === false) {
              return item;
            }
          });
        }
      }
      return reqBody;
    },
    getUserName: function (id) {
      let allUserInfo = JSON.parse(window.localStorage.getItem("allUsersInfo"));
      let userName = allUserInfo.users.filter((user) => (user.id = id))[0]
        .first_name;
      return userName;
    },
    addUserToScenarioTableData: function (scenarioTableData, type) {
      if ((type = "sharedScenarios")) {
        this.scenarioTableDataForTable = scenarioTableData.map((v) => ({
          ...v,
        }));
        this.loadTable = true;
      } else {
        this.scenarioTableDataForTable = scenarioTableData;
        this.loadTable = true;
      }
    },
    tableRowClassName({ row }) {
      if (row.status === "Processing") {
        return "processing-row";
      } else if (row.status === "Completed") {
        return "success-row";
      } else if (row.status === "Failed" || row.status === "Error") {
        return "warning-row";
      } else if (row.status === "Merge Pending") {
        return "merge-pending-row";
      } else if (row.status === "Merge Processing") {
        return "merge-processing-row";
      } else if (row.status === "Merge Completed") {
        return "merge-completed-row";
      }
      return "other-row";
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

.el-table .merge-pending-row {
  background: rgb(253, 235, 208);
}
.el-table .merge-processing-row {
  background: rgb(232, 218, 239);
}
.el-table .merge-completed-row {
  background: rgb(213, 245, 227);
}
.el-table .warning-row {
  background: rgb(255, 244, 243);
}

.el-table .success-row {
  background: rgb(247, 255, 251);
}

.el-table .processing-row {
  background: rgb(227, 238, 255);
}

.el-table .other-row {
  background: rgb(255, 252, 241);
}

.el-table__body-wrapper::-webkit-scrollbar {
  /*width: 0;width is 0 to hide*/
  width: 0px;
  height: 5px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 2px;
  height: 5px;
  background: #eee;
}
.el-table__body-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background: rgba(252, 242, 242, 0.4);
}
.el-table__body-wrapper::-webkit-scrollbar-track:hover {
  background: #c5c5c5;
}

.card .card-body {
  padding: 5px 15px 15px 15px;
}
</style>
