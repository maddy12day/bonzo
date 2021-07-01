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
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Yearly"
            property="yearly_aggregate"
          ></el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Jan"
            property="jan"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Feb"
            property="feb"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Mar"
            property="mar"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Apr"
            property="apr"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="May"
            property="may"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Jun"
            property="jun"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Jul"
            property="jul"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Aug"
            property="aug"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Sep"
            property="sep"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Oct"
            property="oct"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Nov"
            property="nov"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="Dec"
            property="dec"
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
