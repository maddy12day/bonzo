<template>
  <div class="row">
    <div class="col-lg-12">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title text-bold font-weight-bold mb-0">
          {{ tableHeading }}
        </h4>
        <el-table :data="pagedTableData" :row-class-name="tableRowClassName">
          <el-table-column
            min-width="120"
            sortable
            label="Created At"
            property="created_at"
          >
            <template slot-scope="scope">
              <a
                tabindex="0"
                @click="handleAdjustmentClick(scope.row)"
                v-if="scope.row.status == 'Completed'"
              >
                {{ scope.row.created_at | dateYMDHMSFormat }}</a
              >
              <span v-else>
                {{ scope.row.created_at | dateYMDHMSFormat }}
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
            min-width="115"
            sortable
            label="Is Active?"
            property="is_active"
          >
            <template slot-scope="scope">
              {{ scope.row.is_active | booleanToText }}
            </template>
          </el-table-column>

          <el-table-column
            min-width="130"
            sortable
            label="Adjusted By"
            property="adjusted_by_user_id"
          >
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Adjustment On"
            property="adjusted_metrics_name"
            class-name="text-capitalize"
          >
            <template slot-scope="scope">
              {{ scope.row.adjusted_metrics_name.replace(/_/g, " ") }}
            </template>
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Adjusted Date"
            property="adjusted_metrics_cell_date"
          >
            <template slot-scope="scope">
              {{ scope.row.adjusted_metrics_cell_date | dateYMDFormat }}
            </template>
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Original Value"
            property="before_adjustment_value"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row.before_adjustment_value | toLocaleStr }}
            </template>
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Adjusted Value"
            property="new_adjusted_value"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row.new_adjusted_value | toLocaleStr }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          :page-size="2"
          :pager-count="5"
          layout="prev, pager, next"
          :total="this.tableData.length"
          @current-change="setPage"
        >
        </el-pagination>
      </card>
    </div>

    <!-- Preview -->
    <PreviewManualAdjustment
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
    />
  </div>
</template>
<script>
import { Table, TableColumn, Dialog } from "element-ui";
import PreviewManualAdjustment from "../../components/Scenarios/PreviewManualAdjustment.vue";

export default {
  name: "AdjustmentTable",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dialog.name]: Dialog,
    PreviewManualAdjustment,
  },
  props: ["tableHeading", "adjustmentTableData"],
  data() {
    return {
      page: 1,
      pageSize: 2,
      dialogVisible: false,
    };
  },
  computed: {
    tableData() {
      return this.adjustmentTableData && this.adjustmentTableData.length > 0
        ? this.adjustmentTableData
        : [];
    },
    pagedTableData() {
      return this.tableData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },
  methods: {
    setPage(val) {
      this.page = val;
    },
    async handleAdjustmentClick(data) {
      this.dialogVisible = true;
      // alert("Get Adjustment influenced metrics and show modal popup.");
    },
    tableRowClassName({ row }) {
      if (row.status === "Processing") {
        return "processing-row";
      } else if (row.status === "Completed") {
        return "success-row";
      } else if (row.status === "Failed" || row.status === "Error") {
        return "warning-row";
      }
      return "other-row";
    },
  },
};
</script>
<style lang="scss">
.el-table .warning-row {
  background: rgb(255, 244, 243);
}

.el-table .processing-row {
  background: rgb(227, 238, 255);
}

.el-table .success-row {
  background: rgb(247, 255, 251);
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
.text-capitalize {
  text-transform: capitalize;
}
.card .card-body {
  padding: 5px 15px 15px 15px;
}
</style>
