<template>
  <div class="row">
    <div class="col-lg-12">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          {{ tableHeading }}
        </h4>
        <el-table :data="metricsTableData">
          <el-table-column
            min-width="170"
            sortable
            label="Metrics Name"
            property="metrics_master.title"
            class-name="metrics-fix-header"
            cell-class-name="el-table-custom-background-cell"
            :editablecontent="true"
            fixed
          >
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Yearly"
            property="yearly_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.yearly_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q1"
            property="q1_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.q1_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q2"
            property="q2_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.q2_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q3"
            property="q3_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.q3_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="Q4"
            property="q4_aggregate"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.q4_aggregate | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jan"
            property="jan"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.jan | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Feb"
            property="feb"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.feb | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Mar"
            property="mar"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.mar | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Apr"
            property="apr"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.apr | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="May"
            property="may"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.may | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jun"
            property="jun"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.jun | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jul"
            property="jul"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.jul | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Aug"
            property="aug"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.aug | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Sep"
            property="sep"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.sep | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Oct"
            property="oct"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.oct | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Nov"
            property="nov"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.nov | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Dec"
            property="dec"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.dec | toLocaleStr
            }}</template>
          </el-table-column>
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
  props: ["tableHeading", "metricsTableData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
   classChecker({ row, column }) {
    return "custom-background-metrics-title"
   }
  },
  mounted() {},
};
</script>
<style scope>
.custom-background-metrics-title {
  background: white !important;
}

</style>
