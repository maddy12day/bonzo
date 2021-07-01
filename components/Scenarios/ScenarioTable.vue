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

          <el-table-column
            min-width="150"
            sortable
            label="Status"
            property="status"
          ></el-table-column>
        </el-table>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from "element-ui";

export default {
  name: "dashboard",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  props: ["tableHeading", "scenarioTableData", "type"],
  data() {
    return {
      scenarioTableDataForTable: [],
      loadTable: false,
    };
  },
  computed: {},
  methods: {
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
<style></style>
