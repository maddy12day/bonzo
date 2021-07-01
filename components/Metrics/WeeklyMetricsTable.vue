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

          <el-table-column min-width="150" sortable label="w01" property="w01">
            <template slot-scope="scope">{{
              scope.row.w01 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w02" property="w02">
            <template slot-scope="scope">{{
              scope.row.w02 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w03" property="w03">
            <template slot-scope="scope">{{
              scope.row.w03 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w04" property="w40">
            <template slot-scope="scope">{{
              scope.row.w04 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w05" property="w05">
            <template slot-scope="scope">{{
              scope.row.w05 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w06" property="w06">
            <template slot-scope="scope">{{
              scope.row.w06 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w07" property="w07">
            <template slot-scope="scope">{{
              scope.row.w07 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w08" property="w08">
            <template slot-scope="scope">{{
              scope.row.w08 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w09" property="w09">
            <template slot-scope="scope">{{
              scope.row.w09 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w10" property="w10">
            <template slot-scope="scope">{{
              scope.row.w10 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w11" property="w11">
            <template slot-scope="scope">{{
              scope.row.w11 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w12" property="w12">
            <template slot-scope="scope">{{
              scope.row.w12 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w13" property="w13">
            <template slot-scope="scope">{{
              scope.row.w13 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w14" property="w14">
            <template slot-scope="scope">{{
              scope.row.w14 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w15" property="w15">
            <template slot-scope="scope">{{
              scope.row.w15 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w16" property="w16">
            <template slot-scope="scope">{{
              scope.row.w16 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w17" property="w17">
            <template slot-scope="scope">{{
              scope.row.w17 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w18" property="w18">
            <template slot-scope="scope">{{
              scope.row.w18 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w19" property="w19">
            <template slot-scope="scope">{{
              scope.row.w19 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w20" property="w20">
            <template slot-scope="scope">{{
              scope.row.w20 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w21" property="w21">
            <template slot-scope="scope">{{
              scope.row.w21 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w22" property="w22">
            <template slot-scope="scope">{{
              scope.row.w22 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w23" property="w23">
            <template slot-scope="scope">{{
              scope.row.w23 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w24" property="w24">
            <template slot-scope="scope">{{
              scope.row.w24 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w25" property="w25">
            <template slot-scope="scope">{{
              scope.row.w25 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w26" property="w26">
            <template slot-scope="scope">{{
              scope.row.w26 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w27" property="w27">
            <template slot-scope="scope">{{
              scope.row.w27 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w28" property="w28">
            <template slot-scope="scope">{{
              scope.row.w28 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w29" property="w29">
            <template slot-scope="scope">{{
              scope.row.w29 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w30" property="w30">
            <template slot-scope="scope">{{
              scope.row.w30 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w31" property="w31">
            <template slot-scope="scope">{{
              scope.row.w31 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w32" property="w32">
            <template slot-scope="scope">{{
              scope.row.w32 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w33" property="w33">
            <template slot-scope="scope">{{
              scope.row.w33 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w34" property="w34">
            <template slot-scope="scope">{{
              scope.row.w34 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w35" property="w35">
            <template slot-scope="scope">{{
              scope.row.w35 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w36" property="w36">
            <template slot-scope="scope">{{
              scope.row.w36 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w37" property="w37">
            <template slot-scope="scope">{{
              scope.row.w37 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w38" property="w38">
            <template slot-scope="scope">{{
              scope.row.w38 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w39" property="w39">
            <template slot-scope="scope">{{
              scope.row.w39 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w40" property="w40">
            <template slot-scope="scope">{{
              scope.row.w40 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w41" property="w41">
            <template slot-scope="scope">{{
              scope.row.w41 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w42" property="w42">
            <template slot-scope="scope">{{
              scope.row.w42 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w43" property="w43">
            <template slot-scope="scope">{{
              scope.row.w43 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w44" property="w44">
            <template slot-scope="scope">{{
              scope.row.w44 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w45" property="w45">
            <template slot-scope="scope">{{
              scope.row.w45 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w46" property="w46">
            <template slot-scope="scope">{{
              scope.row.w46 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w47" property="w47">
            <template slot-scope="scope">{{
              scope.row.w47 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w48" property="w48">
            <template slot-scope="scope">{{
              scope.row.w48 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w49" property="w49">
            <template slot-scope="scope">{{
              scope.row.w49 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w50" property="w50">
            <template slot-scope="scope">{{
              scope.row.w50 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w51" property="w51">
            <template slot-scope="scope">{{
              scope.row.w51 | toLocaleStr
            }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable label="w52" property="w52">
            <template slot-scope="scope">{{
              scope.row.w52 | toLocaleStr
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
  mounted() {
    console.log(this.metricsTableData);
  },
};
</script>
<style>
</style>
