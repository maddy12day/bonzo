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
          >
            <template slot-scope="scope">{{
              scope.row.yearly_aggregate | toLocaleStr
            }}</template>
          </el-table-column>

          <el-table-column min-width="150" sortable label="w01" property="w01"
            ><template slot-scope="scope">{{
              scope.row.w01 | toLocaleStr
            }}</template></el-table-column
          >
          <el-table-column min-width="150" sortable label="w02" property="w02"
            ><template slot-scope="scope">{{
              scope.row.w02 | toLocaleStr
            }}</template></el-table-column
          >
          <el-table-column min-width="150" sortable label="w03" property="w03"
            ><template slot-scope="scope">{{
              scope.row.w03 | toLocaleStr
            }}</template></el-table-column
          >
          <el-table-column min-width="150" sortable label="w04" property="w40"
            ><template slot-scope="scope">{{
              scope.row.w04 | toLocaleStr
            }}</template></el-table-column
          ><el-table-column min-width="150" sortable label="w05" property="w05"
            ><template slot-scope="scope">{{
              scope.row.w05 | toLocaleStr
            }}</template></el-table-column
          ><el-table-column min-width="150" sortable label="w06" property="w06"
            ><template slot-scope="scope">{{
              scope.row.w06 | toLocaleStr
            }}</template></el-table-column
          ><el-table-column min-width="150" sortable label="w07" property="w07"
            ><template slot-scope="scope">{{
              scope.row.w07 | toLocaleStr
            }}</template></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w08"
            property="w08"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w09"
            property="w09"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w10"
            property="w10"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w11"
            property="w11"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w12"
            property="w12"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w13"
            property="w13"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w14"
            property="w14"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w15"
            property="w15"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w16"
            property="w16"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w17"
            property="w17"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w18"
            property="w18"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w19"
            property="w19"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w20"
            property="w20"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w21"
            property="w21"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w22"
            property="w22"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w23"
            property="w23"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w24"
            property="w24"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w25"
            property="w25"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w26"
            property="w26"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w27"
            property="w27"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w28"
            property="w28"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w29"
            property="w29"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w30"
            property="w30"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w31"
            property="w31"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w32"
            property="w32"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w33"
            property="w33"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w34"
            property="w34"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w35"
            property="w35"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w36"
            property="w36"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w37"
            property="w37"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w38"
            property="w38"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w39"
            property="w39"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w40"
            property="w40"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w41"
            property="w41"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w42"
            property="w42"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w43"
            property="w43"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w44"
            property="w44"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w45"
            property="w45"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w46"
            property="w46"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w47"
            property="w47"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w48"
            property="w48"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w49"
            property="w49"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w50"
            property="w50"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w51"
            property="w51"
          ></el-table-column
          ><el-table-column
            min-width="150"
            sortable
            label="w52"
            property="w52"
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
  mounted() {
    console.log(this.metricsTableData);
  },
};
</script>
<style></style>
