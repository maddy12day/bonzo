<template>
  <div class="row">
    <div class="col-lg-12">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          {{ tableHeading }}
        </h4>
        <div class="applied-filter-container" v-if="allAppliedFilters.length > 0">
          <h5 class="text-bold font-weight-bold">Applied Filters</h5>
          <Tags :allAppliedFilters="allAppliedFilters" />
        </div>
        <el-table :data="filteredForecastMetrics.parsedFilteredForecastData">
          <el-table-column
            min-width="170"
            sortable
            label="Metrics Name"
            property="Metrics Name"
            class-name="metrics-fix-header"
            fixed
          >
          </el-table-column>
          <el-table-column
            min-width="170"
            sortable
            label="Yearly"
            property="yearly_aggregate"
            align="right"
          >
          <template slot-scope="scope">{{
              scope.row.yearly_aggregate | toLocaleStr
            }}
          </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jan"
            property="w1"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w1 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Feb"
            property="w2"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w2 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Mar"
            property="w3"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w3 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Apr"
            property="w4"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w4 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="May"
            property="w5"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w5 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jun"
            property="w6"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w6 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Jul"
            property="w7"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w7 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Aug"
            property="w8"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w8 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Sep"
            property="w9"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w9 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Oct"
            property="w10"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w10 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Nov"
            property="w11"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w11 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Dec"
            property="w12"
            align="right"
          >
            <template slot-scope="scope">{{
              scope.row.w12 | toLocaleStr
            }}</template>
          </el-table-column>
        </el-table>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import Tags from "../../components/Tags.vue";

export default {
  name: "FilteredMonthlyMetricsTable",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Tags
  },
  props: ["tableHeading", "filteredForecastMetrics","allAppliedFilters"],
};
</script>
<style></style>
