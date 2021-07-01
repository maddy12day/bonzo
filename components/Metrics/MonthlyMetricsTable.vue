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
          >
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Yearly"
            property="yearly_aggregate"
          >
            <template slot-scope="scope">{{
              scope.row.yearly_aggregate | toLocaleStr
            }}</template>
          </el-table-column>

          <el-table-column min-width="150" sortable label="Jan" property="jan">
            <template slot-scope="scope">{{
              scope.row.jan | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Feb" property="feb">
            <template slot-scope="scope">{{
              scope.row.feb | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Mar" property="mar">
            <template slot-scope="scope">{{
              scope.row.mar | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Apr" property="apr">
            <template slot-scope="scope">{{
              scope.row.apr | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="May" property="may">
            <template slot-scope="scope">{{
              scope.row.may | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Jun" property="jun">
            <template slot-scope="scope">{{
              scope.row.jun | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Jul" property="jul">
            <template slot-scope="scope">{{
              scope.row.jul | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Aug" property="aug">
            <template slot-scope="scope">{{
              scope.row.aug | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Sep" property="sep">
            <template slot-scope="scope">{{
              scope.row.sep | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Oct" property="oct">
            <template slot-scope="scope">{{
              scope.row.oct | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Nov" property="nov">
            <template slot-scope="scope">{{
              scope.row.nov | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="Dec" property="dec">
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
  methods: {},
  mounted() {},
};
</script>
<style></style>
